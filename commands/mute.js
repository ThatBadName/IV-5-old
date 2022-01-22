// const punishmentSchema = require('../models/punishment-schema')
const path = require('path');
const punishmentSchema = require(path.join(__dirname, '../models/punishment-schema'));
const { MessageEmbed } = require('discord.js')
const logSchema = require('../models/log-schema')

module.exports = {
    category: 'Moderation',
    description: 'Mute a user. (use /timeout)',

    guildOnly: true,
    //permissions: ['ADMINISTRATOR'],
    //requireRoles: true,

    minArgs: 4,
    expectedArgs: '<user> <duration> <silent> <reason>',
    expectedArgsTypes: ['USER', 'STRING', 'BOOLEAN', 'STRING'],

    slash: 'both',
    //testOnly: true,

    callback: async ({
        args,
        member: staff,
        guild,
        client,
        message,
        interaction,
    }) => {
        if (!guild) {
            return 'You can only use this in a server'
        }

        // const logChannel = guild.channels.cache.find(channel => channel.name === 'twisted-logs')
        // if (!logChannel) return ('I could not find a log channel. Please create one called "twisted-logs"')

        // let userId = args.shift()
        // const duration = args.shift()
        // const silent = args.shift()
        // const reason = args.join(' ')
        // let user

        // if (message) {
        //     user = message.mentions.users?.first()
        // } else {
        //     user = interaction.options.getUser('user')
        // }

        // if (!user) {
        //     userId = userId.replace(/[<@!>]/g, '')
        //     user = await client.users.fetch(userId)

        //     if (!user) {
        //         return `Could not find a user with the ID ${userId}`
        //     }
        // }

        // userId = user.id

        // let time
        // let type
        // try {
        //     const split = duration.match(/\d+|\D+/g)
        //     time = parseInt(split[0])
        //     type = split[1].toLowerCase()
        // } catch (e) {
        //     return "Invalid time format. Example format: \"10d\" where 'd' = days, 'h = hours and 'm' = minutes"
        // }

        // if (type === 'h') {
        //     time *= 60
        // } else if (type === 'd') {
        //     time *= 60 * 24
        // } else if (type !== 'm') {
        //     return 'Please use "m" (minutes), "h" (hours), "d" (days)'
        // }

        // const expires = new Date()
        // expires.setMinutes(expires.getMinutes() + time)

        // const result = await punishmentSchema.findOne({
        //     guildId: guild.id,
        //     userId,
        //     type: 'mute',
        // })
        // if (result) {
        //     return `<@${userId}> is already muted`
        // }

        // try {
        //     const member = await guild.members.fetch(userId)
        //     if (member) {
        //         const muteRole = guild.roles.cache.find((role) => role.name === 'Silenced')
        //         if (!muteRole) {
        //             return "Can't find a role called 'Silenced'. Please create one"
        //         }

        //         member.roles.add(muteRole)

        //         const logEmbed = new MessageEmbed()
        //         .setColor('GOLD')
        //         .setTitle('MUTE')
        //         .setDescription(`${member} has been muted`)
        //         .addField("Staff:", `${staff}`)
        //         .addField("Reason:", `${reason}`)
        //         .addField("Duration:", `\`${duration}\``)
        //         .addField("Expires", `${expires}`)

        //         logChannel.send({embeds: [logEmbed]})

        //         const embed = new MessageEmbed()
        //         .setColor('DARK_RED')
        //         .setTitle(`**You have been muted**`)
        //         .addField("Server:", `${guild}`)
        //         .addField("Reason:", `${reason}`)
        //         .addField("Duration:", `\`${duration}\``)
        //         .addField("Expires", `${expires}`)
        //         .setDescription('[Appeal here](https://forms.gle/27o21fUYCzZodosU9)')

        //     await user.send({embeds: [embed]}).catch((err) => {
        //         console.log(err)
        //     })
        //     }

        //     await new punishmentSchema({
        //         userId,
        //         guildId: guild.id,
        //         staffId: staff.id,
        //         reason,
        //         expires,
        //         type: 'mute',
        //     }).save()
        // } catch (ignored) {
        //     return 'Cannot mute that user'
        // }

        // if (silent === 'true') {
        //     return ({custom: true, content: `<@${userId}> has been muted for \`${duration}\``, ephemeral: true})
        // } else {
        //     return `<@${userId}> has been muted for \`${duration}\``
        // }
        interaction.reply({
            custom: true,
            content: 'This command has been replaced by `/timeout`. Please use that instead',
            ephemeral: true,
        })
    },
}
