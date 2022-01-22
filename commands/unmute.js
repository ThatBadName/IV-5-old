const path = require('path');
const punishmentSchema = require(path.join(__dirname, '../models/punishment-schema'));
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'unmute',
    description: 'Unmute a user. (use /removetimeout)',
    category: 'Moderation',
   //requireRoles: true,

    minArgs: 2,
    expectedArgs: '<user> <silent>',
    expectedArgsTypes: ['USER', 'BOOLEAN'],

    slash: true,
    guildOnly: true,
    //testOnly: true,

    callback: async ({ args, member: staff, guild, client, message, interaction,}) => {
        const logChannel = guild.channels.cache.find(channel => channel.name === 'twisted-logs')
        if (!logChannel) return ('I could not find a log channel. Please create one called "twisted-logs"')

        if (!guild) {
            return 'You can only use this in a server'
        }
        // let userId = args.shift()
        // let user
        // const silent = interaction.option.getBoolean('silent')

        // const result = await punishmentSchema.findOne({
        //     guildId: guild.id,
        //     userId,
        //     type: 'mute',
        // })
        // if (!result) {
        //     return `<@${userId}> is not muted`
        // }


        // if (message) {
        //     user = message.mentions.users?.first()
        // } else {
        //     user = interaction.options.getUser('user')
        // }

        // if (!user) {
        //     userId = userId.replace(/[<@!>]/g, '')
        //     user = await client.users.fetch(userId)

        //     if (!user) {
        //         return `Could not find a user with the ID ${userId}`
        //     }
        // }

        // userId = user.id

        // if (message) {
        //     user = message.mentions.users?.first()
        // } else {
        //     user = interaction.options.getUser('user')
        // }

        // if (!user) {
        //     userId = userId.replace(/[<@!>]/g, '')
        //     user = await client.users.fetch(userId)

        //     if (!user) {
        //         return `Could not find a user with the ID ${userId}`
        //     }
        // }

        // try {
        //     const member = await guild.members.fetch(userId)
        //     if (member) {
        //         const muteRole = guild.roles.cache.find((role) => role.name === 'Silenced')
        //         if (!muteRole) {
        //             return "Can't find a role called 'Silenced'. Please create one"
        //         }

        //         member.roles.remove(muteRole)

        //         const logEmbed = new MessageEmbed()
        //         .setColor('YELLOW')
        //         .setTitle('UNMUTE')
        //         .setDescription(`${member} has been unmuted`)
        //         .addField("Staff:", `${staff}`)

        //         logChannel.send({embeds: [logEmbed]})

        //         const embed = new MessageEmbed()
        //         .setColor('DARK_RED')
        //         .setTitle(`**You have been unmuted**`)
        //         .addField("Server:", `${guild}`)

        //     await member.send({embeds: [embed]}).catch((err) => {
        //         console.err(err)
        //     })
        //     }

        //     await punishmentSchema.findOneAndDelete({
        //         userId: member.id,
        //         guildId: member.guild.id,
        //         type: 'mute',
        //     })
        // } catch (err) {
        //     console.log(err)
        //     return 'Cannot unmute user'
        // }

        // if (silent === 'true') {
        //     return ({custom: true, content: `<@${userId}> has been unmuted `, ephemeral: true})
        // } else {
        //     return `<@${userId}> has been unmuted`
        // }

        interaction.reply({
            custom: true,
            content: 'This command has been replaced by `/removetimeout`. Please use that instead',
            ephemeral: true,
        })
        
    }
}
//module.exports.config = {
   // dbName: 'EXPIRED PUNISHMENTS',
    //displayName: 'Expired Punishments' 
//}
