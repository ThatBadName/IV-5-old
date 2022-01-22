const { MessageEmbed } = require('discord.js');
const path = require('path');
const rewardSchema = require(path.join(__dirname, '../models/reward-schema'));

module.exports = {
    category: 'Moderation',
    description: 'View your rewards.',
    cooldown: '15s',

    slash: true,
    //testOnly: true,

    guildOnly: true,

    callback: async ({ guild, member: staff, interaction, user }) => {
        
        if(!guild) {
            return ('This command can only be run in a server')
        }
        
        const rewards = await rewardSchema.find({
            userId: user?.id,
            guildId: guild?.id,
        })

        let description = `All active rewards for <@${user?.id}>: \n\n`

        for (const reward of rewards) {
            description += `**ID:** \`${reward._id}\`\n`
            description += `**Date:** \`${reward.createdAt.toLocaleString()}\`\n`
            description += `**Reason:** ${reward.reason}\n\n`
        }

        const embed = new MessageEmbed().setDescription(description).setColor('DARK_ORANGE')

        user.send({embeds: [embed]}).catch((err) => {
            console.log(err)
        })
        return 'Check your DMS, if there not enabled please enable them'
    }
}
