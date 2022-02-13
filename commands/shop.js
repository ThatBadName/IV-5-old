const { MessageEmbed, InteractionWebhook } = require('discord.js')
const shopSchema = require('../models/shop-schema')
const balanceSchema = require('../models/balance-schema')

module.exports = {
    name: 'shop',
    description: 'Manage/buy an item from the shop.',
    category: 'Economy',
    slash: true,
    options: [
        {
            name: 'add',
            description: 'Add an item to the shop',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'name',
                    description: 'The name of the item',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'description',
                    description: 'The description of the item',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'price',
                    description: 'The price of the item',
                    type: 'NUMBER',
                    required: true,
                },
                {
                    name: 'stock',
                    description: 'The amount of stock this item has (put 0 for infinity)',
                    type: 'NUMBER',
                    required: true,
                },
                {
                    name: 'role',
                    description: 'The role to be given for buying this item',
                    type: 'ROLE',
                    required: true,
                },
            ],
        },
        {
            name: 'restock',
            description: 'Restock an item in the shop',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'item',
                    description: 'The item to restock',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'stock',
                    description: 'How much to set the stock to',
                    type: 'NUMBER',
                    required: true,
                },
            ],
        },
        {
            name: 'remove',
            description: 'Remove an item from the shop',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'item',
                    description: 'The name of the item to remove',
                    type: 'STRING',
                    required: true,
                },
            ],
        },
        {
            name: 'edit',
            description: 'Edit an item on the shop',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'item',
                    description: 'The item to edit',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'new-name',
                    description: 'Change the name of the item',
                    type: 'STRING',
                    required: false,
                },
                {
                    name: 'new-description',
                    description: 'Change the description of the item',
                    type: 'STRING',
                    required: false,
                },
                {
                    name: 'new-price',
                    description: 'Change the price of the item',
                    type: 'NUMBER',
                    required: false,
                },
                {
                    name: 'new-stock',
                    description: 'Change the stock of the item (put 0 for infinity)',
                    type: 'NUMBER',
                    required: false,
                },
                {
                    name: 'new-role',
                    description: 'Change the role of the item',
                    type: 'ROLE',
                    required: false,
                },
            ],
        },
        {
            name: 'view',
            description: 'View the shop',
            type: 'SUB_COMMAND',
        },
        {
            name: 'info',
            description: 'Get more infomation on an item',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'item',
                    description: 'The item to view',
                    type: 'STRING',
                    required: true,
                },
            ],
        },
        {
            name: 'buy',
            description: 'Buy an item from the shop',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'item',
                    description: 'The name of the item to buy',
                    type: 'STRING',
                    required: true,
                },
            ],
        },
    ],

    callback: async ({interaction, guild, member}) => {
        if(interaction.options.getSubcommand() === 'add') {
            if(!member.permissions.has('ADMINISTRATOR')) return `You do not have permission to use this`

            const name = interaction.options.getString('name')
            const description = interaction.options.getString('description')
            const price = interaction.options.getNumber('price')
            var stock = interaction.options.getNumber('stock')
            const role = interaction.options.getRole('role')

            await shopSchema.create({
                itemName: name,
                itemDescription: description,
                itemPrice: price,
                itemRole: role,
                itemStock: stock
            })

            if (stock === 0) {
                var stock = '∞'
            }

            const shopAddEmbed = new MessageEmbed()
            .setTitle('Added new item to the shop')
            .setColor('GREEN')
            .setFields(
                {
                    name: 'Item Name',
                    value: `${name}`,
                    inline: true,
                }, {
                    name: 'Item Description',
                    value: `${description}`,
                    inline: true,
                }, {
                    name: 'Item Price',
                    value: `⏣\`${price}\``,
                    inline: true,
                }, {
                    name: 'Item Stock',
                    value: `\`${stock}\``,
                    inline: true,
                }, {
                    name: 'Item Role',
                    value: `${role}`,
                    inline: true,
                }
            )
            return shopAddEmbed
        } else if (interaction.options.getSubcommand() === 'remove') {
            if(!member.permissions.has('ADMINISTRATOR')) return `You do not have permission to use this`

            const name = await interaction.options.getString('item')
            const result = await shopSchema.findOneAndDelete({
                itemName: name
            })

            const shopRemoveEmbed = new MessageEmbed()
            .setTitle('Removed an item from the shop')
            .setFields(
                {
                    name: 'Item Name',
                    value: `${result.itemName}`,
                    inline: true,
                }, {
                    name: 'Item Description',
                    value: `${result.itemDescription}`,
                    inline: true,
                }, {
                    name: 'Item Price',
                    value: `⏣\`${result.itemPrice}\``,
                    inline: true,
                }, {
                    name: 'Item Stock',
                    value: `\`${result.itemStock}\``,
                    inline: true,
                }, {
                    name: 'Item Role',
                    value: `${result.itemRole}`,
                    inline: true,
                }
            )
            .setColor('RED')

            if (!result) {
                return `Could not find item with the name "${name}"`
            } else {
                return shopRemoveEmbed
            }
            
        } else if (interaction.options.getSubcommand() === 'view') {
            const items = await shopSchema.find()

            let title = `Welcome to the IV-5 shop`
            let description = ``

            for (const item of items) {
                description += `> **${item.itemName}**\n`
                description += `> **Price:** ⏣\`${item.itemPrice}\`\n`
                description += `> **Stock Left:** \`${item.itemStock}\`\n\n`
            }
            const shopViewEmbed = new MessageEmbed().setTitle(title).setDescription(description).setColor('RANDOM')
            return shopViewEmbed
        } else if (interaction.options.getSubcommand() === 'info') {
            const name = interaction.options.getString('item')
            const item = await shopSchema.findOne({
                itemName: name
            })

            if (!item) {
                return `Could not find item with the name "${name}"`
            } else {
                const shopInfoEmbed = new MessageEmbed()
                    .setTitle(`Info on "${item.itemName}"`)
                    .setFields(
                        {
                            name: 'Item Name',
                            value: `${item.itemName}`,
                            inline: true,
                        }, {
                            name: 'Item Description',
                            value: `${item.itemDescription}`,
                            inline: true,
                        }, {
                            name: 'Item Price',
                            value: `⏣\`${item.itemPrice}\``,
                            inline: true,
                        }, {
                            name: 'Item Stock',
                            value: `\`${item.itemStock}\``,
                            inline: true,
                        }, {
                            name: 'Item Role',
                            value: `${item.itemRole}`,
                            inline: true,
                        }
                    )
                    .setColor('RANDOM')
                    return shopInfoEmbed
            }
        } else if (interaction.options.getSubcommand() === 'buy') {
                const name = interaction.options.getString('item')
                const user = interaction.user
                const item = await shopSchema.findOne({
                    itemName: name
                })
                var walletBal = await balanceSchema.findOne({
                    userId: user.id,
                })

                if (item.itemStock === 0) {
                    return `${user}, this item is out of stock`
                }
                if (!item) {
                    return `I could not find that item`
                }
                if (!walletBal) {
                    return `Hmm, I couldn't find you in my database`
                }
                if (walletBal.amount < item.itemPrice) {
                    return `${user}, you do not have enough money to buy this (You have ⏣\`${walletBal.amount}\` and ${item.itemName} requires ⏣\`${item.itemPrice}\`)`
                }

                const data = await balanceSchema.findOne({
                    userId: user.id
                });
                    data.amount -= item.itemPrice;
                    data.save();

                    
                const role = item.itemRole.replace(/[<@!&>]/g, '')
                interaction.member.roles.add(role)

                if (item.itemStock === '∞') {

                } else {
                    item.itemStock -= 1,
                    item.save()
                }
                return `${user}, you have bought ${item.itemName} for ⏣\`${item.itemPrice}\``


        } else if (interaction.options.getSubcommand() === 'restock') {
            if(!member.permissions.has('ADMINISTRATOR')) return `You do not have permission to use this`

            const name = interaction.options.getString('item')
            const stock = interaction.options.getNumber('stock')

            const item = await shopSchema.findOne({
                itemName: name
            })
            const shopUpdateEmbed = new MessageEmbed()
            .setTitle('Updated item in the shop')
            .setColor('GREEN')
            .setFields(
                {
                    name: 'Item Name',
                    value: `${name}`,
                    inline: true,
                }, {
                    name: 'Item Description',
                    value: `${item.itemDescription}`,
                    inline: true,
                }, {
                    name: 'Item Price',
                    value: `⏣\`${item.itemPrice}\``,
                    inline: true,
                }, {
                    name: 'Item Stock Before',
                    value: `\`${item.itemStock}\``,
                    inline: true,
                },
                {
                    name: 'Item Stock Added',
                    value: `\`${stock}\``,
                    inline: true,
                }, {
                    name: 'Item Stock After',
                    value: `\`${item.itemStock += stock}\``,
                    inline: true,
                }, {
                    name: 'Item Role',
                    value: `${item.itemRole}`,
                    inline: true,
                }
            )

            if(!item) {
                return `I could not find that item`
            } else {
                item.itemStock + stock
                item.save()
                return shopUpdateEmbed
            }

        } else if (interaction.options.getSubcommand() === 'edit') {
            if(!member.permissions.has('ADMINISTRATOR')) return `You do not have permission to use this`
            const name = interaction.options.getString('item')

            const item = await shopSchema.findOne({
                itemName: name
            })

            if(!item) {
                return `I could not find that item`
            } else {
                    const oldStock = item.itemStock
                    const oldName = item.itemName
                    const oldDesc = item.itemDescription
                    const oldPrice = item.itemPrice
                    const oldRole = item.itemRole
                    const name = interaction.options.getString('new-name') || item.itemName
                    const description = interaction.options.getString('new-description') || item.itemDescription
                    const price = interaction.options.getNumber('new-price') || item.itemPrice
                    var stock = interaction.options.getNumber('new-stock') || item.itemStock
                    const role = interaction.options.getRole('new-role') || item.itemRole

                    if (stock === 0) {
                        var stock = '∞'
                    }
                    if (stock === null) {
                        var stock = item.itemStock
                    }
                    item.itemName = name,
                    item.itemDescription = description,
                    item.itemPrice = price,
                    item.itemStock = stock,
                    item.itemRole = role,
                    item.save()

                    const shopEditEmbed = new MessageEmbed()
                        .setTitle('Updated item in the shop')
                        .setColor('GREEN')
                        .setFields(
                            {
                                name: 'Old Item Name',
                                value: `${oldName}`,
                                inline: true,
                            }, {
                                name: 'New Item Name',
                                value: `${name}`,
                                inline: true,
                            }, {
                                name: 'Old Item Description',
                                value: `${oldDesc}`,
                                inline: true,
                            }, {
                                name: 'New Item Description',
                                value: `${description}`,
                                inline: true,
                            }, {
                                name: 'Old Item Price',
                                value: `⏣\`${oldPrice}\``,
                                inline: true,
                            }, {
                                name: 'New Item Price',
                                value: `⏣\`${price}\``,
                                inline: true,
                            }, {
                                name: 'Old Item Stock',
                                value: `\`${oldStock}\``,
                                inline: true,
                            }, {
                                name: 'New Item Stock',
                                value: `\`${stock}\``,
                                inline: true,
                            }, {
                                name: 'Old Item Role',
                                value: `${oldRole}`,
                                inline: true,
                            }, {
                                name: 'New Item Role',
                                value: `${role}`,
                                inline: true,
                            }
                        )

                return shopEditEmbed
            }
        }
    }
}
