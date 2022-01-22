const { MessageEmbed } = require('discord.js')
const randomPuppy = require('random-puppy')

module.exports = {
    name: 'meme',
    description: 'Get a meme from across the universe.',
    guildOnly: true,
    category: 'Fun',
    slash: true,
    cooldown: '5s',
    // options: [
    //     {
    //         name: 'category',
    //         description: 'THe category of meme',
    //         type: 'STRING',
    //         required: true,
    //         choices: [
    //             {
    //                 name: 'me_irl',
    //                 value: 'me_irl',
    //             },
    //             {
    //                 name: 'meme',
    //                 value: 'meme',
    //             },
    //             {
    //                 name: 'theydidthemaths',
    //                 value: 'theydidthemaths',
    //             },
    //             {
    //                 name: 'softwaregore',
    //                 value: 'softwaregore',
    //             },
    //             {
    //                 name: 'terriblefacebookmemes',
    //                 value: 'terriblefacebookmemes',
    //             },
    //             {
    //                 name: 'all',
    //                 value: 'all',
    //             },
    //         ],
    //     },
    // ],

        callback: async ({interaction}) => {
    //     const type = interaction.options.getString('category')

    //     if (type === 'me_irl') {

    //     const subReds = ['me_irl']
    //     const random = subReds[Math.floor(Math.random() * subReds.length)]

    //     const img = await randomPuppy(random)

    //     const embed = new MessageEmbed()
    //     .setColor('RANDOM')
    //     .setTitle('Your meme has arrived from the archives')
    //     .setImage(img)
    //     .setURL(`https://reddit.com/r/${random}`)

    //     interaction.reply({embeds: [embed]})

    //     } else if (type === 'meme') {

    //     const subReds = ['meme', 'memes']
    //     const random = subReds[Math.floor(Math.random() * subReds.length)]

    //     const img = await randomPuppy(random)

    //     const embed = new MessageEmbed()
    //     .setColor('RANDOM')
    //     .setTitle('Your meme has arrived from the archives')
    //     .setImage(img)
    //     .setURL(`https://reddit.com/r/${random}`)

    //     interaction.reply({embeds: [embed]})

    //     } else if (type === 'theydidthemaths') {

    //     const subReds = ['theydidthemath']
    //     const random = subReds[Math.floor(Math.random() * subReds.length)]

    //     const img = await randomPuppy(random)

    //     const embed = new MessageEmbed()
    //     .setColor('RANDOM')
    //     .setTitle('Your meme has arrived from the archives')
    //     .setImage(img)
    //     .setURL(`https://reddit.com/r/${random}`)

    //     interaction.reply({embeds: [embed]})

    //     } else if (type === 'softwaregore') {

    //     const subReds = ['softwaregore']
    //     const random = subReds[Math.floor(Math.random() * subReds.length)]

    //     const img = await randomPuppy(random)

    //     const embed = new MessageEmbed()
    //     .setColor('RANDOM')
    //     .setTitle('Your meme has arrived from the archives')
    //     .setImage(img)
    //     .setURL(`https://reddit.com/r/${random}`)

    //     interaction.reply({embeds: [embed]})

    //     } else if (type === 'terriblefacebookmemes') {

    //     const subReds = ['terriblefacebookmemes']
    //     const random = subReds[Math.floor(Math.random() * subReds.length)]

    //     const img = await randomPuppy(random)

    //     const embed = new MessageEmbed()
    //     .setColor('RANDOM')
    //     .setTitle('Your meme has arrived from the archives')
    //     .setImage(img)
    //     .setURL(`https://reddit.com/r/${random}`)

    //     interaction.reply({embeds: [embed]})

    //     } else if (type === 'all') {

    //         const subReds = ['terriblefacebookmemes', 'softwaregore', 'meme', 'memes', 'theydidthemath', 'me_irl']
    //     const random = subReds[Math.floor(Math.random() * subReds.length)]

    //     const img = await randomPuppy(random)

    //     const embed = new MessageEmbed()
    //     .setColor('RANDOM')
    //     .setTitle('Your meme has arrived from the archives')
    //     .setImage(img)
    //     .setURL(`https://reddit.com/r/${random}`)

    //     interaction.reply({embeds: [embed]})

    //     }
            interaction.reply({
                custom: true,
                content: 'This command is not currently functioning correctly. We are working to fix it ASAP',
                ephemeral: true,
            })
    }
}
