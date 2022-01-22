const { MessageEmbed } = require('discord.js');
const path = require('path');
const strikeSchema = require(path.join(__dirname, '../models/strike-schema'));

module.exports = {
    category: 'Moderation',
    description: 'View your strikes.',
    cooldown: '15s',

    slash: true,
    //testOnly: true,

    guildOnly: true,

    callback: async ({ guild, member: staff, interaction, user }) => {
        
        if(!guild) {
            return ('This command can only be run in a server')
        }
        
        const strikes = await strikeSchema.find({
            userId: user?.id,
            guildId: guild?.id,
        })

        let description = `All active strikes for <@${user?.id}>: \n\n`

        for (const strike of strikes) {
            description += `**ID:** \`${strike._id}\`\n`
            description += `**Date:** \`${strike.createdAt.toLocaleString()}\`\n`
            description += `**Reason:** ${strike.reason}\n\n`
        }

        const embed = new MessageEmbed().setDescription(description).setColor('DARK_ORANGE')

        user.send({embeds: [embed]}).catch((err) => {
            console.log(err)
        })
        return 'Check your DMS, if there not enabled please enable them'
    }
}
