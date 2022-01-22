module.exports = {
    category: 'Testing',
    description: 'Makes the bot reply with "Pong!".', // Required for slash commands
    cooldown: '1s',
    guildOnly: true,
    
    slash: 'both', // Create both a slash and legacy command
    //testOnly: true, // Only register a slash command for the testing guilds
    
    callback: ({ message, interaction, client, guild }) => {
        
        if(!guild) {
            return ('This command can only be run in a server')
        }
        
      const reply = `Pong! Ping: ${client.ws.ping}ms.`
  
      // message is provided only for a legacy command
      if (message) {
        message.reply({
          content: reply
        })
        return
      }
  
      // interaction is provided only for a slash command
      interaction.reply({
        content: reply,
        ephemeral: true
      })
      
      // Alternatively we can just simply return our reply object
      // OR just a string as the content.
      // WOKCommands will handle the proper way to reply with it
      //return {
        //content: reply,
      //}
    },
  }
