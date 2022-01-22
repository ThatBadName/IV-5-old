module.exports = {
    name: 'send',
    category: 'Config',
    description: 'Sends a message as the bot. >:(',

    ownerOnly: true,

    slash: true,
    //testOnly: true,
    guildOnly: true,
    
    options: [
        {
            name: "channel",
            description: "The channel to send the message in",
            type: "CHANNEL",
            required: true,
            channelTypes: ['GUILD_TEXT', 'GUILD_PRIVATE_THREAD', 'GUILD_PUBLIC_THREAD', 'GUILD_NEWS_THREAD', 'GUILD_NEWS'],
        },
        {
            name: "message",
            description: "The message to send",
            type: "STRING",
            required: true,
        },
    ],

    callback: ({ message, interaction, args, guild }) => {
        
        if(!guild) {
            return ('This command can only be run in a server')
        }
        
        const channel = interaction.options.getChannel('channel')
        var text = interaction.options.getString('message')
        var text = text.replaceAll("//", "\n")
        channel.send(text)

        if (interaction) {
            interaction.reply({
                content: 'Sent message',
                ephemeral: true,
            })
        }
    }
}
