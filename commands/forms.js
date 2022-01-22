const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'forms',
    description: 'Shows a list of this servers forms.',
    category: 'Misc',
    cooldown: '5s',
    slash: true,
    guildOnly: true,
    //testOnly: true,
    options: [
        {
            name: 'form',
            description: 'Choose the form you would like',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'all',
                    value: 'all',
                },
                {
                    name: 'appeal',
                    value: 'appeal',
                },
                {
                    name: 'staff-application',
                    value: 'staff-application'
                },
            ],
        },
    ],

    callback: async({interaction}) => {
        const form = interaction.options.getString('form')

        const embed = new MessageEmbed()
        .setTitle(`Forms`)
        .setColor('RANDOM')
        .setDescription(`Forms under category: ${form}`)

        if (form === 'all') {
            embed.addField('Staff Application', `[Apply here](https://forms.gle/VtUimw4wn8H4zCBA6)`)
            .addField('Appeal', '[Appeal here](https://forms.gle/thGvYR7RvaohKc536)')
        } else if (form === 'appeal') {
            embed.addField('Appeal', '[Appeal here](https://forms.gle/thGvYR7RvaohKc536)')
        } else if (form === 'staff-application') {
            embed.addField('Staff Application', `[Apply here](https://forms.gle/VtUimw4wn8H4zCBA6)`)
        }

        interaction.reply({embeds: [embed]})
    }
}
