const { MessageActionRow, MessageButton, ButtonInteraction, MessageEmbed } = require("discord.js")
const { Collection } = require("mongoose")
const { ICommand } = require("wokcommands")
const logSchema = require('../models/log-schema')
const historySchema = require('../models/history-schema')

module.exports = {
    category: 'Moderation',
    description: 'Kicks a member from the server.',

    permissions: ['KICK_MEMBERS'],
    //requireRoles: true,

    slash: true,
    //testOnly: true,

    guildOnly: true,

    minArgs: 3,
    expectedArgs: '<user> <silent> <reason>',
    expectedArgsTypes: ['USER', 'BOOLEAN', 'STRING'],

    callback: async ({ message, interaction, args, interaction: msgInt, channel, member: staff, guild }) => {
        const logChannel = guild.channels.cache.find(channel => channel.name === 'twisted-logs')
        if (!logChannel) return ('I could not find a log channel. Please create one called "twisted-logs"')

        const target = message ? message.mentions.members.first() : interaction.options.getMember('user') 
        if (!target) {
            return {
                custom: true,
                content: 'Please tag a user to kick',
                ephemeral: true,
            }
        }

        if (!target.kickable) {
            return {
                custom: true,
                content: 'I cannot kick that user',
                ephemeral: true
            }
        }

        const silent = interaction.options.getBoolean('silent')

        
        const reason = interaction.options.getString('reason')
        
        historySchema.create({
            userId: target?.id,
            staffId: staff.id,
            guildId: guild?.id,
            reason,
            type: 'kick',
        })

        const logEmbed = new MessageEmbed()
                .setColor('NAVY')
                .setTitle('KICK')
                .setDescription(`${target} has been kicked`)
                .addField("Staff:", `${staff}`)
                .addField("Reason:", `${reason}`)

            logChannel.send({embeds: [logEmbed]})

        const embed = new MessageEmbed()
        .setColor('DARK_RED')
        .setTitle(`**You have been kicked**`)
        .addField("Server:", `${guild}`)
        .addField("Reason:", `${reason}`)
        //.addField("Duration:", '\`Eternal\`')
        .setDescription('[Rejoin here](https://discord.gg/cutSU3gXgJ)')

            await target.send({embeds: [embed]}).catch((err) => {
                console.err(err)
            })
            target.kick(reason)

            if (silent === true) {
                interaction.reply ({
                    custom: true,
                    content: `Successfully kicked <@${target.id}> for ${reason}`,
                    ephemeral: true,
                })
            } else if (silent === false) {
                interaction.reply (`Successfully  <@${target.id}> for ${reason}`)
            }
    }
}
