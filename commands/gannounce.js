const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "gannounce",
    description: "An announcement better formatted to a giveaway.",
    category: 'Moderation',
    slash: true,
    //testOnly: true,
    requireRoles: true,
    guildOnly: true,
    options: [
        {
            name: 'channel',
            description: 'The announcemnt channel',
            required: true,
            type: 'CHANNEL',
            channelTypes: ['GUILD_TEXT', 'GUILD_PRIVATE_THREAD', 'GUILD_PUBLIC_THREAD', 'GUILD_NEWS_THREAD', 'GUILD_NEWS'],
        },
        {
            name: 'giveaway-title',
            description: 'The giveaway title',
            required: true,
            type: 'STRING',
        },
        {
            name: 'requirements',
            description: 'Requirements for the giveaway',
            required: true,
            type: 'STRING',
        },
        {
            name: 'given',
            description: 'Who its given by',
            required: true,
            type: 'STRING',
        },
        {
            name: 'other-notes',
            description: 'Other notes',
            required: false,
            type: 'STRING',
        },
        // {
        //     name: 'link',
        //     description: 'A link to the giveaway message',
        //     required: false,
        //     type: 'STRING',
        // },
        {
            name: 'ping',
            description: 'The role to ping',
            required: false,
            type: 'ROLE',
        },
    ],

    callback: async({interaction, guild}) => {
        if(!guild) {
            return ('This command can only be run in a server')
        }

        const channel = interaction.options.getChannel('channel')
        const title = interaction.options.getString('giveaway-title')
        var req = interaction.options.getString('requirements')
        const ping = interaction.options.getRole('ping')
        var give = interaction.options.getString('given')
        var other = interaction.options.getString('other-notes') || 'None'
        // const link = interaction.options.getString('link') || 'None'
        var req = req.replaceAll("//", "\n")
        var give = give.replaceAll("//", "\n")
        var other = other.replaceAll("//", "\n")

        const embed = new MessageEmbed()
        .setAuthor('New Giveaway')
        .setTitle(`${title}`)
        .addField("Requirements:", `${req}`)
        .addField("Given By:", `${give}`)
        .addField("Other Notes:", `${other}`)
        .setColor('GOLD')
        // .addField("Link to giveaway", `[Giveaway](${link})`)

        if (!ping) {
            channel.send({embeds: [embed]})
        } else {
            channel.send({content: `${ping}`, embeds: [embed]})
        }
        interaction.reply({custom: true, content: "Message sent", ephemeral: true})
        
    }
}
