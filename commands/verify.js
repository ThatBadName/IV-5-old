const {
    MessageEmbed,
    MessageAttachment
} = require('discord.js')
const {
    Captcha
} = require('captcha-canvas')

module.exports = {
    name: 'Verify',
    description: 'Verify and gain access to the server.',
    category: 'Config',
    cooldown: '20s',

    //testOnly: true,
    requireRoles: true,
    slash: true,
    guildOnly: true,

    callback: async ({
        interaction,
        member,
        guild,
        message
    }) => {
        
        if(!guild) {
            return ('This command can only be run in a server')
        }
        
        const verify = guild.roles.cache.find(role => role.name === 'Verified')
        const notVerify = guild.roles.cache.find(role => role.name === 'Pending Verification')
        const verifying = guild.roles.cache.find(role => role.name === 'Verifying')
        const captcha = new Captcha()
        captcha.async = true
        captcha.addDecoy()
        captcha.addDecoy()
        captcha.addDecoy()
        captcha.drawTrace()
        captcha.drawCaptcha()

        console.log(captcha.text)

        if (!verify) {
            return 'I can\'t find a role called "Verified"'
        }

        if (!notVerify) {
            return 'I can\'t find a role called "Pending Verification"'
        }

        const image = new MessageAttachment(
            await captcha.png,
            "captcha.png"
        )

        try {
        const captchaEmbed = new MessageEmbed()
            .setTitle('Please complete the captcha')
            .setImage('attachment://captcha.png')
            .setColor('GOLD')
            .setFooter('You have 60 seconds to respond | Case sensitive | Unlimited atempts')

        const msg = await member.send({
            embeds: [captchaEmbed],
            files: [image]
        })

        interaction.reply({
            custom: true,
            content: 'I have sent you a DM',
            ephemeral: true,
        })

        const filter = (message) => {
            if (message.author.id !== member.id) return
            if (message.content === captcha.text) return true;
        }
        try {
            const responce = await msg.channel.awaitMessages({
                filter,
                max: 1,
                time: 60000,
                errors: ["time"],
            })

            const vfyEmbed = new MessageEmbed()
            .setTitle('You have been successfuly verified')
            .setColor('GREEN')
            .setDescription('Thats it!\nThanks for joining the server\n\n[Go straight to the server](https://discord.gg/3ktFGGHrpC)')

            if (responce) {
                member.roles.add(verify)
                member.roles.remove(notVerify)
                member.send({embeds: [vfyEmbed]})
            }
        } catch (err) {
            console.log(err)
            const failEmbed = new MessageEmbed()
                .setColor('RED')
                .setTitle('You failed the captcha')
                .setDescription('You failed the captcha so you have been kicked. [Rejoin here](https://discord.gg/cutSU3gXgJ)')


            await member.send({
                embeds: [failEmbed],
            })
            member.kick('Failed captcha')
        }

        } catch(err) {
            console.log(err)
            interaction.reply({
                custom: true,
                content: 'You DMs are not enabled. Please enable them and verify again',
                ephemeral: true,
            })
        }
    }
}
