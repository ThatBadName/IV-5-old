const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "poll",
    description: "Make a yes/no poll.",
    cooldown: '20s',
    category: 'Fun',
    slash: true,
    guildOnly: true,
    //testOnly: true,
    requireRoles: true,
    options: [
        {
            name: 'poll',
            description: 'The question you want to poll',
            required: true,
            type: 'STRING',
        },
    ],

    callback: async({interaction, user, guild}) => {
        
        if(!guild) {
            return ('This command can only be run in a server')
        }
        
        const poll = interaction.options.getString('poll')

        const embed = new MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL({dynamic: true}))
        .setTitle(`${user.tag} asks`)
        .setDescription(`${poll}`)
        .setColor('DARK_AQUA')

        const message = await interaction.reply({embeds: [embed], fetchReply: true})
        message.react('👍')
        message.react('👎')
    }
}
