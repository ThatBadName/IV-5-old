const DiscordJS = require('discord.js')

module.exports = {
    category: 'Fun',
    description: 'Divides two numbers.',
    cooldown: '5s',
    options: [
        {
            name: 'int1',
                description: 'First number of the equation',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: 'int2',
                description: 'Second number of the equation',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
    ],

    //permissions: ['ADMINISTRATOR'],
    //requireRoles: true,

    slash: true,
    //testOnly: true,

    guildOnly: true,

    minArgs: 2,
    expectedArgs: '<int1> <int2>',
    expectedArgsTypes: ['INTEGER', 'INTEGER'],

    callback: ({ message, interaction, channel, args, options, guild }) => {
        
        if(!guild) {
            return ('This command can only be run in a server')
        }
        
        const int1 = options.getNumber('int1') || 0
        const int2 = options.getNumber('int2') || 0

        interaction.reply({
            content: `${int1} ÷ ${int2} = ${int1 / int2}`,
            ephemeral: true,
        })
        
    }
}
