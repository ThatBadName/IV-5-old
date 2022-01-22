const { MessageEmbed } = require("discord.js")

module.exports = {
    category: 'Owner',
    description: 'Sends an embedded message.',
    permissions: ['ADMINISTRATOR'],
    
    slash: true, // Create both a slash and legacy command
    testOnly: true, // Only register a slash command for the testing guilds
    
    callback: async ({ message, text, guild }) => {
        
        if(!guild) {
            return ('This command can only be run in a server')
        }
        
      const embed = new MessageEmbed()
      .setDescription("Hello world")
      .setTitle("Title")
      .setColor("DARK_ORANGE")

      //const newMessage = await message.reply({
          //embeds: [embed],
      //})

      //await new Promise((resolve) => setTimeout(resolve, 5000))

      //const newEmbed = newMessage.embeds[0]
      //newEmbed.setTitle('Edited Title')

      //newMessage.edit({
          //embeds: [newEmbed],
      //})

      return embed

    },
  }
