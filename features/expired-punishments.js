//const punishmentSchema = require('../models/punishment-schema')
const path = require('path');
const punishmentSchema = require(path.join(__dirname, '../models/punishment-schema'));
const { MessageEmbed } = require('discord.js')

module.exports = (client) => {
    client.on('guildMemberAdd', async (member) => {
        const result = await punishmentSchema.findOne({
            guildId: member.guild.id,
            userId: member.id,
            type: 'mute',
        })

        if (result) {
            const mutedRole = member.guild.roles.cache.find(
                (role) => role.name === 'Silenced'
            )
            if (mutedRole) {
                member.roles.add(mutedRole)
            }
        }
    })

    const check = async () => {
        const query = {
            expires: { $lt: new Date() },
        }
        const results = await punishmentSchema.find(query)

        for (const result of results) {
            const { guildId, userId, type } = result
            const guild = await client.guilds.fetch(guildId)
            if (!guild) {
                console.log(`Guild "${guildId}" no longer uses this bot`)
                continue
            }

            if (type === 'ban') {
                guild.members.unban(userId, 'Ban expired')
                
            } else if (type === 'mute') {
                const muteRole = guild.roles.cache.find((role) => role.name === 'Silenced')
                if (!muteRole) {
                    console.log(`Guild "${guildId}" has no mute role`)
                    continue
                }

                const member = guild.members.cache.get(userId)
                if (!member) {
                    continue
                }

                member.roles.remove(muteRole)
            }
        }

        await punishmentSchema.deleteMany(query)
        setTimeout(check, 1000 * 60)
    }
    check()
}

module.exports.config = {
    dbName: 'EXPIRED PUNISHMENTS',
    displayName: 'Expired Punishments' 
}
