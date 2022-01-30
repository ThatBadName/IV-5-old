const { MessageEmbed } = require('discord.js')
const historySchema = require('../models/history-schema')

module.exports = {
    name: 'history',
    description: 'Get a users history.',
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
                    name: 'softban',
                    value: 'softban',
                },
                {
                    name: 'tempban',
                    value: 'tempban',
                },
                {
                    name: 'ban',
                    value: 'ban',
                },
                {
                    name: 'reward',
                    value: 'reward',
                },
                {
                    name: 'all',
                    value: 'all',
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
        } else if (type === 'reward') {

            const rewards = await historySchema.find({
                userId: user?.id,
                guildId: guild?.id,
                type: type,
            })
    
            let description = `Reward history of <@${user?.id}>: \n\n`
    
            for (const reward of rewards) {
                description += `**ID:** \`${reward._id}\`\n`
                description += `**Staff:** <@${reward.staffId}>\n`
                description += `**Date:** \`${reward.createdAt.toLocaleString()}\`\n`
                description += `**Reason:** ${reward.reason}\n\n`
            }
    
            const embed = new MessageEmbed().setDescription(description).setColor('DARK_ORANGE')
            return embed

        } else if (type === 'all') {

            const strikes = await historySchema.find({
                userId: user?.id,
                guildId: guild?.id,
                type: 'strike'
            })
    
            let description = `History of <@${user?.id}>\n**Strikes:**\n`
    
            for (const strike of strikes) {
                description += `> **ID:** \`${strike._id}\`\n`
                description += `> **Staff:** <@${strike.staffId}>\n`
                description += `> **Date:** \`${strike.createdAt.toLocaleString()}\`\n`
                description += `> **Reason:** ${strike.reason}\n\n`
            }

            //description += `\n--------------------------\n\n`

            const timeouts = await historySchema.find({
                userId: user?.id,
                guildId: guild?.id,
                type: 'timeout',
            })
    
            description += `**Timeouts**:\n`
    
            for (const timeout of timeouts) {
                description += `> **Staff:** <@${timeout.staffId}>\n`
                description += `> **Date:** \`${timeout.createdAt.toLocaleString()}\`\n`
                description += `> **Duration** \`${timeout.duration}\`\n`
                description += `> **Reason:** ${timeout.reason}\n\n`
            }

            //description += `\n--------------------------\n\n`

            const kicks = await historySchema.find({
                userId: user?.id,
                guildId: guild?.id,
                type: 'kick',
            })
    
            description += `**Kicks:**\n`
    
            for (const kick of kicks) {
                description += `> **Staff:** <@${kick.staffId}>\n`
                description += `> **Date:** \`${kick.createdAt.toLocaleString()}\`\n`
                description += `> **Reason:** ${kick.reason}\n\n`
            }

            //description += `\n--------------------------\n\n`

            const softbans = await historySchema.find({
                userId: user?.id,
                guildId: guild?.id,
                type: 'softban',
            })
    
            description += `**Softbans:** \n`
    
            for (const softban of softbans) {
                description += `> **Staff:** <@${softban.staffId}>\n`
                description += `> **Date:** \`${softban.createdAt.toLocaleString()}\`\n`
                description += `> **Reason:** ${softban.reason}\n\n`
            }
    

            const temps = await historySchema.find({
                userId: user?.id,
                guildId: guild?.id,
                type: 'tempban',
            })
    
            description += `**Tempbans:**\n`
    
            for (const temp of temps) {
                description += `> **Staff:** <@${temp.staffId}>\n`
                description += `> **Date:** \`${temp.createdAt.toLocaleString()}\`\n`
                description += `> **Duration** \`${temp.duration}\`\n`
                description += `> **Reason:** ${temp.reason}\n\n`
            }

            //description += `\n--------------------------\n\n`

            const bans = await historySchema.find({
                userId: user?.id,
                guildId: guild?.id,
                type: 'ban',
            })
    
            description += `**Bans:**\n`
    
            for (const ban of bans) {
                description += `> **Staff:** <@${ban.staffId}>\n`
                description += `> **Date:** \`${ban.createdAt.toLocaleString()}\`\n`
                description += `> **Reason:** ${ban.reason}\n\n`
            }

            //description += `\n--------------------------\n\n`

            const rewards = await historySchema.find({
                userId: user?.id,
                guildId: guild?.id,
                type: 'reward',
            })
    
            description += `**Rewards:**\n`
    
            for (const reward of rewards) {
                description += `> **ID:** \`${reward._id}\`\n`
                description += `> **Staff:** <@${reward.staffId}>\n`
                description += `> **Date:** \`${reward.createdAt.toLocaleString()}\`\n`
                description += `> **Reason:** ${reward.reason}\n\n`
            }
    
            const embed = new MessageEmbed().setDescription(description).setColor('DARK_ORANGE')

            if (embed.length > 4096) {
                return `I couldn't display this users history due to the character limit. Please try again but select a certain category to look at. Sorry for any inconvenience caused`
            } else {
            return embed
            }
        } else if (type === 'softban') {
                const softbans = await historySchema.find({
                    userId: user?.id,
                    guildId: guild?.id,
                    type: type,
                })
        
                let description = `Softban history of <@${user?.id}>: \n\n`
        
                for (const softban of softbans) {
                    description += `**Staff:** <@${softban.staffId}>\n`
                    description += `**Date:** \`${softban.createdAt.toLocaleString()}\`\n`
                    description += `**Reason:** ${softban.reason}\n\n`
                }
        
                const embed = new MessageEmbed().setDescription(description).setColor('DARK_ORANGE')
                return embed
        }
    }
}
