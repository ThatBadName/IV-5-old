const DiscordJS = require('discord.js')

module.exports = {
    category: 'Fun',
    description: 'Flips a coin.',
    name: 'Coin',
    cooldown: '5s',

    //permissions: ['ADMINISTRATOR'],
    //requireRoles: true,

    slash: true,
    //testOnly: true,

    guildOnly: true,

    callback: ({ message, interaction, channel, args, options, guild }) => {
        
        if(!guild) {
            return ('This command can only be run in a server')
        }
        
        const random = Math.round(Math.random())

        if (random === 0) {
        interaction.reply({
            content: `It's heads`,
        })
        } else if (random === 1) {
            interaction.reply({
                content: `It's tails`,
            })
        }
        
    }
}
