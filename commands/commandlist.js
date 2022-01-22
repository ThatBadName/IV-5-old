const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'commandlist',
    description: 'Promise this is actually a help command.',
    category: 'Config',
    slash: true,
    //testOnly: true,
    guildOnly: true,
    options: [
        {
            name: 'category',
            description: 'The category of commands you would like to view',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'administration',
                    value: 'admin',
                },
                {
                    name: 'bot-owner',
                    value: 'owner'
                },
                {
                    name: 'config',
                    value: 'config',
                },
                {
                    name: 'fun',
                    value: 'fun',
                },
                {
                    name: 'maths',
                    value: 'maths',
                },
                {
                    name: 'misc',
                    value: 'misc',
                },
                {
                    name: 'moderation',
                    value: 'mod',
                },
                {
                    name: 'setup',
                    value: 'setup',
                },             
            ],
        },
    ],

    callback: async({interaction, guild}) => {

        if(!guild) {
            return ('This command can only be run in a server')
        }
        const cat = interaction.options.getString('category')

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Command list: ${cat}`)
        .setFooter('DO NOT TAKE ANYTHING THIS BOT SAYS SERIOUSLY (other than moderation) | <> is required, [] is optional | Most commands are slash only | Chances are this list is not up to date')

        if (cat === 'admin') {
            embed.setDescription('This is a list on all the commands for admins')
            .addField('channelonly', 'Set the channels a command is allowed to run in. Do not fill the channel parameter to clear\n**Usage:**\n\`/channelonly <command> [channel]\`')
            .addField('command', 'Enable/disable a command for this guild\n**Usage:**\n\`/command <enable|disable> <command>\`')
            .addField('language', 'Set the language for this guild\n**Usage:**\n\`/language <language>\`')
            .addField('prefix', 'Set/view the prefix for this guild\n**Usage:**\n\`/prefix [prefix]\`')
            .addField('requiredrole', 'Set the required role to use a command\n**Usage:**\n\`/requiredrole <command> <role>\`')
            .addField('slash', 'View/delete a command from this guild\n**Usage:**\n\`/slash [command-id]\`')
            .addField('send', 'Send a message as the bot\n**Usage:**\n\`/send <channel> <message>\`')
        } else if (cat === 'owner') {
            embed.setDescription('Only the bot owner can use these commands so don\'t even try')
            .addField('dm', 'Dm a member of the server\n**Usage:**\n\`/dm <user> <message>\`')
            .addField('reboot', 'Restart the bot\n**Usage:**\n\`/reboot\`')
            .addField('status', 'Set the bot status\n**Usage:**\n\`/status [online|dnd|idle|offline] [playing|listening|watching|competing] [status]\`')
            .addField('testembed', 'Test embeds\n**Usage:**\n\`/testembed\`')
            .addField('test', 'Test buttons\n**Usage:**\n\`/test\`')
            .addField('eval', 'Evaluate some code\n**Usage:**\n\`/eval <code>\`')
        } else if (cat === 'config') {
            embed.setDescription('Used to configure the bot')
            .addField('channelonly', 'Set the channels a command is allowed to run in. Do not fill the channel parameter to clear\n**Usage:**\n\`/channelonly <command> [channel]\`')
            .addField('command', 'Enable/disable a command for this guild\n**Usage:**\n\`/command <enable|disable> <command>\`')
            .addField('language', 'Set the language for this guild\n**Usage:**\n\`/language <language>\`')
            .addField('prefix', 'Set/view the prefix for this guild\n**Usage:**\n\`/prefix [prefix]\`')
            .addField('requiredrole', 'Set the required role to use a command\n**Usage:**\n\`/requiredrole <command> <role>\`')
            .addField('slash', 'View/delete a command from this guild\n**Usage:**\n\`/slash [command-id]\`')
            .addField('ticket-panel', 'Send a new ticket pannel\n**Usage:**\n\`/ticket-panel\`')
        } else if (cat === 'fun') {
            embed.setDescription('A list of all the fun commands')
            .addField('coin', 'Flip a coin\n**Usage:**\n\`/coin\`')
            .addField('highlow', 'Play a game of high-low\n**Usage:**\n\`/highlow\`')
            .addField('music', 'Play some music\n**Usage:**\n\`/music [play|options|volume|filters]\`')
            .addField('suggest', 'Suggest something\n**Usage:**\n\`/suggest <server|bot|other> <suggestion>\`')
            .addField('image', 'Make some interesting images\n**Usage:**\n\`/image <user> <image>\`')
            .addField('colour', 'Set your name colour\n**Usage:**\n\`/colour <hex>\`')
            .addField('resetcolour', 'Reset your name colour\n**Usage:**\n\`/resetcolour\`')
            .addField('poll', 'Make a yes/no poll\n**Usage:**\n\`/poll <question>\`')
        } else if (cat === 'maths') {
            embed.setDescription('A list of all the maths commands')
            .addField('add', 'Add two numbers\n**Usage:**\n\`/add <int1> <int2>\`')
            .addField('subtract', 'Subtract two numbers\n**Usage:**\n\`/subtract <int1> <int2>\`')
            .addField('multiply', 'Multiply two numbers\n**Usage:**\n\`/multiply <int1> <int2>\`')
            .addField('divide', 'Divide two numbers\n**Usage:**\n\`/divide <int1> <int2>\`')
        } else if (cat === 'misc') {
            embed.setDescription('Commands that just don\'t quite fit into any other category')
            .addField('addrole', 'Add a role to a drop-down menu\n**Usage:**\n\`/addrole <channel> <message-id> <role>\`')
            .addField('ping', 'Ping the bot\n**Usage:**\n\`/ping\`')
            .addField('verify', 'Verify using a captcha\n**Usage:**\n\`/verify\`')
            .addField('gannounce', 'Make an announcement for a giveaway in a better format than a regular announcement\n**Usage:**\n\`/gannounce <channel> <giveaway> <requirements> <given-by> [other-notes] [ping]\`')
            .addField('announce', 'Make a server announcement\n**Usage:**\n\`/announce <channel> <title> <announcement> <true|false> <true|false> [ping]\`')
            .addField('liststrikes', 'List all your active strikes\n**Usage:**\n\`/liststrikes\`')
            .addField('listrewards', 'List all your active rewards\n**Usage:**\n\`/listrewards\`')
            .addField('embed', 'Make a custom embed\n**Usage:**\n\`/embed <channel> <true|false> [author] [title] [body] [footer] [colour]\`')
            .addField('id', 'Get your ID\n**Usage:**\n\`/id\`')
        } else if (cat === 'mod') {
            embed.setDescription('')
            .addField('strike', 'Manage a users strikes\n**Usage:**\n\`/strike <add|delete|list>\`')
            .addField('reward', 'Manage a users rewards\n**Usage:**\n\`/reward <add|delete|list>\`')
            .addField('mute', 'Mute a user\n**Usage:**\n\`/mute <user> <duration> <true|false> <reason>\`')
            .addField('timeout', 'Timeout a user\n**Usage:**\n\`/timeout <user> <duration> <true|false> <reason>\`')
            .addField('removetimeout', 'Remove a users timeout\n**Usage:**\n\`/removetimeout <user>\`')
            .addField('unmute', 'Unmute a user\n**Usage:**\n\`/unmute <user> <true|false>\`')
            .addField('kick', 'Kick a user\n**Usage:**\n\`/kick <user> <true|false> <reason>\`')
            .addField('tempban', 'Temporarily ban a user\n**Usage:**\n\`/tempban <user> <duration> <true|false> <reason>\`')
            .addField('ban', 'Ban a user\n**Usage:**\n\`/ban <user> <true|false> <reason>\`')
            .addField('lock', 'Lock a channel\n**Usage:**\n\`/lock <channel> <announce> <lock|unlock> [reason]\`')
            .addField('lockdown', 'Put the server into lockdown\n**Usage:**\n\`/lockdown <announce> <lock|unlock> [reason]\`')
            .addField('slowmode', 'Set a slowmode for a channel\n**Usage:**\n\`/slowmode <channel> <timeout>\`')
            .addField('purge', 'Purge messages from a channel\n**Usage:**\n\`/purge <amount> [user]\`')

        } else if (cat === 'setup') {
            embed.setDescription('How to setup your server for the bot')
            .addField('Roles', '**MUTE**\nCreate a role called "Silenced". This is your mute role (you need to setup perms) | If you don\t want to do this then use the \`timeout\` command instead.\n**Required for:**\n`mute`\n`unmute`')
            .addField('Channels', '**LOGGING**\nCreate a channel called "twisted-logs". The bot will use this to log everything. | If you want to use any moderation commands this is required')
            .addField('Errors:', '**Error:**\nYou must specify what roles can use this command with `{prefix}requiredroles {command} <role ID>`.\n**Fix:**\nSetup a required role for the command\n\nMost commands will tell you how to fix the error')
        }

        interaction.reply({embeds: [embed], ephemeral: true})
    }
}
