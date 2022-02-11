//to run: node index.js

const DiscordJS = require("discord.js")
const dotenv = require("dotenv")
const WOKCommands = require("wokcommands")
const strikeSchema = require('./models/strike-schema')
const historySchema = require('./models/history-schema')
const path = require("path")
const antispamSchema = require('./models/antispam-schema')
const mongoose = require("mongoose")
const { MessageEmbed } = require('discord.js') 
const { DisTube } = require("distube")
const { SpotifyPlugin } = require("@distube/spotify")
const client = new DiscordJS.Client({
    intents: [
        DiscordJS.Intents.FLAGS.GUILDS,
        DiscordJS.Intents.FLAGS.GUILD_MESSAGES,
        DiscordJS.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        DiscordJS.Intents.FLAGS.GUILD_MEMBERS,
        DiscordJS.Intents.FLAGS.GUILD_VOICE_STATES,
        DiscordJS.Intents.FLAGS.DIRECT_MESSAGES
        //DiscordJS.Intents.FLAGS.GUILD_CHANNEL_UPDATE
    ]
})

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnEmpty: true,
    leaveOnFinish: false,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
})
module.exports = client

process.on("unhandledRejection", (reason, p) => {

    console.log(" [antiCrash] :: Unhandled Rejection/Catch");

    console.log(reason, p);

});

process.on("uncaughtException", (err, origin) => {

    console.log(" [antiCrash] :: Uncaught Exception/Catch");

    console.log(err, origin);

});

process.on("uncaughtExceptionMonitor", (err, origin) => {

    console.log(" [antiCrash] :: Uncaught Exception/Catch (MONITOR)");

    console.log(err, origin);

});

process.on("multipleResolves", (type, promise, reason) => {

    console.log(" [antiCrash] :: Multiple Resolves");

    console.log(type, promise, reason);

});  


dotenv.config()

client.events = require("./events/ticket/ticketSystem")

setInterval(() => {
    client.emit('tick')
    //console.log('Heartbeat')
}, 60 * 1000)


client.on('ready', async () => {
    client.user.setActivity('Back online', { type: 'PLAYING' });
    //await mongoose.connect(
        //process.env.MONGO_URI,
        //{
            //keepAlive: true,
        //})
    console.log('Bot online')

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'features'),
        eventsDir: path.join(__dirname, 'events'), 
        testServers: ['919242919829979136', '902937336478834749', '922510520312033290'],
        botOwners: ['804265795835265034', '561848864005554206'],
        mongoUri: process.env.MONGO_URI,
        dbOptions: {
            keepAlive: true
        }
      })
    
    setTimeout(async () => {
        await client.user.setActivity('Waking up (0%)', { type: 'PLAYING' })
    }, 1000)
    
    setTimeout(async () => {
          await client.user.setActivity('Waking up (10%)', { type: 'PLAYING' })
      }, 2000)

      setTimeout(async () => {
        await client.user.setActivity('Waking up (48%)', { type: 'PLAYING' })
    }, 4000)
    
    setTimeout(async () => {
        await client.user.setActivity('Waking up (99%)', { type: 'PLAYING' })
    }, 7000)

    setTimeout(async () => {
        await client.user.setActivity('I\'m ready', { type: 'PLAYING'})
    }, 12000)

    setTimeout(async () => {
        client.user.setActivity(' ', { type: ' ' })
    }, 20000)
})

