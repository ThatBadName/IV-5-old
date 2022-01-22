const { MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = {
    category: 'Config',
    description: 'Add a role selector as a dropdown box to a message.',
    cooldown: '3s',

    permissions: ['ADMINISTRATOR'],

    minArgs: 3,
    maxArgs: 3,
    expectedArgs: '<channel> <messageId> <role>',
    expectedArgsTypes: ['CHANNEL', 'STRING', 'ROLE'],

    slash: 'both',
    //testOnly: true,
    guildOnly: true,

    init: (client) => {
        client.on('interactionCreate', interaction => {
            if (!interaction.isSelectMenu()) {
                return
            }

            const { customId, values, member } = interaction
            if (customId === 'auto_roles') {
                const component = interaction.component
                const removed = component.options.filter((option) => {
                    return !values.includes(option.value)
                })

                for (const id of removed) {
                    member.roles.remove(id.value)
                }

                for (const id of values) {
                    member.roles.add(id)
                }

                interaction.reply({
                    content: 'I have updated your roles for you',
                    ephemeral: true,
                })
            }
        })
    },

    callback: async ({ message, interaction, args, client, guild }) => {
        
        if(!guild) {
            return ('This command can only be run in a server')
        }
        
        const channel = message ? message.mentions.channels.first() : interaction.options.getChannel('channel')
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'Thats not a valid text channel'
        }

        const messageId = args[1]

        const role = message ? message.mentions.roles.first() : interaction.options.getRole('role')
        if (!role) {
            return 'Unknown role'
        }

        const targetMessage = await channel.messages.fetch(messageId, {
            cache: true,
            force: true
        })

        if (!targetMessage) {
            return 'Unknown message ID'
        }

        if (targetMessage.author.id !== client.user?.id) {
            return `Please provide a message ID that was sent from <@${client.user?.id}>`
        }

        let row = targetMessage.components[0]
        if (!row) {
            row = new MessageActionRow()
        }

        const option = [{
            label: role.name,
            value: role.id
        }]

        let menu = row.components[0]
        if (menu) {
            for (const o of menu.options) {
                if (o.value === option[0].value) {
                    return {
                        custom: true,
                        content: `<@&${o.value}> is already part of this menu`,
                        allowedMentions: {
                            roles: [],
                        },
                        ephemeral: true,
                    }
                }
            }

            menu.addOptions(option)
            menu.setMaxValues(menu.options.length)
        } else {
            row.addComponents(
                new MessageSelectMenu()
                .setCustomId('auto_roles')
                .setMinValues(0)
                .setMaxValues(1)
                .setPlaceholder('Select the roles you want...')
                .addOptions(option)
            )
        }

        targetMessage.edit({
            components: [row]
        })

        return {
            custom: true,
            content: `Added <@&${role.id}> to the self roles menu`,
            allowedMentions: {
                roles: [],
            },
            ephemeral: true,
        }
    }
}
