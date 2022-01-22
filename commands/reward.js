const { MessageEmbed } = require('discord.js');
const path = require('path');
const rewardSchema = require(path.join(__dirname, '../models/reward-schema'));
const logSchema = require('../models/log-schema')

module.exports = {
    category: 'Moderation',
    description: 'Manage all a users rewards.',

    //permissions: ['ADMINISTRATOR'],
    requireRoles: true,

    slash: true,
    //testOnly: true,

    guildOnly: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'add',
            description: 'Gives the user a reward',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'The user to reward',
                    required: true,
                },
                {
                    name: 'reason',
                    type: 'STRING',
                    description: 'The reason for the reward',
                    required: true,
                },
                {
                    name: 'silent',
                    description: 'Whether or not to make the reward public',
                    type: 'BOOLEAN',
                    required: true,
                },
            ],
        },
        {
            type: 'SUB_COMMAND',
            name: 'delete',
            description: 'Deletes a users reward',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'The user to delete the reward from',
                    required: true,
                },
                {
                    name: 'id',
                    type: 'STRING',
                    description: 'The ID of the reward to delete',
                    required: true,
                },
            ],
        },
        {
            type: 'SUB_COMMAND',
            name: 'list',
            description: 'Lists all a users rewards',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'List the rewards of a user',
                    required: true,
                },
            ]
        }
    ],

    callback: async ({ guild, member: staff, interaction }) => {
        
        if(!guild) {
            return ('This command can only be run in a server')
        }
        
        const subCommand = interaction.options.getSubcommand()
        const user = interaction.options.getUser('user')
        const reason = interaction.options.getString('reason')
        const id = interaction.options.getString('id')
        const silent = interaction.options.getBoolean('silent')

        const channel = guild.channels.cache.find(channel => channel.name === 'twisted-logs')
        if (!channel) return ('I could not find a log channel. Please create one called "twisted-logs"')

        if (subCommand === 'add') {
            const reward = await rewardSchema.create({
                userId: user?.id,
                staffId: staff.id,
                guildId: guild?.id,
                reason,
            })

            const logEmbed = new MessageEmbed()
                .setColor('PURPLE')
                .setTitle('REWARD ADD')
                .setDescription(`${user} has been rewarded`)
                .addField("Staff:", `${staff}`)
                .addField("Reason:", `${reason}`)
                .addField("ID:", `\`${reward.id}\``)

            channel.send({embeds: [logEmbed]})

            const embed = new MessageEmbed()
                .setColor('DARK_RED')
                .setTitle(`**You have been rewarded**`)
                .addField("Server:", `${guild}`)
                .addField("Reason:", `${reason}`)
                .addField("ID:", `\`${reward.id}\``)
                .setFooter('To view all strikes do \'/listrewards\'')

            await user.send({embeds: [embed]}).catch((err) => {
                console.log(err)
            })

            if (silent === true) {
              interaction.reply ({custom: true, content: `<@${user?.id}> has been rewarded with an ID of: \`${reward.id}\``, ephemeral: true})
            } else if (silent === false) {
                interaction.reply (`<@${user?.id}> has been rewarded with an ID of: \`${reward.id}\``)
            }

            
        } else if (subCommand === 'delete') {
            
            try {

            const reward = await rewardSchema.findByIdAndDelete(id)

            const logEmbed = new MessageEmbed()
                .setColor('ORANGE')
                .setTitle('REWARD REMOVE')
                .setDescription(`${user} has been unrewarded`)
                .addField("Staff:", `${staff}`)
                .addField("ID:", `\`${reward.id}\``)

            channel.send({embeds: [logEmbed]})
            
            const embed = new MessageEmbed()
                .setColor('DARK_RED')
                .setTitle(`**You have had a reward removed**`)
                .addField("Server:", `${guild}`)
                .addField("ID:", `\`${reward.id}\``)
                // .addField("ID:", `\`${strikeId}\``)
                .setFooter('To view all strikes do \'/listrewards\'')

            await user.send({embeds: [embed]}).catch((err) => {
                console.log(err)
            })

            return {
                custom: true,
                content: `<@${user?.id}> has has reward removed with ID of: \`${reward.id}\``,
                ephemeral: true,
                allowedMentions: {
                    users: [],
            }
            }
            } catch(err) {
            return ({
                custom: true,
                content: 'Could not find a reward with that ID',
                ephemeral: true,
            })
        }

        } else if (subCommand === 'list') {
            const rewards = await rewardSchema.find({
                userId: user?.id,
                guildId: guild?.id,
            })

            let description = `All active rewards for <@${user?.id}>: \n\n`

            for (const reward of rewards) {
                description += `**ID:** \`${reward._id}\`\n`
                description += `**Date:** \`${reward.createdAt.toLocaleString()}\`\n`
                description += `**Staff:** <@${reward.staffId}>\n`
                description += `**Reason:** ${reward.reason}\n\n`
            }

            const embed = new MessageEmbed().setDescription(description).setColor('DARK_ORANGE')

            return embed
        }
    },
}
