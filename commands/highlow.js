const DiscordJS = require('discord.js')
const { MessageActionRow, MessageButton, ButtonInteraction } = require("discord.js")

module.exports = {
    name: 'highlow',
    category: 'Fun',
    cooldown: '5s',
    guildOnly: true,
    description: 'Play a game of high/low.',

    //permissions: ['ADMINISTRATOR'],
    //requireRoles: true,

    slash: true,
    //testOnly: true,

    callback: async ({ interaction: msgInt, channel, options, collection, guild }) => {
        
        if(!guild) {
            return ('This command can only be run in a server')
        }
        
        const number = Math.floor(Math.random() * Math.floor(101))
        const secretNumber = Math.floor(Math.random() * Math.floor(101))
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('low')
                .setLabel('Lower')
                .setStyle('SUCCESS')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('equal')
                .setStyle("PRIMARY")
                .setLabel('Equal')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('high')
                .setStyle("SUCCESS")
                .setLabel('Higher')
        )

    const reply = await msgInt.reply({
        content: `I am thinking of a number between 1 and 100. Is it higher/equal/lower than ${number} \n Will disable in 5 seconds`,
        components: [row],
        ephemeral: true,
    })

    // setTimeout(function () {
    //     row.components[0].setDisabled(true);
    //   }, 5000);
    
    // reply.update({
    //     content: `I am thinking of a number between ${int1} and ${int2}. Is it higher/equal/lower than ${number} \n Will disable in 5 seconds`,
    //     components: [row],
    //     ephemeral: true,
    // })

    const filter = (btnInt) => {
        return msgInt.user.id === btnInt.user.id
    }

    const collector = channel.createMessageComponentCollector({
        filter,
        max: 1,
        time: 5000
    })

    collector.on('collect', async (i) => {
        if (i.customId === 'high' && secretNumber > number) {
             await i.update({
                custom: true,
                content: `Congratulations you got it right. The number was ${secretNumber}`,
                ephemeral: true,
                components: [],
            })
        } else if (i.customId === 'equal' && secretNumber === number) {
            await i.update({
                custom: true,
                content: `Congratulations you got it right. The number was ${secretNumber}`,
                ephemeral: true,
                components: [],
            })
        } else if (i.customId === 'low' && secretNumber < number) {
            await i.update({
                custom: true,
                content: `Congratulations you got it right. The number was ${secretNumber}`,
                ephemeral: true,
                components: [],
            })
        } else {
            await i.update({
                custom: true,
                content: `Sorry. You didn't quite get it. The number was ${secretNumber}`,
                ephemeral: true,
                components: [],
            })
        }
    }) 

    collector.on('end', (collection) => {
        collection.forEach((click) => {
            console.log(click.user.id, click.customId)
        })

        // if (collection.first?.customId === 'high' && secretNumber > number) {
        //     msgInt.reply({
        //         custom: true,
        //         content: `Congratulation you got it right. The number was ${secretNumber}`,
        //         ephemeral: true,
        //         })
        // } else if (collection.first?.customId === 'low' && secretNumber < number) {
        //     msgInt.reply({
        //         custom: true,
        //         content: `Congratulation you got it right. The number was ${secretNumber}`,
        //         ephemeral: true,
        //         })
        // } else if (collection.first?.customId === 'equal' && secretNumber === number) {
        //     msgInt.reply({
        //         custom: true,
        //         content: `Congratulation you got it right. The number was ${secretNumber}`,
        //         ephemeral: true,
        //         })
        // }

    })
    }
}
