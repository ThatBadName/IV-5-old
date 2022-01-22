module.exports = {
    category: 'Testing',
    description: 'Test the bot response.',
    cooldown: '1s',
    guildOnly: true,
    
    slash: true,
    
    callback: ({ message, interaction, client, guild }) => {
        
        if(!guild) {
            return ('This command can only be run in a server')
        }
  
      interaction.reply({
        content: 'hello world',
        ephemeral: true
      })
      
    },
  }
