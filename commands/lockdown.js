const { MessageEmbed, Permissions } = require('discord.js')
const logSchema = require('../models/log-schema')

module.exports = {
    name: 'lockdown',
    description: 'Locks the whole server for the @everyone role.',
    category: 'Moderation',
    permissions: ["MANAGE_CHANNELS"],
    //requireRoles: true,
    slash: true,
    guildOnly: true,
    //testOnly: true,

    options: [
        {
            name: 'announce',
            description: 'The channel that you would like to announce the lockdown in',
            required: true,
            type: 'CHANNEL',
            channelTypes: ['GUILD_TEXT', 'GUILD_PRIVATE_THREAD', 'GUILD_PUBLIC_THREAD', 'GUILD_NEWS_THREAD', 'GUILD_NEWS'],
        },
        {
            name: 'state',
            description: 'Whether to lock/unlock the channel',
            required: 'true',
            type: 'STRING',
            choices: [
                {
                    name: 'lock',
                    description: 'Lock the given channel',
                    value: 'lock',
                },
                {
                    name: 'unlock',
                    description: 'Lock the given channel',
                    value: 'unlock',
                },
            ],
        },
        {
            name: 'reason',
            description: 'The reason for locking the channel',
            required: false,
            type: 'STRING',
        },
    ],

    callback: ({ interaction, message, guild, permissionOverwrites, member: staff }) => {
        
        if(!guild) {
            return ('This command can only be run in a server')
        }
        
        const channel = interaction.options.getChannel('channel')
        //const channels = guild.channels.cache.filter(ch => ch.type !== 'category');
        const state = interaction.options.getString('state')
        const reason = interaction.options.getString('reason') || 'None provided'
        const everyone = guild.roles.everyone

        const logChannel = guild.channels.cache.find(channel => channel.name === 'twisted-logs')
        if (!logChannel) return ('I could not find a log channel. Please create one called "twisted-logs"')

        if (state === 'lock') {
            everyone.setPermissions(0n)

            const logEmbed = new MessageEmbed()
                .setColor('BLURPLE')
                .setTitle('LOCKDOWN START')
                .addField("Staff:", `${staff}`)
                .addField("Reason:", `${reason}`)

                logChannel.send({embeds: [logEmbed]})

            const lockEmbed = new MessageEmbed()
            .setTitle('**__:warning:YOU HAVE NOT BEEN MUTED/PUNISHED:warning:__**')
            .setDescription(`**The server has been locked**\nPlease do not message any staff saying that you are muted/punished\nNobody can speak/view channels`)
            .addField('**Reason:**', `${reason}`)
            .setColor('RED')

                channel.send({ embeds: [lockEmbed] })


        } else if (state === 'unlock') {
            everyone.setPermissions([Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.CONNECT, Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.READ_MESSAGE_HISTORY, Permissions.FLAGS.USE_APPLICATION_COMMANDS])

            const logEmbed = new MessageEmbed()
                .setColor('DARK_GOLD')
                .setTitle('LOCKDOWN END')
                .addField("Staff:", `${staff}`)
                .addField("Reason:", `${reason}`)

                logChannel.send({embeds: [logEmbed]})

            const unlockEmbed = new MessageEmbed()
                .setDescription(`Server unlocked`)
                .addField('**Reason:**', `${reason}`)
                .setColor('GREEN')
                channel.send({ embeds: [unlockEmbed] })

        }

        return {
            custom: true,
            content: `Server has been ${state}ed`,
            ephemeral: true,
        }
    }
}
