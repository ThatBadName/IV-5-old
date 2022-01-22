const { Message, MessageActionRow, MessageButton, ButtonInteraction, CommandInteraction, MessageEmbed } = require("discord.js")
const { ICommand } = require("wokcommands")
const logSchema = require('../models/log-schema')
const historySchema = require('../models/history-schema')

module.exports = {
    category: 'Moderation',
    description: 'Bans a member from the server.',

    permissions: ['BAN_MEMBERS'],
    //requireRoles: true,

    slash: true,
    //testOnly: true,

    guildOnly: true,

    minArgs: 3,
    expectedArgs: '<user> <silent> <reason>',
    expectedArgsTypes: ['USER', 'BOOLEAN', 'STRING'],

    callback: async ({ message, interaction, args, guild, member }) => {

        const channel = guild.channels.cache.find(channel => channel.name === 'twisted-logs')
        if (!channel) return ('I could not find a log channel. Please create one called "twisted-logs"')

        const target = interaction.options.getMember('user') 
        if (!target) {
            return {
                custom: true,
                content: 'Please tag a user to ban',
                ephemeral: true,
            }
        }

        const silent = interaction.options.getBoolean('silent')

        if (!target.bannable) {
            return {
                custom: true,
                content: 'I cannot ban that user',
                ephemeral: true
            }
        }

        const reason = interaction.options.getString('reason')
        
        historySchema.create({
            userId: target?.id,
            staffId: member.id,
            guildId: guild?.id,
            reason,
            type: 'ban',
        })

        const embed = new MessageEmbed()
        .setColor('DARK_RED')
        .setTitle(`**You have been banned**`)
        .addField("Server:", `${guild}`)
        .addField("Reason:", `${reason}`)
        .addField("Duration:", '\`Eternal\`')
        .setDescription('[Appeal here](https://forms.gle/27o21fUYCzZodosU9)\n[Rejoin here](https://discord.gg/cutSU3gXgJ)')

        const logEmbed = new MessageEmbed()
        .setColor('RED')
        .setTitle('BAN')
        .setDescription(`${target} has been banned`)
        .addField("Staff:", `${member}`)
        .addField("Reason:", `${reason}`)
        .addField("Duration:", '\`Eternal\`')

        //add in button code to confirm ban

            await target.send({embeds: [embed]}).catch((err) => {
                console.log(err)
            })
            target.ban({
                reason,
                days: 7
            })

        channel.send({embeds: [logEmbed]})

        if (silent === true) {
            interaction.reply ({
                custom: true,
                content: `Successfully banned <@${target.id}> for ${reason}`,
                ephemeral: true,
            })
        } else if (silent === false) {
            interaction.reply (`Successfully banned <@${target.id}> for ${reason}`)
        }
    }
}
