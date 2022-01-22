const {
    MessageEmbed
} = require('discord.js')

module.exports = {
    category: 'Config',
    description: 'Get some help.',
    cooldown: '10s',
    slash: true,
    guildOnly: true,
    //testOnly: true,

    callback: async ({
        interaction
    }) => {

        // const random = Math.round(Math.random())

        // if (random === 0) {
        //     const embed = new MessageEmbed()
        //     .setTitle('Help')
        //     .setDescription('Bellow is a list of some comamnds')
        //     .addField('mute', 'no more talky')
        //     .addField('ban', 'by by')
        //     .addField('add', 'u naughty stop using a calculator')
        //     .addField('music', 'ear-rape yay')
        //     .addField('status', 'u cant use this sorry not sorry')
        //     .addField('poll', 'make me add 2 reactions to a message for u >:(')
        //     .addField('help', 'this is what i need')
        //     .addField('rank', 'hol up. thats not in the main bo.... \nMy Dev: "YOU HAD ONE JOB"\nMy Dev: *grabs spoon*\nMe: "That one job is to anoy you. Now that i have forfilled my duties, badbye"')
        //     .addField('highloe', 'i cant spell its something like that')
        //     .addField('lockdown', 'now we have a lockdown, yippeeee')
        //     .setFooter('If you are experiencing any problems with this command please contact someone other than the developer')
        //     .setColor('BLURPLE')
        //     interaction.reply({embeds: [embed]})
        // } else if (random === 1) {
        //     interaction.reply({
        //         custom: true,
        //         content: 'There was an error while loading help commands. Error: \`\`\`diff\n- I don\'t want to help\n\`\`\`'
        //     })
        // }

        interaction.reply({
            custom: true,
            content: 'Sorry but this command no longer exists',
        })
    }
}
