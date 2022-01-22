module.exports = {
    category: 'Owner',
    description: 'Sets the bot status.',
    options: [
        {
            name: 'presence',
            description: 'Sets the bot presence',
            required: false,
            type: 'STRING',
            choices: [
                {
                    name: 'Online',
                    description: 'Makes the bot appear Online',
                    value: 'online'
                },
                {
                    name: 'Do Not Disturb',
                    description: 'Makes the bot appear Do Not Disturb',
                    value: 'dnd',
                },
                {
                    name: 'Idle',
                    description: 'Makes the bot appear Idle',
                    value: 'idle',
                },
                {
                    name: 'Offline',
                    description: 'Makes the bot appear Offline',
                    value: 'invisible',
                },
            ],
        },
        {
            name: 'status',
            description: 'Sets the bot status',
            required: false,
            type: 'STRING',
        },
        {
            name: 'activity',
            description: 'Sets what the bot is doing',
            required: false,
            type: 'STRING',
            choices: [
                {
                    name: 'Playing',
                    description: 'Playing...',
                    value: 'PLAYING',
                },
                {
                    name: 'Watching',
                    description: 'Watching...',
                    value: 'WATCHING'
                },
                {
                    name: 'Listening',
                    description: 'Listening to...',
                    value: 'LISTENING',
                },
                {
                    name: 'Competing',
                    description: 'Competing in...',
                    value: 'COMPETING',
                },
            ],
        },
        // {
        //     name: 'clear',
        //     description: 'Clears the bot status',
        //     required: false,
        //     type: 'SUB_COMMAND'
        // },
    ],

    minArgs: 1,
    expectedArgs: '<status>',

    slash: true,
    testOnly: true,
    ownerOnly: true,

    callback:  ({ client, interaction, args, guild }) => {
        
        if(!guild) {
            return ('This command can only be run in a server')
        }
        
        // if (subCommand === 'clear') {
        //     client.user.setActivity('', { type: '' });
        //     client.user.setStatus('online');
        // }
        const presence = interaction.options.getString('presence') || 'online'
        const status = interaction.options.getString('status') || ''
        const activity = interaction.options.getString('activity') || 'PLAYING'

        //if (!activity && !status && !presence) {
            //client.user.setActivity('', { type: '' });
            //client.user.setStatus('online');
        //}

        client.user.setActivity(status, { type: activity });
        client.user.setStatus(presence);
        
        return {
            custom: true,
            content: 'Updated status',
            ephemeral: true,
        }
    }
}
