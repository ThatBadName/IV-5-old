const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'pp',
    description: 'How big is your penis?',
    category: 'Fun',
    slash: true,
    cooldown: '10s',
    guildOnly: true,

    callback: async ({interaction, user}) => {

        let lengths = ['=', '==', '===', '====', '=====', '======', '=======', '========', '=========', '==========', '']

        let result = Math.floor(Math.random() * lengths.length)

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${user.username}'s penis`)
        .setDescription(`8${lengths[result]}D`)

        interaction.reply({embeds: [embed]})
    }
}
