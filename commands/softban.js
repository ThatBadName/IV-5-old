const { MessageEmbed } = require('discord.js')
const historySchema = require('../models/history-schema')

module.exports = {
    name: 'softban',
    description: 'Ban and unban a user to clear their recent messages',
    category: 'Moderation',
    slash: true,
    permissions: ['KICK_MEMBERS'],
    options: [
        {
            name: 'user',
            description: 'The user to softban',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason for the softban',
            type: 'STRING',
            required: true,
        },
        {
            name: 'silent',
            description: 'Whether or not to make the softban public',
            type: 'BOOLEAN',
            required: true,
        },
    ],

    callback: async ({interaction, guild, member}) => {
        const channel = guild.channels.cache.find(channel => channel.name === 'twisted-logs')
        if (!channel) return ('I could not find a log channel. Please create one called "twisted-logs"')

        const target = interaction.options.getMember('user') 
        const silent = interaction.options.getBoolean('silent')
        const reason = interaction.options.getString('reason')

        if (!target.bannable) {
            return {
                custom: true,
                content: 'I cannot ban that user',
                ephemeral: true
            }
        }

        historySchema.create({
            userId: target?.id,
            staffId: member.id,
            guildId: guild?.id,
            reason,
            type: 'softban',
        })

        const embed = new MessageEmbed()
        .setColor('DARK_RED')
        .setTitle(`**You have been softbanned**`)
        .addField("Server:", `${guild}`)
        .addField("Reason:", `${reason}`)
        .setDescription('[Rejoin here](https://discord.gg/cutSU3gXgJ)')

        const logEmbed = new MessageEmbed()
        .setColor('RED')
        .setTitle('SOFTBAN')
        .setDescription(`${target} has been softbanned`)
        .addField("Staff:", `${member}`)
        .addField("Reason:", `${reason}`)

        //add in button code to confirm ban

            await target.send({embeds: [embed]}).catch((err) => {
                console.log(err)
            })
            target.ban({
                reason,
                days: 7
            })
            guild.members.unban(target, 'Softban')

        channel.send({embeds: [logEmbed]})

        if (silent === true) {
            interaction.reply ({
                custom: true,
                content: `Successfully softbanned <@${target.id}> for ${reason}`,
                ephemeral: true,
            })
        } else if (silent === false) {
            interaction.reply (`Successfully softbanned <@${target.id}> for ${reason}`)
        }
    }
}
