const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
    name: 'suggest',
    description: 'Suggest something',
    category: 'Fun',
    slash: true,
    // requireRoles: true,
    options: [
        {
            name: 'type',
            description: 'Select the suggestion type',
            required: true,
            type: 'STRING',
            choices: [
                {
                    name: 'Server',
                    value: 'Server suggestion',
                },
                {
                    name: 'Bot',
                    value: 'Bot suggestion',
                },
                {
                    name: 'Other',
                    value: 'Other suggestion',
                },
                
            ],
        },
        {
            name: 'suggestion',
            description: 'Your suggestion',
            type: 'STRING',
            required: true,
        },
    ],

    /**
     * @param {CommandInteraction} interaction
     */

    callback: async ({interaction, guild}) => {
        const { options, guildId, member, user } = interaction
        const channel = guild.channels.cache.find(channel => channel.name === 'suggestions')
        if (!channel) return ('I could not find a suggestion channel. Please create one called "suggestions"')

        const type = options.getString('type')
        const sug = options.getString('suggestion')

        const embed = new MessageEmbed()
        .setColor("WHITE")
        .setAuthor(user.tag, user.displayAvatarURL({dynamic: true}))
        .addField("Type", `${type}`)
        .addField("Suggestion", `${sug}`, true)
        const message = await channel.send({embeds: [embed], fetchReply: true});
            message.react("🟢")
            message.react("🔴")
        interaction.reply({custom: true, content: 'Sent your suggestion', ephemeral: true})
            
    }
}
