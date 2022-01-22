module.exports = {
    name: 'decancer',
    description: 'Set a users nickname to their ID.',
    category: 'Moderation',
    slash: true,
    permissions: ['MANAGE_NICKNAMES'],
    guildOnly: true,
    options: [{
        name: 'user',
        description: 'The user to change',
        required: true,
        type: 'USER',
    },
],

    callback: async ({interaction}) => {
        const member = interaction.options.getMember('user')

        member.setNickname(`User ${member.id}`)
    }
}
