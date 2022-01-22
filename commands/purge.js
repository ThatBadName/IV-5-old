const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    category: 'Moderation',
    guildOnly: true,
    description: 'Deletes multiple messages at once.',
    options: [
        {
            name: 'amount',
            description: 'Amount of messages to delete',
            required: true,
            type: 'INTEGER',
        },
        {
            name: 'target',
            description: 'The target to delete',
            required: false,
            type: 'USER',
        },
    ],

    permissions: ['MANAGE_MESSAGES'],

    slash: true,
    //testOnly: true,

    /**
     * @param {CommandInteraction} interaction
     */

    callback: async ({ interaction, options, channel, guild }) => {
        
        if(!guild) {
            return ('This command can only be run in a server')
        }
        
        const amount = options.getInteger('amount')
        const target = options.getMember('target')
        const messages = await channel.messages.fetch()
        const embed = new MessageEmbed()
            .setColor("FUCHSIA")
        
        if (amount > 100 || amount < 1) {
            return "Please provide a number between 1 and 100"
        } else {

        if (target) {
            let i = 0
            const filtered = [];
            (await messages).filter((m) => {
                if (m.author.id === target.id && amount > i) {
                    filtered.push(m)
                    i++
                }
            })

            await channel.bulkDelete(filtered, true).then (messages => {
                embed.setDescription(`Purged \`${messages.size}\` messages from ${target}`)
                interaction.reply({embeds: [embed]})
            })
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                embed.setDescription(`Purged \`${messages.size}\` messages`)
                interaction.reply({embeds: [embed]})
            })
        }
        }
    }
}
