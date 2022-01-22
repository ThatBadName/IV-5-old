const { MessageEmbed } = require('discord.js')
const historySchema = require('../models/history-schema')

module.exports = {
    name: 'history',
    description: 'Get a users punishment history',
    category: 'Moderation',
    slash: true,
	guildOnly: true,
    permissions: ['MANAGE_GUILD'],
    options: [
        {
            name: 'user',
            description: 'The user to view the histoy of',
            type: 'USER',
            required: true,
        },
        {
            name: 'type',
            description: 'The type of punishments to view',
            required: true,
            type: 'STRING',
            choices: [
                {
                    name: 'strike',
                    value: 'strike',
                },
                {
                    name: 'timeout',
                    value: 'timeout',
                },
                {
                    name: 'kick',
                    value: 'kick',
                },
                {
                    name: 'tempban',
                    value: 'tempban',
                },
                {
                    name: 'ban',
                    value: 'ban',
                },
            ],
        },
    ],

    callback: async ({interaction, guild}) => {
        const user = interaction.options.getUser('user')
        const type = interaction.options.getString('type')

        if (type === 'strike') {

            const strikes = await historySchema.find({
                userId: user?.id,
                guildId: guild?.id,
                type: type,
            })
    
            let description = `Strike history of <@${user?.id}>: \n\n`
    
            for (const strike of strikes) {
                description += `**ID:** \`${strike._id}\`\n`
                description += `**Staff:** <@${strike.staffId}>\n`
                description += `**Date:** \`${strike.createdAt.toLocaleString()}\`\n`
                description += `**Reason:** ${strike.reason}\n\n`
            }
    
            const embed = new MessageEmbed().setDescription(description).setColor('DARK_ORANGE')
            return embed

        } else if (type === 'timeout') {

            const timeouts = await historySchema.find({
                userId: user?.id,
                guildId: guild?.id,
                type: type,
            })
    
            let description = `Timeout history of <@${user?.id}>: \n\n`
    
            for (const timeout of timeouts) {
                description += `**Staff:** <@${timeout.staffId}>\n`
                description += `**Date:** \`${timeout.createdAt.toLocaleString()}\`\n`
                description += `**Duration** \`${timeout.duration}\`\n`
                description += `**Reason:** ${timeout.reason}\n\n`
            }
    
            const embed = new MessageEmbed().setDescription(description).setColor('DARK_ORANGE')
            return embed
            
        } else if (type === 'kick') {

            const kicks = await historySchema.find({
                userId: user?.id,
                guildId: guild?.id,
                type: type,
            })
    
            let description = `Kick history of <@${user?.id}>: \n\n`
    
            for (const kick of kicks) {
                description += `**Staff:** <@${kick.staffId}>\n`
                description += `**Date:** \`${kick.createdAt.toLocaleString()}\`\n`
                description += `**Reason:** ${kick.reason}\n\n`
            }
    
            const embed = new MessageEmbed().setDescription(description).setColor('DARK_ORANGE')
            return embed
            
        } else if (type === 'tempban') {

            const temps = await historySchema.find({
                userId: user?.id,
                guildId: guild?.id,
                type: type,
            })
    
            let description = `Tempban history of <@${user?.id}>: \n\n`
    
            for (const temp of temps) {
                description += `**Staff:** <@${temp.staffId}>\n`
                description += `**Date:** \`${temp.createdAt.toLocaleString()}\`\n`
                description += `**Duration** \`${temp.duration}\`\n`
                description += `**Reason:** ${temp.reason}\n\n`
            }
    
            const embed = new MessageEmbed().setDescription(description).setColor('DARK_ORANGE')
            return embed
            
        } else if (type === 'ban') {

            const bans = await historySchema.find({
                userId: user?.id,
                guildId: guild?.id,
                type: type,
            })
    
            let description = `Ban history of <@${user?.id}>: \n\n`
    
            for (const ban of bans) {
                description += `**Staff:** <@${ban.staffId}>\n`
                description += `**Date:** \`${ban.createdAt.toLocaleString()}\`\n`
                description += `**Reason:** ${ban.reason}\n\n`
            }
    
            const embed = new MessageEmbed().setDescription(description).setColor('DARK_ORANGE')
            return embed
            
        }
    }
}
