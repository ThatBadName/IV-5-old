const {
    MessageEmbed
} = require('discord.js')
const balanceSchema = require('../models/balance-schema')

module.exports = {
    name: 'coin',
    description: 'Manage a users coins.',
    category: 'Economy',
    slash: true,
    ownerOnly: true,
    options: [{
            name: 'action',
            description: 'The action to perform',
            type: 'STRING',
            required: true,
            choices: [{
                    name: 'add',
                    value: 'add'
                },
                {
                    name: 'set',
                    value: 'set',
                },
            ],
        },
        {
            name: 'user',
            description: 'The user to manage',
            type: 'USER',
            required: true,
        },
        {
            name: 'amount',
            description: 'The number of coins',
            type: 'NUMBER',
            required: true,
        },

    ],

    callback: async ({
        interaction
    }) => {
        const user = interaction.options.getUser('user');
        let amountAdd = interaction.options.getNumber('amount')

        if (interaction.options.getString('action') === 'add') {

            const data = await  balanceSchema.findOne({
                userId: user.id
            });
            
            let walletBalOg;
            
                if (!data) {
                    const newData = await balanceSchema.create({
                        userId: user.id,
                        amount: 0,
                    });
                    
                    newData.save();
                } else {
                    walletBal = data.amount;
                    data.amount += amountAdd;
                    data.save();
                }

            const embed = new MessageEmbed()
                .setTitle(`${user.username}'s balance`)
                .setFields({
                    name: 'Before:',
                    value: `⏣\`${walletBal}\``,
                    inline: true
                }, {
                    name: 'New Value:',
                    value: `⏣\`${data.amount}\``,
                    inline: true
                }, {
                    name: 'Amount Added:',
                    value: `⏣\`${amountAdd}\``,
                    inline: true,
                })
                .setColor('RANDOM')

            return embed



        } else if (interaction.options.getString('action') === 'set') {

            const data = await  balanceSchema.findOne({
                userId: user.id
            });
            
            let walletBalOg;
            
                if (!data) {
                    const newData = await balanceSchema.create({
                        userId: user.id,
                        amount: 0,
                    });
                    
                    newData.save();
                } else {
                    walletBal = data.amount;
                    data.amount = amountAdd;
                    data.save();
                }

            const embed = new MessageEmbed()
                .setTitle(`${user.username}'s balance`)
                .setFields({
                    name: 'Before:',
                    value: `⏣\`${walletBal}\``,
                    inline: true
                }, {
                    name: 'New Value:',
                    value: `⏣\`${data.amount}\``,
                    inline: true
                })
                .setColor('RANDOM')

            return embed


        }
    }
}
