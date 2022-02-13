const { MessageEmbed, InteractionWebhook } = require('discord.js')
const balanceSchema = require('../models/balance-schema')

module.exports = {
    name: 'balance',
    description: 'View balances, the leaderboard and transfer money',
    category: 'Economy',
    slash: true,
    options: [
        {
            name: 'view',
            description: 'View the balance of you or someone else',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'user',
                    description: 'The user to view',
                    type: 'USER',
                    required: false,
                },
            ],
        },
        {
            name: 'transfer',
            description: 'Give some of your money to another user',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'user',
                    description: 'The user to transfer money to',
                    type: 'USER',
                    required: 'true',
                },
                {
                    name: 'amount',
                    description: 'The amount to transfer',
                    type: 'NUMBER',
                    required: true,
                },
                {
                    name: 'message',
                    description: 'The message to send with the money',
                    type: 'STRING',
                    required: false,
                },
            ],
        },
        {
            name: 'leaderboard',
            description: 'Get the top 15 richest users',
            type: 'SUB_COMMAND',
        },
    ],

    callback: async ({interaction, Client}) => {
        if (interaction.options.getSubcommand() === 'view') {
            if (interaction.options.getUser('user')) {
                const user = interaction.options.getUser('user')
    
                const userBal = balanceSchema.findOne({userId: user.id}, async(err, bal)=>{
                    if(!bal) {
                    return `I could not find the user in my database`
                    }
                    
                    });
                    const walletBal = await balanceSchema.findOne({
                        userId: user.id,
                    })
    
                if (!walletBal) {
                    const balEmbed = new MessageEmbed()
                    .setTitle(`${user.username}'s balance`)
                    .setDescription(`**Wallet:** ⏣\`0\``)
                    .setColor('RANDOM')
                    return balEmbed
                } else {
                    const balEmbed = new MessageEmbed()
                    .setTitle(`${user.username}'s balance`)
                    .setDescription(`**Wallet:** ⏣\`${walletBal.amount}\``)
                    .setColor('RANDOM')
                    return balEmbed
                }
            } else {
                const user = interaction.user
    
                const userBal = balanceSchema.findOne({userId: user.id}, async(err, bal)=>{
                    if(!bal) {
                    return `I could not find the user in my database`
                    }
                    
                    });
                    const walletBal = await balanceSchema.findOne({
                        userId: user.id,
                    })
    
                if (!walletBal) {
                    const balEmbed = new MessageEmbed()
                    .setTitle(`${user.username}'s balance`)
                    .setDescription(`**Wallet:** ⏣\`0\``)
                    .setColor('RANDOM')
                    return balEmbed
                } else {
                    const balEmbed = new MessageEmbed()
                    .setTitle(`${user.username}'s balance`)
                    .setDescription(`**Wallet:** ⏣\`${walletBal.amount}\``)
                    .setColor('RANDOM')
                    return balEmbed
                }
            }
        } else if (interaction.options.getSubcommand() === 'transfer') {
            const recipient = interaction.options.getUser('user')
            const sender = interaction.user
            const amount = interaction.options.getNumber('amount')
            const message = interaction.options.getString('message')

            var walletBalSender = await balanceSchema.findOne({
                userId: sender.id,
            })
            var walletBalReciever = await balanceSchema.findOne({
                userId: recipient.id,
            })

            if (!walletBalSender) {
                return `Hmm, I couldn't find you in my database`
            }
            if (walletBalSender.amount < amount) {
                return `${sender}, you do not have enough money to do this. You have ⏣\`${walletBalSender.amount}\` and you want to send ⏣\`${amount}\`)`
            }
            if (sender === recipient) {
                return `${sender}, you can't send money to yourself`
            }

            const dataSend = await balanceSchema.findOne({
                userId: sender.id
            });
                dataSend.amount -= amount;
                dataSend.save();
            
                const dataRecieve = await balanceSchema.findOne({
                    userId: recipient.id
                });
                    dataRecieve.amount += amount;
                    dataRecieve.save();

                const sendMoneyEmbed = new MessageEmbed()
                .setTitle('Money Transfer')
                .setDescription(`You sent ⏣\`${amount}\` to ${recipient}. They now have ⏣\`${walletBalReciever.amount + amount}\` and you have ⏣\`${walletBalSender.amount - amount}\``)
                .addField('Message:', `${message || 'None'}`)
                .setColor('RANDOM')

                const sendMoneyEmbedUser = new MessageEmbed()
                .setTitle('You have been gifted')
                .setFields(
                    {
                        name: 'Amount',
                        value: `⏣\`${amount}\``,
                        inline: true,
                    }, {
                        name: 'Sender',
                        value: `${sender}`,
                        inline: true,
                    }, {
                        name: 'New Balance',
                        value: `⏣\`${walletBalReciever.amount + amount}\``,
                        inline: true,
                    }, {
                        name: 'Message',
                        value: `${message || 'None'}`,
                        inline: true,
                    },
                )
                .setColor('RANDOM')

                try {
                    recipient.send(sendMoneyEmbedUser)
                } catch (err) {
                    console.log(err)
                }

                return sendMoneyEmbed
                
            
        } else if (interaction.options.getSubcommand() === 'leaderboard') {
                let text = ''
                const results = await balanceSchema.find({

                }).sort({
                    amount: -1
                }).limit(15)

                for (let counter = 0; counter < results.length; ++counter) {
                    const { userId, amount = 0 } = results[counter]

                    text += `#${counter + 1} <@${userId}> - ⏣\`${amount}\`\n`
                }
                const lbEmbed = new MessageEmbed()
                .setTitle('Leaderboard')
                .setColor('RANDOM')
                .setDescription(text)
                return lbEmbed
        }
    }
}
