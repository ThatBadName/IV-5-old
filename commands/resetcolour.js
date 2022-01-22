module.exports = {
    category: 'Config',
    description: 'Reset your name colour.',
    slash: true,
    //testOnly: true,
    requireRoles: true,
    guildOnly: true,
    cooldown: '20s',

    callback: async ({
        interaction,
        member,
        guild
    }) => {
        
        if(!guild) {
            return ('This command can only be run in a server')
        }
        
        const colourRole = guild.roles.cache.find(role => role.name === member.id)

        if (!colourRole) {
            return ({
                custom: true,
                content: 'You do not currently have a colour set',
                ephemeral: true
            })
        } else {
            colourRole.delete()
            return ({
                custom: true,
                content: 'Deleted your colour',
                ephemeral: true
            })
        }

    }
}
