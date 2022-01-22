const { MessageEmbed } = require('discord.js');
const path = require('path');
const strikeSchema = require(path.join(__dirname, '../models/strike-schema'));
const logSchema = require('../models/log-schema')
const historySchema = require('../models/history-schema')

module.exports = {
    category: 'Moderation',
    description: 'Manage all a users strikes.',

    //permissions: ['ADMINISTRATOR'],
    requireRoles: true,

    slash: true,
    //testOnly: true,

    guildOnly: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'add',
            description: 'Gives the user a strike',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'The user to strike',
                    required: true,
                },
                {
                    name: 'reason',
                    type: 'STRING',
                    description: 'The reason for the strike',
                    required: true,
                },
                {
                    name: 'silent',
                    description: 'Whether or not to make the strike public',
                    type: 'BOOLEAN',
                    required: true,
                },
            ],
        },
        {
            type: 'SUB_COMMAND',
            name: 'delete',
            description: 'Deletes a users strike',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'The user to delete the strike from',
                    required: true,
                },
                {
                    name: 'id',
                    type: 'STRING',
                    description: 'The ID of the strike to delete',
                    required: true,
                },
            ],
        },
        {
            type: 'SUB_COMMAND',
            name: 'list',
            description: 'Lists all a users strikes',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'List the strikes of a user',
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
            const strike = await strikeSchema.create({
                userId: user?.id,
                staffId: staff.id,
                guildId: guild?.id,
                reason,
            })

            historySchema.create({
                userId: user?.id,
                staffId: staff.id,
                guildId: guild?.id,
                reason,
                punishmentId: strike.id,
                type: 'strike',
            })


            const logEmbed = new MessageEmbed()
                .setColor('PURPLE')
                .setTitle('STRIKE ADD')
                .setDescription(`${user} has been striken`)
                .addField("Staff:", `${staff}`)
                .addField("Reason:", `${reason}`)
                .addField("ID:", `\`${strike.id}\``)

            channel.send({embeds: [logEmbed]})

            const embed = new MessageEmbed()
                .setColor('DARK_RED')
                .setTitle(`**You have been striken**`)
                .addField("Server:", `${guild}`)
                .addField("Reason:", `${reason}`)
                .addField("ID:", `\`${strike.id}\``)
                .setDescription('[Appeal here](https://forms.gle/27o21fUYCzZodosU9)')
                .setFooter('To view all strikes do \'/liststrikes\'')

            await user.send({embeds: [embed]}).catch((err) => {
                console.log(err)
            })

            if (silent === true) {
                interaction.reply ({custom: true, content: `<@${user?.id}> has been striken with an ID of: \`${strike.id}\``, ephemeral: true})
            } else if (silent === false) {
                interaction.reply (`<@${user?.id}> has been striken with an ID of: \`${strike.id}\``)
            }

            
        } else if (subCommand === 'delete') {


            try {
            const strike = await strikeSchema.findByIdAndDelete(id)

            const logEmbed = new MessageEmbed()
                .setColor('ORANGE')
                .setTitle('STRIKE REMOVE')
                .setDescription(`${user} has been unstriken`)
                .addField("Staff:", `${staff}`)
                .addField("ID:", `\`${strike.id}\``)

            channel.send({embeds: [logEmbed]})
            
            const embed = new MessageEmbed()
                .setColor('DARK_RED')
                .setTitle(`**You have had a strike removed**`)
                .addField("Server:", `${guild}`)
                .addField("ID:", `\`${strike.id}\``)
                // .addField("ID:", `\`${strikeId}\``)
                .setFooter('To view all strikes do \'/liststrikes\'')

            await user.send({embeds: [embed]}).catch((err) => {
                console.log(err)
            })

            return {
                custom: true,
                content: `<@${user?.id}> has has strike removed with ID of: \`${strike.id}\``,
                ephemeral: true,
                allowedMentions: {
                    users: [],
            }
            }
        } catch(err) {
            return ({
                custom: true,
                content: 'Could not find a strike with that ID',
                ephemeral: true,
            })
        }

        } else if (subCommand === 'list') {
            const strikes = await strikeSchema.find({
                userId: user?.id,
                guildId: guild?.id,
            })

            let description = `All active strikes for <@${user?.id}>: \n\n`

            for (const strike of strikes) {
                description += `**ID:** \`${strike._id}\`\n`
                description += `**Date:** \`${strike.createdAt.toLocaleString()}\`\n`
                description += `**Staff:** <@${strike.staffId}>\n`
                description += `**Reason:** ${strike.reason}\n\n`
            }

            const embed = new MessageEmbed().setDescription(description).setColor('DARK_ORANGE')

            return embed
        }
    },
}
