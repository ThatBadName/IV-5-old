const {
    MessageEmbed
} = require('discord.js')
const ms = require('ms')
const historySchema = require('../models/history-schema')

module.exports = {
    name: 'timeout',
    description: 'Put a user into timeout.',
    category: 'Moderation',
    permissions: ["MANAGE_MESSAGES"],
    //requireRoles: true,
    slash: true,
    guildOnly: true,
    //testOnly: true,
    options: [{
            name: 'user',
            description: 'The user to timeout',
            type: 'USER',
            required: true,
        },
        {
            name: 'duration',
            description: 'The duration of the timeout',
            type: 'STRING',
            required: true,
        },
        {
            name: 'silent',
            description: 'Whether or not to make the timeout public',
            type: 'BOOLEAN',
            required: true,
        },
        {
            name: 'reason',
            description: 'The the reason of the timeout',
            type: 'STRING',
            required: true,
        },
    ],

    callback: async ({
        interaction,
        guild,
        member: staff
    }) => {

        if (!guild) {
            return 'You can only use this in a server'
        }

        const logChannel = guild.channels.cache.find(channel => channel.name === 'twisted-logs')
        if (!logChannel) return ('I could not find a log channel. Please create one called "twisted-logs"')

        const user = interaction.options.getUser('user')
        var duration = interaction.options.getString('duration')
        var reason = interaction.options.getString('reason')
        const silent = interaction.options.getBoolean('silent')

        const member = interaction.guild.members.cache.get(user.id)
        const timeInMs = ms(duration);
        if (!timeInMs) {
            var duration = '1s'
            var reason = `Command error. You have not been punished`
        }

        try {
            await member.timeout(timeInMs, reason).catch((err) => {
                console.log(err)
            })
            
            historySchema.create({
                userId: user?.id,
                staffId: staff.id,
                guildId: guild?.id,
                duration,
                reason,
                type: 'timeout',
            })
    
            const embed = new MessageEmbed()
                .setTitle('You have been timed-out')
                .setDescription('[Appeal here](https://forms.gle/27o21fUYCzZodosU9)')
                .addField("Server:", `${guild}`)
                .addField("Reason:", `${reason}`)
                .addField("Duration:", `\`${duration}\``)
                .setColor('LUMINOUS_VIVID_PINK')
            await user.send({
                embeds: [embed]
            }).catch((err) => {
                console.log(err)
            })
    
                const logEmbed = new MessageEmbed()
                    .setTitle('TIMEOUT')
                    .setDescription(`${user} has been timed-out`)
                    .addField("Staff:", `${staff}`)
                    .addField("Reason:", `${reason}`)
                    .addField("Duration:", `\`${duration}\``)
                    .setColor('LUMINOUS_VIVID_PINK')
    
                logChannel.send({
                    embeds: [logEmbed]
                }).catch((err) => {
                    console.log(err)
                })

                if (silent === true) {
                    return ({custom: true, content: `${user} has been timed-out for \`${duration}\``, ephemeral: true})
                } else if (silent === false) {
                    return (`${user} has been timed-out for \`${duration}\``)
                }
        } catch (err) {
            console.log(err)
        }
    }
}
