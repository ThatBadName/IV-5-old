const {
    MessageEmbed
} = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'removetimeout',
    description: 'Remove a users timeout.',
    category: 'Moderation',
    //requireRoles: true,
    permissions: ["MANAGE_MESSAGES"],
    guildOnly: true,
    slash: true,
    //testOnly: true,
    options: [{
            name: 'user',
            description: 'The user to delete the timeout from',
            type: 'USER',
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
        const member = interaction.guild.members.cache.get(user.id)

        try {
            await member.timeout(null).catch((err) => {
                console.log(err)
            })
            interaction.reply({
                custom: true,
                content: `${user} has been removed from timeout`,
                ephemeral: true,
            })
    
            const embed = new MessageEmbed()
                .setTitle('You have been removed from timeout')
                .addField("Server:", `${guild}`)
                .setColor('LIGHT_GREY')
            await user.send({
                embeds: [embed]
            }).catch((err) => {
                console.log(err)
            })
    
                const logEmbed = new MessageEmbed()
                    .setTitle('TIMEOUT')
                    .setDescription(`${user} has been removed from timeout`)
                    .addField("Staff:", `${staff}`)
                    .setColor('LIGHT_GREY')
    
                logChannel.send({
                    embeds: [logEmbed]
                }).catch((err) => {
                    console.log(err)
                })
        } catch (err) {
            console.log(err)
        }
    }
}
