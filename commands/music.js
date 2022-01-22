const { CommandInteraction, MessageEmbed, Client } = require('discord.js')
const { filterFormats } = require('ytdl-core')

module.exports = {
    name: 'music',
    description: 'Yay music. Time for your bad playlists (u suk).',
    category: 'Fun',
    //testOnly: true,
    cooldown: '5s',
    requireRoles: true,
    slash: true,
    guildOnly: true,
    options: [
        {
            name: 'play',
            description: 'Play a song',
            type: 'SUB_COMMAND',
            options: [{ name: 'query', description: 'Provide a name or URL for a song', type: 'STRING', required: true }],
        },
        {
            name: 'volume',
            description: 'Change the volume of the player',
            type: 'SUB_COMMAND',
            options: [{ name: 'percent', description: '10 = 10%', type: 'NUMBER', required: true }],
        },
        {
            name: 'options',
            description: 'Select an option',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'options',
                    description: 'Select an option',
                    type: 'STRING',
                    required: false,
                    choices: [
                        {name: 'queue', description: 'Add a song to the queue', value: 'queue'},
                        {name: 'skip', description: 'Skip the current song', value: 'skip'},
                        {name: 'pause', description: 'Pause the song', value: 'pause'},
                        {name: 'stop', description: 'Stop the music', value: 'stop'},
                        {name: 'resume', description: 'Resume the song', value: 'resume'},
                        {name: 'shuffle', description: 'Shuffle the queue', value: 'shuffle'},
                        {name: 'autoplay', description: 'Enable/disable autoplay', value: 'auto'},
                        {name: 'simmalar', description: 'Add a simmalar song to the one currently playing', value: 'relate'},
                        {name: 'loop', description: 'Loop the queue/song', value: 'loop'},
            ]},
        // {
        //     name: 'jump',
        //     description: 'Jump to a certain song',
        //     required: false,
        //     type: 'INTEGER'
        // },
    ],
        },
        {
            name: 'filters',
            description: 'oh no',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'filters',
                    description: 'Choose a filter',
                    type: 'STRING',
                    required: true,
                    choices: [
                        {name: 'clear', value: "clear"},
                        {name: 'bass', value: 'bassboost'},
                        {name: '3d', value: '3d'},
                        {name: 'echo', value: 'echo'},
                        {name: 'karaoke', value: 'karaoke'},
                        {name: 'nightcore', value: 'nightcore'},
                        {name: 'vaporwave', value: 'vaporwave'},
                        {name: 'flanger', value: 'flanger'},
                        {name: 'gate', value: 'gate'},
                        {name: 'haas', value: 'haas'},
                        {name: 'reverse', value: 'reverse'},
                        {name: 'surround', value: 'surround'},
                        {name: 'mcompand', value: 'mcompand'},
                        {name: 'phaser', value: 'phaser'},
                        {name: 'tremolo', value: 'tremolo'},
                        {name: 'earwax', value: 'earwax'},
                ],
                },
            ],
        },
    ],
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */

    callback: async ({ interaction, client, guild }) => {
        
        if(!guild) {
            return ('This command can only be run in a server')
        }
        
        const { options, member, channel } = interaction
        const VoiceChannel = member.voice.channel

        if (!VoiceChannel) {
            return interaction.reply({custom: true, content: 'You must be in a VC to use this command', ephemeral: true})
        }

        if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId) {
            return interaction.reply({custom: true, content: `I'm already vibin' in <#${guild.me.voice.channelId}>. Come join us`, ephemeral: true})
        }

        try {

            switch(options.getSubcommand()) {
                case 'play' : {
                    client.distube.playVoiceChannel ( VoiceChannel, options.getString('query'), { textChannel: channel, member: member })
                    return interaction.reply({content: ' Request recieved'})
                }

                case 'volume' : {
                    const Volume = options.getNumber('percent')
                    if (Volume > 100 || Volume < 1) {
                        return interaction.reply({content: 'Please specify a number 1-100'})
                    }

                    client.distube.setVolume(VoiceChannel, Volume)
                    return interaction.reply({content: `Volume has been set to ${Volume}%`})
                }

                case 'filters' : {
                    const queue = await client.distube.getQueue(VoiceChannel)

                    if (!queue) {
                        return interaction.reply({content: 'There is no queue'})
                    }

                    

                    switch(options.getString('filters')) {

                    case 'clear' : {
                        const filter = options.getString('filters')
                        await queue.setFilter()
                        return interaction.reply({content: `Set the filter to ${filter}`})
                    }

                    case 'bassboost' : {
                        const filter = options.getString('filters')
                        await queue.setFilter(filter)
                        return interaction.reply({content: `Set the filter to ${filter}`})
                    }

                    case '3d' : {
                        const filter = options.getString('filters')
                        await queue.setFilter(filter)
                        return interaction.reply({content: `Set the filter to ${filter}`})
                    }

                    case 'echo' : {
                        const filter = options.getString('filters')
                        await queue.setFilter(filter)
                        return interaction.reply({content: `Set the filter to ${filter}`})
                    }

                    case 'karaoke' : {
                        const filter = options.getString('filters')
                        await queue.setFilter(filter)
                        return interaction.reply({content: `Set the filter to ${filter}`})
                    }

                    case 'nightcore' : {
                        const filter = options.getString('filters')
                        await queue.setFilter(filter)
                        return interaction.reply({content: `Set the filter to ${filter}`})
                    }

                    case 'vaporwave' : {
                        const filter = options.getString('filters')
                        await queue.setFilter(filter)
                        return interaction.reply({content: `Set the filter to ${filter}`})
                    }

                    case 'flanger' : {
                        const filter = options.getString('filters')
                        await queue.setFilter(filter)
                        return interaction.reply({content: `Set the filter to ${filter}`})
                    }

                    case 'gate' : {
                        const filter = options.getString('filters')
                        await queue.setFilter(filter)
                        return interaction.reply({content: `Set the filter to ${filter}`})
                    }

                    case 'haas' : {
                        const filter = options.getString('filters')
                        await queue.setFilter(filter)
                        return interaction.reply({content: `Set the filter to ${filter}`})
                    }

                    case 'reverse' : {
                        const filter = options.getString('filters')
                        await queue.setFilter(filter)
                        return interaction.reply({content: `Set the filter to ${filter}`})
                    }

                    case 'surround' : {
                        const filter = options.getString('filters')
                        await queue.setFilter(filter)
                        return interaction.reply({content: `Set the filter to ${filter}`})
                    }

                    case 'mcompand' : {
                        const filter = options.getString('filters')
                        await queue.setFilter(filter)
                        return interaction.reply({content: `Set the filter to ${filter}`})
                    }

                    case 'phaser' : {
                        const filter = options.getString('filters')
                        await queue.setFilter(filter)
                        return interaction.reply({content: `Set the filter to ${filter}`})
                    }

                    case 'tremolo' : {
                        const filter = options.getString('filters')
                        await queue.setFilter(filter)
                        return interaction.reply({content: `Set the filter to ${filter}`})
                    }

                    case 'earwax' : {
                        const filter = options.getString('filters')
                        await queue.setFilter(filter)
                        return interaction.reply({content: `Set the filter to ${filter}`})
                    }
                }
                }

                // case 'jump' : {

                //     const queue = await client.distube.getQueue(VoiceChannel)

                //     if (!queue) {
                //         return interaction.reply({content: 'There is no queue'})
                //     }

                //     const number = options.getString('jump')
                //         await queue.jump(number)
                //         return interaction.reply({content: `Skipped to song ${number}`})
                // }

                case 'options' : {
                    const queue = await client.distube.getQueue(VoiceChannel)

                    if (!queue) {
                        return interaction.reply({content: 'There is no queue'})
                    }

                    switch(options.getString('options')) {
                        case 'skip' : 
                            await queue.skip(VoiceChannel)
                            return interaction.reply({content: 'Song has been skipped'})
                        

                        case 'stop' :
                            await queue.stop(VoiceChannel)
                            return interaction.reply({content: 'Music has been stopped'})
                        

                        case 'pause' : 
                        await queue.pause(VoiceChannel)
                        return interaction.reply({content: 'Song has been paused'})


                        case 'resume' :
                        await queue.resume(VoiceChannel)
                        return interaction.reply({content: 'Song has been resumed'})

                        case 'shuffle' :
                        await queue.shuffle(VoiceChannel)
                        return interaction.reply({content: 'Queue has been shuffled'})

                        case 'auto' :
                        let mode = await queue.toggleAutoplay(VoiceChannel)
                        return interaction.reply({content: `Set autplay to: \`${mode ? "On" : "Off"}\``})

                        case 'relate' :
                        await queue.addRelatedSong(VoiceChannel)
                        return interaction.reply({content: 'A simmalar song has been added to the queue'})

                        case 'loop' :
                        let mode2 = await client.distube.setRepeatMode(queue)
                        return interaction.reply({content: `Set loop to \`${mode2 = mode2 ? mode2 == 2 ? "Queue" : "Song" : "Off"}\``})

                        case 'queue' :
                        return interaction.reply({embeds: [new MessageEmbed()
                        .setColor("BLURPLE")
                        .setDescription(`${queue.songs.map(
                            (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\`` ).slice(0, 50)}`
                        )
                        .setFooter(`Showing songs 1-50 of ${queue.songs.length}`)]})
                    }
                    
                    return;
                }
            }

        } catch (e) {
            const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`Error: ${e}`)
            return interaction.reply({embeds: [errorEmbed]})
        }
    }
}
