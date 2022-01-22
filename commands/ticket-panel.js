const { Client, Message, MessageEmbed,  MessageButton, MessageActionRow, CommandInteraction } = require('discord.js');

module.exports = {
    name: 'ticket-panel',
    description: "Sends a ticket pannel to a channel.",
    category: "Config",
    ownerOnly: true,
    slash: true,
    //testOnly: true,
    options: [
        {
            name: 'channel',
            description: 'The channel to send the panel in',
            type: 'CHANNEL',
            channelTypes: ['GUILD_TEXT', 'GUILD_PRIVATE_THREAD', 'GUILD_PUBLIC_THREAD', 'GUILD_NEWS_THREAD', 'GUILD_NEWS'],
            required: true
        },
    ],
  /**
   * 
   * @param {CommandInteraction} interaction 
   * @param {Client} client 
   * @param {Message} message 
   */
    callback: async ({interaction, client, message}) => {
        const guild = interaction.guild;
        const channel = interaction.options.getChannel('channel')

        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setAuthor(interaction.guild.name, interaction.guild.iconURL({
                dynamic: true
            }))
            .setDescription(
                "__**How to make a ticket**__\n" +


                "> Click on the button that relates to your issue\n" +

                "> Once the ticket is made you will be able to get the help you need\n" +
                
                "> Do not create a ticket if you don't need help. It will get you punished"

            )
            .setTitle('Tickets')


            const bt = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('player')
                .setLabel('Report a player')
                .setEmoji('<:Moderator:923206148499333141>')
                .setStyle('SUCCESS'),
            )
            .addComponents(
                new MessageButton()
                .setCustomId('bug')
                .setLabel('Report a bug')
                .setEmoji('<:warning2:923204949620457512>')
                .setStyle('SUCCESS'),
            )
            .addComponents(
                new MessageButton()
                .setCustomId('feed')
                .setLabel('Send some feedback')
                .setEmoji('<:Blurple_Sparkles:923208458638065665>')
                .setStyle('SUCCESS'),
            )
            .addComponents(
                new MessageButton()
                .setCustomId('staff')
                .setLabel('Report a staff member')
                .setEmoji('<:discordstaff:923208049961869343>')
                .setStyle('DANGER'),
            )
            .addComponents(
                new MessageButton()
                .setCustomId('other')
                .setLabel('Other')
                .setEmoji('<:DiscordQuestion:923209094687522906>')
                .setStyle('SECONDARY'),
                )

        interaction.reply({
            custom: true,
            content: 'Panel sent',
            ephemeral: true,
        })
        channel.send({embeds: [embed], components: [bt]})
    }
}
