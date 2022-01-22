module.exports = {
    name: 'id',
    description: 'Get your ID.',
    category: 'Misc',
    slash: true,
    //testOnly: true,
    cooldown: '5s',
    guildOnly: true,

    callback: async ({interaction, member}) => {
        interaction.reply(`\`${member.id}\``)
    }
}
