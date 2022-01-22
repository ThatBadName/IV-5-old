const {
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    Message
} = require('discord.js');

const client = require("../../index");
const staff = '924999740066766888'

client.on("interactionCreate", async (interaction, message) => {



    if (interaction.isButton()) {

        if (interaction.customId === 'other') {



            const guild = interaction.guild;
            const user = interaction.user
            const check = guild.channels.cache.find((c) => c.name === `${user.id}`)

            if (!check) {
                const x = interaction.guild.channels.create(`${interaction.user.id}`, {
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
                        content: `Welcome <@${interaction.user.id}> <@&${staff}>`,
                        embeds: [embed],
                        components: [del]
                    })
                }).then(interaction.reply({
                    content: `Created ticket`,
                    ephemeral: true
                }))

                const embed = new MessageEmbed()
                    .setTitle('Ticket | OTHER')
                    .setDescription('Hello,\nStaff will be with you as soon as possible. Meanwhile please tell us about your issue\nThank You!')
                	.setFooter('Only the support team can delete tickets')
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
                //interaction.user.send('Your ticket has been opened!');

                //setTimeout(() => {

                //interaction.channel.bulkDelete(1)

                //}, 5000)
            } else {
                interaction.reply({
                    custom: true,
                    content: "You already have an open ticket",
                    ephemeral: true,
                })
            }

        } else if (interaction.customId === 'player') {

            const guild = interaction.guild;
            const user = interaction.user
            const check = guild.channels.cache.find((c) => c.name === `${user.id}`)

            if (!check) {
                const x = interaction.guild.channels.create(`${interaction.user.id}`, {
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
                        content: `Welcome <@${interaction.user.id}> <@&${staff}>`,
                        embeds: [embed],
                        components: [del]
                    })
                }).then(interaction.reply({
                    content: `Created ticket`,
                    ephemeral: true
                }))

                const embed = new MessageEmbed()
                    .setTitle('Ticket | PLAYER REPORT')
                    .setDescription('Hello,\nStaff will be with you as soon as possible. Meanwhile please tell us about your issue\nThank You!\n\n**Report Template:**\n\`\`\`**Offender:**\n**Reason:**\n**Proof:**\n**Other Notes:**\`\`\`')
                	.setFooter('Only the support team can delete tickets')
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
                //interaction.user.send('Your ticket has been opened!');

                //setTimeout(() => {

                //interaction.channel.bulkDelete(1)

                //}, 5000)
            } else {
                interaction.reply({
                    custom: true,
                    content: "You already have an open ticket",
                    ephemeral: true,
                })
            }

        } else if (interaction.customId === 'staff') {

            const guild = interaction.guild;
            const user = interaction.user
            const check = guild.channels.cache.find((c) => c.name === `${user.id}`)

            if (!check) {
                const x = interaction.guild.channels.create(`${interaction.user.id}`, {
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
                            id: '922511138430791721',
                            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS']
                        },
                        {
                            id: '922574032627462145',
                            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS']
                        }
                    ],
                    type: 'text',
                    parent: '924772484010627072'
                }).then(async channel => {
                    channel.send({
                        content: `Welcome <@${interaction.user.id}> <@&${staff}>`,
                        embeds: [embed],
                        components: [del]
                    })
                }).then(interaction.reply({
                    content: `Created ticket`,
                    ephemeral: true
                }))

                const embed = new MessageEmbed()
                    .setTitle('Ticket | STAFF REPORT')
                    .setDescription('Hello,\nStaff will be with you as soon as possible. Meanwhile please tell us about your issue\nThank You!\n\n**Report Template:**\n\`\`\`**Offender:**\n**Reason:**\n**Proof:**\n**Other Notes:**\`\`\`')
                	.setFooter('Only the support team can delete tickets')
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
                //interaction.user.send('Your ticket has been opened!');

                //setTimeout(() => {

                //interaction.channel.bulkDelete(1)

                //}, 5000)
            } else {
                interaction.reply({
                    custom: true,
                    content: "You already have an open ticket",
                    ephemeral: true,
                })
            }

        } else if (interaction.customId === 'bug') {

            const guild = interaction.guild;
            const user = interaction.user
            const check = guild.channels.cache.find((c) => c.name === `${user.id}`)

            if (!check) {
                const x = interaction.guild.channels.create(`${interaction.user.id}`, {
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
                        content: `Welcome <@${interaction.user.id}> <@&${staff}>`,
                        embeds: [embed],
                        components: [del]
                    })
                }).then(interaction.reply({
                    content: `Created ticket`,
                    ephemeral: true
                }))

                const embed = new MessageEmbed()
                    .setTitle('Ticket | BUG REPORT')
                    .setDescription('Hello,\nStaff will be with you as soon as possible. Meanwhile please tell us about your issue\nThank You!\n\n**Report Template:**\n\`\`\`**Bug:**\n**How you found it:**\n**Proof:**\n**Other Notes:**\`\`\`')
                	.setFooter('Only the support team can delete tickets | Bugs must be reproduceable')
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
                //interaction.user.send('Your ticket has been opened!');

                //setTimeout(() => {

                //interaction.channel.bulkDelete(1)

                //}, 5000)
            } else {
                interaction.reply({
                    custom: true,
                    content: "You already have an open ticket",
                    ephemeral: true,
                })
            }

        } else if (interaction.customId === 'feed') {

            const guild = interaction.guild;
            const user = interaction.user
            const check = guild.channels.cache.find((c) => c.name === `${user.id}`)

            if (!check) {
                const x = interaction.guild.channels.create(`${interaction.user.id}`, {
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
                        content: `Welcome <@${interaction.user.id}> <@&${staff}>`,
                        embeds: [embed],
                        components: [del]
                    })
                }).then(interaction.reply({
                    content: `Created ticket`,
                    ephemeral: true
                }))

                const embed = new MessageEmbed()
                    .setTitle('Ticket | FEEDBACK')
                    .setDescription('Hello,\nStaff will be with you as soon as possible. Meanwhile please tell us about your issue\nThank You!')
                	.setFooter('Only the support team can delete tickets')
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
                //interaction.user.send('Your ticket has been opened!');

                //setTimeout(() => {

                //interaction.channel.bulkDelete(1)

                //}, 5000)
            } else {
                interaction.reply({
                    custom: true,
                    content: "You already have an open ticket",
                    ephemeral: true,
                })
            }

        } else if (interaction.customId === 'del') {
            if(!interaction.member.permissions.has('MANAGE_MESSAGES')) return;
            
            const thread = interaction.channel
            thread.delete();
        }


    }

})
