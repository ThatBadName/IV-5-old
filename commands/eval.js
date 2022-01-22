const { Client, Message, MessageEmbed } = require('discord.js')
const { inspect } = require('util')

module.exports = {
        name: 'eval',
        description: 'Evaluate some code.',
        category: 'Owner',
        slash: 'both',
        testOnly: true,
        ownerOnly: true,
        minArgs: 1,
        expectedArgs: '<code>',
        expectedArgsTypes: ['STRING'],
    
        callback: async ({client, message, channel, args, interaction, guild, member}) => {
            const code = args.join(" ")
            if (!code) return ("Please provide code to evaluate")

            try {
                const result = await eval(code)
                let output = result
                if(typeof result !== 'string') {
                    output = inspect(result)
                }
                try {
                const embed = new MessageEmbed()
                .setColor('BLURPLE')
                .addField('Code:', `\`\`\`js\n${code}\n\`\`\``)
                .setDescription(`Result:\`\`\`js\n${output}\n\`\`\``)
                channel.send({embeds: [embed]})
                } catch (error) {
                    console.log(error)
                }
            } catch (error) {
                console.log(error)
                channel.send('There was an error while trying to display evaluation')
            }
        }
}
