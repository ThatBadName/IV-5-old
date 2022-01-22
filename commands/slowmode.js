module.exports = {
    name: 'slowmode',
    description: 'Change  channel slowmode.',
    category: 'Moderation',

    slash: true,
    guildOnly: true,
    //testOnly: true,
    
    permissions: ['MANAGE_MESSAGES'],
    options: [
        {
            name: 'channel',
            description: 'The channel to set slowmode to',
            required: true,
            type: 'CHANNEL',
            channelTypes: ['GUILD_TEXT', 'GUILD_PRIVATE_THREAD', 'GUILD_PUBLIC_THREAD', 'GUILD_NEWS_THREAD'],
        },
        {
            name: 'timeout',
            description: 'Slowmode (in seconds)',
            required: true,
            type: 'INTEGER',
        },
    ],

    callback: ({ interaction, message, options, guild }) => {
        
        if(!guild) {
            return ('This command can only be run in a server')
        }
        
        const channel = interaction.options.getChannel('channel')
        const timeout = interaction.options.getInteger('timeout')

        if (timeout < 0) {
            return {
                custom: true,
                content: 'Please provide a positive number',
                ephemeral: true,
            }
        } else if (timeout > 21600) {
            interaction.reply ({
                custom: true,
                content: 'Please provide a numer under 21600',
                ephemeral: true,
            })
            
        }

        if (timeout < 21601 && timeout > -1){
            channel.setRateLimitPerUser(timeout)
        return {
            custom: true,
            content: `Set slowmode to ${timeout} seconds in ${channel}`
        }
        }
    }

}
