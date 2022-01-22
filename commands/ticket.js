const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
    name: 'ticket',
    description: 'Ticket management (Can have multiple tickets with 1 user open).',
    category: 'Moderation',
    slash: true,
    requireRoles: true,
    guildOnly: true,
    options: [
        {
            name: 'create',
            description: 'Create a ticket with a certain user',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'user',
                    description: 'The user to create a ticket with',
                    type: 'USER',
                    required: true,
                },
                {
                    name: "private",
                    description: "Whether the ticket is hidden from staff or not",
                    type: "BOOLEAN",
                    required: true,
                },
            ],
        },
        {
            name: 'delete',
            description: 'Delete a ticket with a certain user',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'user',
                    description: 'The user of the ticket to delete',
                    type: 'USER',
                    required: true,
                },
            ],
        },
        {
            name: 'add',
            description: 'Add a user to a ticket',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'user',
                    description: 'The user to add to a ticket',
                    type: 'USER',
                    required: true,
                },
                {
                    name: 'ticket',
                    description: 'The ticket to add the user to',
                    required: true,
                    type: 'CHANNEL',
                    channelTypes: ['GUILD_TEXT'],
                },
            ],
        },
        {
            name: 'remove',
            description: 'Remove a user from a ticket',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'user',
                    description: 'The user to remove from a ticket',
                    type: 'USER',
                    required: true,
                },
                {
                    name: 'ticket',
                    description: 'The ticket to remove the user from',
                    required: true,
                    type: 'CHANNEL',
                    channelTypes: ['GUILD_TEXT'],
                },
            ],
        },
    ],

    callback: async ({interaction, guild}) => {
        
        try {
            const action = interaction.options.getSubcommand('ticket')
        const user = interaction.options.getUser('user')
        var ticket = interaction.options.getChannel('ticket') || guild.channels.cache.find(channel => channel.name === user.id)
        const private = interaction.options.getBoolean('private')
        const staff = interaction.user.id

        if (action === 'create') {
            if (private === false) {
                interaction.guild.channels.create(`${user.id}`, {
                permissionOverwrites: [
                        {
                            id: interaction.user.id,
                            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: ['VIEW_CHANNEL']
                        },
                        {
                            id: user.id,
                            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                        },
                        {
                            id: '924999740066766888',
                            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS']
                        },
                        {
                            id: '922511138430791721',
                            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS']
                        }
                    ],
                    type: 'text',
                    parent: '924772484010627072'
            }).then(async channel => {
                channel.send({
                    content: `Welcome <@${user.id}> <@${staff}>`,
                    embeds: [embed],
                    components: [del]
                })
            }).then(interaction.reply({
                content: `Created ticket`,
                ephemeral: true
            })) 

            const embed = new MessageEmbed()
                .setTitle('Ticket | FORCED')
                .setDescription('Hello,\nYou have been forced into this ticket. Staff should soon be with you.\nThank You!')
                .setColor('GREEN')
                .setTimestamp()
                .setAuthor(interaction.guild.name, interaction.guild.iconURL({
                    dynamic: true
                })) 

            const del = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('del')
                    .setLabel('🗑️ Delete Ticket')
                    .setStyle('DANGER'),
                );
            } else {
                interaction.guild.channels.create(`${user.id}`, {
                permissionOverwrites: [
                        {
                            id: interaction.user.id,
                            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: ['VIEW_CHANNEL']
                        },
                        {
                            id: user.id,
                            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                        },
                        {
                           id: "919242400738730005",
                           allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS']
                        }
                    ],
                    type: 'text',
                    parent: '924772484010627072'
            }).then(async channel => {
                channel.send({
                    content: `Welcome <@${user.id}> <@${staff}>`,
                    embeds: [embed],
                    components: [del]
                })
            }).then(interaction.reply({
                content: `Created ticket`,
                ephemeral: true
            })) 

            const embed = new MessageEmbed()
                .setTitle('Ticket | FORCED')
                .setDescription('Hello,\nYou have been forced into this ticket. Staff should soon be with you.\nThank You!')
                .setColor('GREEN')
                .setTimestamp()
                .setAuthor(interaction.guild.name, interaction.guild.iconURL({
                    dynamic: true
                })) 

            const del = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('del')
                    .setLabel('🗑️ Delete Ticket')
                    .setStyle('DANGER'),
                );
            }
            
        } else if (action === 'delete') {

            interaction.reply ({
                custom: true,
                content: 'Deleted that ticket (if a ticket was found with that user. ||My dev is too lazy to fix the error message so removed it alltogether||)',
                ephemeral: true,
            })
            ticket.delete()
            
        } else if (action === 'add') {

            if (!/^[0-9]{18}/g.test(ticket.name)) return ({
                custom: true,
                content: 'That is not a valid ticket',
                ephemeral: true,
            })

            ticket.permissionOverwrites.create(user, { VIEW_CHANNEL: true, SEND_MESSAGES: true })
            interaction.reply ({
                custom: true,
                content: `Added <@${user.id}> to ${ticket}`,
                ephemeral: true,
            })
            
        } else if (action === 'remove') {

            if (!/^[0-9]{18}/g.test(ticket.name)) return ({
                custom: true,
                content: 'That is not a valid ticket',
                ephemeral: true,
            })

            ticket.permissionOverwrites.delete(user.id)
            interaction.reply ({
                custom: true,
                content: `Removed <@${user.id}> from ${ticket}`,
                ephemeral: true,
            })
            
        }
        } catch (err) {
            console.log(err)
            //interaction.reply ({
              //  custom: true,
                //content: 'There was an error while trying to perform yur request, please try again',
                //ephemeral: true,
            //})
        }
    }
}
