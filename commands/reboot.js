module.exports = {
    name: 'reboot',
    category: 'Config',
    description: 'Reboots the bot.',

    slash: true,
    testOnly: true,
    ownerOnly: true,
    
    cooldown: '60s',
    
    callback: async ({ client, interaction }) => {
        await interaction.reply('Rebooting')
		await client.user.setPresence({ activities: [{ name: ' ' }]});
        process.exit()
    }
}
