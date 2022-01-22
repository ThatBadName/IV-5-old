const { MessageActionRow, MessageButton, ButtonInteraction } = require("discord.js")
const { ICommand } = require("wokcommands")

module.exports = {
    category: 'Owner',
    description: 'Test buttons.',

    slash: true,
    testOnly: true,
    //permissions: ['ADMINISTRATOR'],
    ownerOnly: true,

    callback: async ({ interaction: msgInt, channel, guild }) => {
        
        if(!guild) {
            return ('This command can only be run in a server')
        }
        
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('test-button1')
                .setEmoji('✔')
                .setLabel('Test')
                .setStyle('SUCCESS')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('test_button2')
                .setEmoji('❌')
                .setStyle('DANGER')
        )

    await msgInt.reply({
        content: 'Test',
        components: [row],
        ephemeral: true,
    })

    const filter = (btnInt) => {
        return msgInt.user.id === btnInt.user.id
    }

    const collector = channel.createMessageComponentCollector({
        filter,
        max: 1,
        time: 15000
    })

    collector.on('collect', (i) => {
        i.reply({
            content: 'Clicked',
            ephemeral: true
        })
        })

        collector.on('end', async (collection) => {
            collection.forEach((click) => {
                console.log(click.user.id, click.customId)
            })

            if (collection.first()?.customId === 'test_button1') {
                return 'test1'
            }

            await msgInt.editReply({
                content: 'An action has already been taken',
                components: [],
            })
        })
    }
}
