const { MessageEmbed } = require("discord.js")

module.exports = {
    name: '8ball',
    description: 'How lucky are you',
    category: 'Fun',
    slash: true,
    guildOnly: true,
    cooldown: '10s',
    options: [
        {
            name: 'question',
            description: 'The question you want to ask',
            type: 'STRING',
            required: true,
        },
    ],

    callback: async ({interaction, user}) => {

        const question = interaction.options.getString('question')

        let answers = ['yes', 'no', 'deffinately', 'hmm not sure', 'seems like it', 'prehaps', 'certainly not', 'certainly', 'never', 'of course', 'better not tell you now', 'yus', 'noe', 'nope', 'im not telling u >:(', 'you would never be able to handle the truth']

        let result = Math.floor(Math.random() * answers.length)

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${user.username}'s 8ball`)
        .setDescription(`**Question:**\n${question}\n\n**Answer:**\n${answers[result]}`)

        interaction.reply({embeds: [embed]})
    }
}
