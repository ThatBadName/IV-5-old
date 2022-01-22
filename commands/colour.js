module.exports = {
    category: 'Config',
    description: 'Set your name colour.',
    slash: true,
    //testOnly: true,
    requireRoles: true,
    cooldown: '20s',
    guildOnly: true,
    options: [
        // {
        //     name: 'reset',
        //     description: 'Reset your colour?',
        //     type: 'BOOLEAN',
        //     required: true,
        // },
        {
            name: 'colour',
            description: 'Provide a hex value',
            type: 'STRING',
            required: true,
        },
    ],

    callback: async({interaction, member, guild}) => {
        const colour = interaction.options.getString('colour')
        const remove = interaction.options.getBoolean('reset')
        var hex = /[0-9A-Fa-f]{6}/g;

        //if (remove === 'false') {
            if (hex.test(colour)) {
                //const id = member.id
                const colourRole = await guild.roles.cache.find(role => role.name === member.id)

                    if (!colourRole) {
                        var newRole = await guild.roles.create({
                                name: member.id,
                                color: colour,
                        })
                        await newRole.setPermissions(0n)
                        member.roles.add(newRole)
                        return ({custom: true, content: `I have changed your colour to ${newRole}`, ephemeral: true})
                    } else {
                        guild.roles.edit(colourRole, { color: colour})
                        member.roles.add(colourRole)
                        return ({custom: true, content: `I have changed your colour to ${colourRole}`, ephemeral: true})
                    }
    
            } else {
                interaction.reply({
                    custom: true,
                    content: `Invalid hex \`${colour}\`. Please provide a valid hex string \`000000\``,
                    ephemeral: true,
                })
            }
        // } else {
        //     const colourRole = guild.roles.cache.find((role) => role.name === member.id)
        //             if (!colourRole) {
        //                 return ({content: 'You do not currently have a colour set', ephemeral: true})
        //             } else {
        //                 colourRole.delete()
        //                 return ({content: 'Deleted your colour', ephemeral: true})
        //             }
        // }
        
    }
}
