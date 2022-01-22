//const punishmentSchema = require('../models/punishment-schema')
const path = require('path');
const punishmentSchema = require(path.join(__dirname, '../models/punishment-schema'));
const { MessageEmbed } = require('discord.js')
const logSchema = require('../models/log-schema')


module.exports = {
    category: 'Moderation',
    description: 'Temporarily bans a user.',

    permissions: ['BAN_MEMBERS'],
    guildOnly: true,
    //requireRoles: true,

    minArgs: 4,
    expectedArgs: '<user> <duration> <silent> <reason>',
    expectedArgsTypes: ['USER', 'STRING', 'BOOLEAN', 'STRING'],

    slash: true,
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

        const channel = guild.channels.cache.find(channel => channel.name === 'twisted-logs')
        if (!channel) return ('I could not find a log channel. Please create one called "twisted-logs"')

        const silent = interaction.options.getBoolean('silent')
        let userId = args.shift()
        const duration = args.shift()
        const reason = interaction.options.getString('reason')
        let user

        if (message) {
            user = message.mentions.users?.first()
        } else {
            user = interaction.options.getUser('user')
        }

        if (!user) {
            userId = userId.replace(/[<@!>]/g, '')
            user = await client.users.fetch(userId)

            if (!user) {
                return `Could not find a user with the ID ${userId}`
            }
        }

        userId = user.id

        let time
        let type
        try {
            const split = duration.match(/\d+|\D+/g)
            time = parseInt(split[0])
            type = split[1].toLowerCase()

        } catch (e) {
            return "Invalid time format. Example format: \"10d\" where 'd' = days, 'h = hours and 'm' = minutes"
        }

        if (type === 'h') {
            time *= 60
        } else if (type === 'd') {
            time *= 60 * 24
        } else if (type !== 'm') {
            return 'Please use "m" (minutes), "h" (hours), "d" (days)'
        }

        const expires = new Date()
        expires.setMinutes(expires.getMinutes() + time)

        const result = await punishmentSchema.findOne({
            guildId: guild.id,
            userId,
            type: 'ban',
        })
        if (result) {
            return `<@${userId} is already banned`
        }

        const logEmbed = new MessageEmbed()
        .setColor('FUCHSIA')
        .setTitle('TEMPBAN')
        .setDescription(`${user} has been temp-banned`)
        .addField("Staff:", `${staff}`)
        .addField("Reason:", `${reason}`)
        .addField("Duration:", `\`${duration}\``)
        .addField("Expires", `${expires}`)

        channel.send({embeds: [logEmbed]})

        const embed = new MessageEmbed()
        .setColor('DARK_RED')
        .setTitle(`**You have been temporarily banned**`)
        .addField("Server:", `${guild}`)
        .addField("Reason:", `${reason}`)
        .addField("Duration:", `\`${duration}\``)
        .addField("Expires", `${expires}`)
        .setDescription('[Appeal here](https://forms.gle/27o21fUYCzZodosU9)\n[Rejoin here](https://discord.gg/cutSU3gXgJ)')

        //add in button code to confirm ban

            await user.send({embeds: [embed]}).catch((err) => {
                console.log(err)
            })
        

        try {
            await guild.members.ban(userId, { reason })

            await new punishmentSchema({
                userId,
                guildId: guild.id,
                staffId: staff.id,
                reason,
                expires,
                type: 'ban',
            }).save()
        } catch (ignored) {
            return 'Cannot ban that user'
        }
        
        if (silent === true) {

            return ({
                custom: true,
                content: `Successfully banned <@${user.id}> for ${duration} (${reason})`,
                ephemeral: true,
            })
        } else {
            return `Successfully banned <@${user.id}> for ${duration} (${reason})`
        }
    },
}