client.on("messageCreate", async (message, guild) => {

    if(message.author.bot) return;
 
    const words = ['nigg', 'Nigg', 'NIGG', 'n1gg', 'N1gg', 'N1GG', 'n!gg', 'N!gg', 'N!GG', 'filtertest1234%%__', "paki", "pak1", "pak!", "Paki", "Pak1", "Pak!", "PAKI", "PAK1", "PAK!", "paky", "Paky", "paci", "pac1", "pak!", "Paci", "Pac1", "Pac!", "PAC1", "PACI", "PAC!", "n!g", "N!g", "N!G", "n1g", "N1g", "N1G"]

    for (const word of words) {

        if (message.content.includes(word)) {
            const guild = message.guild
            const logChannel = guild.channels.cache.find(channel => channel.name === 'twisted-logs')
            const user = message.author
            const member = message.guild.members.cache.get(user.id)
            const staff = '919242400738730005'
            const reason = `Saying a blacklisted word (message bellow):\n\n\`\`\`${message.content}\`\`\``
            try {
                message.delete();
                message.channel.send(`${user}, Please don't say that`)

                member.timeout(43200000, reason).catch((err) => {
                    console.log(err)
                })

                const strike = await strikeSchema.create({
                    userId: user?.id,
                    staffId: '919242400738730005',
                    guildId: guild?.id,
                    reason,
                })
    
                historySchema.create({
                    userId: user?.id,
                    staffId: '919242400738730005',
                    guildId: guild?.id,
                    reason,
                    punishmentId: strike.id,
                    type: 'strike',
                })
                
                historySchema.create({
                userId: user?.id,
                staffId: '919242400738730005',
                guildId: guild?.id,
                reason,
                duration: '12h',
                type: 'timeout',
            })
    
                const logEmbed = new MessageEmbed()
                    .setColor('PURPLE')
                    .setTitle('STRIKE ADD')
                    .setDescription(`${user} has been striken`)
                    .addField("Staff:", `[AUTOMOD]`)
                    .addField("Reason:", `[AUTOMOD] Saying a blacklisted word (message bellow):\n\n\`\`\`${message.content}\`\`\`  | You have also been put into timeout for 12 hours`)
                    .addField("ID:", `\`${strike.id}\``)
    
                logChannel.send({embeds: [logEmbed]})
    
                const embed = new MessageEmbed()
                    .setColor('DARK_RED')
                    .setTitle(`**You have been striken [AUTOMOD]**`)
                    .addField("Server:", `${guild}`)
                    .addField("Reason:", `[AUTOMOD] Saying a blacklisted word (message bellow):\n\n\`\`\`${message.content}\`\`\``)
                    .addField("ID:", `\`${strike.id}\``)
                    .setDescription('[Appeal here](https://forms.gle/27o21fUYCzZodosU9)')
                    .setFooter({text: 'To view all strikes do \'/liststrikes\''})
    
                await user.send({embeds: [embed]}).catch((err) => {
                    console.log(err)
                })
            } catch (err) {
                console.log(err)
            }
        }
        
        
    }

    try {
        const document = antispamSchema.findOne({userId: message.author.id}, async(err, doc)=>{
        if(!doc) {
        document.create({
        userId: message.author.id,
        messages: 0,
        })
        }
        
        });

        document.updateOne({userId: message.author.id}, {$inc: {messages:+1}}, {upsert: true})
        
        //update doc here outside the scope of the data it found/didn't find. 


        const messageCount = await antispamSchema.findOne({
            userId: message.author.id,
        })

        //message.channel.send(`${messageCount}`)


        if (messageCount.messages > 25) {
        message.channel.send(`${message.author} Please don't spam`)

        try {
            const guild = message.guild
            const logChannel = guild.channels.cache.find(channel => channel.name === 'twisted-logs')
            const user = message.author
            const member = message.guild.members.cache.get(user.id)
            var reason = `[AUTOMOD] Sending too many messages too quickly | You have also been put into timeout for 2 hours`

            member.timeout(7200000, reason).catch((err) => {
                console.log(err)
            })

            const strike = await strikeSchema.create({
                userId: user?.id,
                staffId: '919242400738730005',
                guildId: guild?.id,
                reason,
            })

            historySchema.create({
                userId: user?.id,
                staffId: '919242400738730005',
                guildId: guild?.id,
                reason,
                punishmentId: strike.id,
                type: 'strike',
            })
            
            historySchema.create({
                userId: user?.id,
                staffId: '919242400738730005',
                guildId: guild?.id,
                reason,
                duration: '2h',
                type: 'timeout',
            })

            const logEmbed = new MessageEmbed()
                .setColor('PURPLE')
                .setTitle('STRIKE ADD')
                .setDescription(`${user} has been striken`)
                .addField("Staff:", `[AUTOMOD]`)
                .addField("Reason:", `[AUTOMOD] Sending too many messages too quickly | You have also been put into timeout for 2 hours`)
                .addField("ID:", `\`${strike.id}\``)

            logChannel.send({embeds: [logEmbed]})

            const embed = new MessageEmbed()
                .setColor('DARK_RED')
                .setTitle(`**You have been striken [AUTOMOD]**`)
                .addField("Server:", `${guild}`)
                .addField("Reason:", `[AUTOMOD] Sending too many messages too quickly | You have also been put into timeout for 2 hours`)
                .addField("ID:", `\`${strike.id}\``)
                .setDescription('[Appeal here](https://forms.gle/27o21fUYCzZodosU9)')
                .setFooter({text: 'To view all strikes do \'/liststrikes\''})

            user.send({embeds: [embed]}).catch((err) => {
                console.log(err)
            })
        } catch (err) {
            console.log(err)
        }
    	}
        
        if (message.mentions.members.size > 3) {
        message.channel.send(`${message.author} Please don't mass ping users`)

        try {
            const guild = message.guild
            const logChannel = guild.channels.cache.find(channel => channel.name === 'twisted-logs')
            const user = message.author
            const member = message.guild.members.cache.get(user.id)
            var reason = `[AUTOMOD] Pinging too many users (${message.mentions.members.size} users) | You have also been put into timeout for 6 hours`

            member.timeout(21600000, reason).catch((err) => {
                console.log(err)
            })

            const strike = await strikeSchema.create({
                userId: user?.id,
                staffId: '919242400738730005',
                guildId: guild?.id,
                reason,
            })

            historySchema.create({
                userId: user?.id,
                staffId: '919242400738730005',
                guildId: guild?.id,
                reason,
                punishmentId: strike.id,
                type: 'strike',
            })
            
            historySchema.create({
                userId: user?.id,
                staffId: '919242400738730005',
                guildId: guild?.id,
                reason,
                type: 'timeout',
            })

            const logEmbed = new MessageEmbed()
                .setColor('PURPLE')
                .setTitle('STRIKE ADD')
                .setDescription(`${user} has been striken`)
                .addField("Staff:", `[AUTOMOD]`)
                .addField("Reason:", `[AUTOMOD] Pinging too many users (${message.mentions.members.size} users) | You have also been put into timeout for 6 hours`)
                .addField("ID:", `\`${strike.id}\``)

            logChannel.send({embeds: [logEmbed]})

            const embed = new MessageEmbed()
                .setColor('DARK_RED')
                .setTitle(`**You have been striken [AUTOMOD]**`)
                .addField("Server:", `${guild}`)
                .addField("Reason:", `[AUTOMOD] Pinging too many users (${message.mentions.members.size} users) | You have also been put into timeout for 6 hours`)
                .addField("ID:", `\`${strike.id}\``)
                .setDescription('[Appeal here](https://forms.gle/27o21fUYCzZodosU9)')
                .setFooter({text: 'To view all strikes do \'/liststrikes\''})

            user.send({embeds: [embed]}).catch((err) => {
                console.log(err)
            })
        } catch (err) {
            console.log(err)
        }

    }
    } catch (err) {
        //console.log(err)
    }
})

client.on('tick', async() => {
    antispamSchema.collection.deleteMany()
})

client.login(process.env.TOKEN)
