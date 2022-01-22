const {
    MessageButton
} = require("discord.js");
const wait = require("util").promisify(setTimeout);
const blurple = 'PRIMARY';
const gray = 'SECONDARY';
const green = 'SUCCESS';
const red = 'DANGER';

module.exports = {
    name: "calculator",
    description: "Get a calculator",
    category: "Fun",
    guildOnly: true,
    
    //requireRoles: true,
    slash: true,
    cooldown: '60s',

    callback: async ({client, interaction}) => {
        try {
            function i(length) {
                var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                var result = "";
                for (var i = 0; i < length; i++) {
                    result += randomChars.charAt(
                        Math.floor(Math.random() * randomChars.length)
                    );
                }
                return result;
            }

            //Define Numbers
            let str = " ";
            let math = " ";
            let stringify = "```\n" + str + "\n```";
            const calculator_c = i(20);
            const calculator_e1 = i(20);
            const calculator_e2 = i(20);
            const calculator_uppercase = i(20);
            const calculator_7 = i(20);
            const calculator_8 = i(20);
            const calculator_9 = i(20);
            const calculator_plus = i(20);
            const calculator_minus = i(20);
            const calculator_star = i(20);
            const calculator_devide = i(20);
            const calculator_proz = i(20);
            const calculator_1 = i(20);
            const calculator_2 = i(20);
            const calculator_3 = i(20);
            const calculator_4 = i(20);
            const calculator_5 = i(20);
            const calculator_0 = i(20);
            const calculator_6 = i(20);
            const calculator_dot = i(20);
            const calculator_equal = i(20);
            const calculator_backspace = i(20);
            const calc_irrc = i(20);
            const calculator_pi = i(20);
            const calculator_starten = i(20);

            //Setup Buttonstyle
            const c = new MessageButton()
                .setLabel("C")
                .setCustomId(calculator_c)
                .setStyle(red);
            const e1 = new MessageButton()
                .setLabel("(")
                .setCustomId(calculator_e1)
                .setStyle(blurple);
            const e2 = new MessageButton()
                .setLabel(")")
                .setCustomId(calculator_e2)
                .setStyle(blurple);
            const uppercase = new MessageButton()
                .setLabel("^")
                .setCustomId(calculator_uppercase)
                .setStyle(blurple);
            const seven = new MessageButton()
                .setLabel("7️")
                .setCustomId(calculator_7)
                .setStyle(gray);
            const eight = new MessageButton()
                .setLabel("8️")
                .setCustomId(calculator_8)
                .setStyle(gray);
            const nine = new MessageButton()
                .setLabel("9️")
                .setCustomId(calculator_9)
                .setStyle(gray);
            const devide = new MessageButton()
                .setLabel("÷")
                .setCustomId(calculator_devide)
                .setStyle(blurple);
            const four = new MessageButton()
                .setLabel("4️")
                .setCustomId(calculator_4)
                .setStyle(gray);
            const five = new MessageButton()
                .setLabel("5️")
                .setCustomId(calculator_5)
                .setStyle(gray);
            const six = new MessageButton()
                .setLabel("6️")
                .setCustomId(calculator_6)
                .setStyle(gray);
            const star = new MessageButton()
                .setLabel("×")
                .setCustomId(calculator_star)
                .setStyle(blurple);
            const one = new MessageButton()
                .setLabel("1️")
                .setCustomId(calculator_1)
                .setStyle(gray);
            const two = new MessageButton()
                .setLabel("2️")
                .setCustomId(calculator_2)
                .setStyle(gray);
            const three = new MessageButton()
                .setLabel("3️")
                .setCustomId(calculator_3)
                .setStyle(gray);
            const minus = new MessageButton()
                .setLabel("-")
                .setCustomId(calculator_minus)
                .setStyle(blurple);
            const zero = new MessageButton()
                .setLabel("0️")
                .setCustomId(calculator_0)
                .setStyle(gray);
            const dot = new MessageButton()
                .setLabel(",")
                .setCustomId(calculator_dot)
                .setStyle(blurple);
            const equal = new MessageButton()
                .setLabel("=")
                .setCustomId(calculator_equal)
                .setStyle(green);
            const plus = new MessageButton()
                .setLabel("+")
                .setCustomId(calculator_plus)
                .setStyle(blurple);
            const proz = new MessageButton()
                .setLabel("%")
                .setCustomId(calculator_proz)
                .setStyle(blurple);
            const backspace = new MessageButton()
                .setLabel("Del")
                .setCustomId(calculator_backspace)
                .setStyle(red);
            const destroy = new MessageButton()
                .setLabel("OFF")
                .setCustomId(calc_irrc)
                .setStyle(red);
            const pi = new MessageButton()
                .setLabel("π")
                .setCustomId(calculator_pi)
                .setStyle(blurple);
            const starten = new MessageButton()
                .setLabel("×10")
                .setCustomId(calculator_starten)
                .setStyle(blurple);

            //Startmessage
            const filter = (btn) => btn.user.id == interaction.user.id;
            interaction.reply({
                    content: stringify,
                    components: [{
                            type: 1,
                            components: [star, starten, seven, four, one]
                        },
                        {
                            type: 1,
                            components: [minus, zero, eight, five, two]
                        },
                        {
                            type: 1,
                            components: [plus, dot, nine, six, three]
                        },
                        {
                            type: 1,
                            components: [devide, equal, c, backspace, destroy]
                        },
                        {
                            type: 1,
                            components: [e1, e2, uppercase, pi, proz]
                        },
                    ],
                })
                .then(async (i) => {
                    async function edit() {
                        interaction.editReply({
                            content: stringify,
                            components: [{
                                    type: 1,
                                    components: [star, starten, seven, four, one]
                                },
                                {
                                    type: 1,
                                    components: [minus, zero, eight, five, two]
                                },
                                {
                                    type: 1,
                                    components: [plus, dot, nine, six, three]
                                },
                                {
                                    type: 1,
                                    components: [devide, equal, c, backspace, destroy]
                                },
                                {
                                    type: 1,
                                    components: [e1, e2, uppercase, pi, proz]
                                },
                            ],
                        });
                    }
                    // disable all buttons
                    async function lock() {
                        interaction.editReply({
                            content: stringify,
                            components: [{
                                    type: 1,
                                    components: [star.setDisabled(true), starten.setDisabled(true), seven.setDisabled(true), four.setDisabled(true), one.setDisabled(true)]
                                },
                                {
                                    type: 1,
                                    components: [minus.setDisabled(true), zero.setDisabled(true), eight.setDisabled(true), five.setDisabled(true), two.setDisabled(true)]
                                },
                                {
                                    type: 1,
                                    components: [plus.setDisabled(true), dot.setDisabled(true), nine.setDisabled(true), six.setDisabled(true), three.setDisabled(true)]
                                },
                                {
                                    type: 1,
                                    components: [devide.setDisabled(true), equal.setDisabled(true), c.setDisabled(true), backspace.setDisabled(true), destroy.setDisabled(true)]
                                },
                                {
                                    type: 1,
                                    components: [e1.setDisabled(true), e2.setDisabled(true), uppercase.setDisabled(true), pi.setDisabled(true), proz.setDisabled(true)]
                                },
                            ],
                        });
                    }

                    //Start listener
                    const collector = interaction.channel.createMessageComponentCollector({
                        filter,
                        time: 600000
                    });

                    //If Button presser --> run validation
                    collector.on("collect", async btn => {
                        if (btn.user.id !== interaction.user.id) return btn.reply({
                            content: 'Not ur command',
                            ephemeral: true
                        });

                        btn.deferUpdate();

                        if (btn.customId === calculator_equal) {
                            try {
                                str += " = " + require("mathjs").evaluate(math) + "";
                                stringify = "```\n" + str + "\n```";
                                edit();
                                str = "";
                                math = "";
                                stringify = "```\n" + str + "\n```";
                                return;
                            } catch (e) {
                                str = 'Thats stupid give me something that makes sense';
                                stringify = "```\n" + str + "\n```";
                                edit();
                                console.log(e);
                                str = " ";
                                stringify = "```\n" + str + "\n```";
                                math = " ";
                                return;
                            }
                        }

                        if (btn.customId === calc_irrc) {
                            str = 'Bye bye';
                            stringify = "```\n" + str + "\n```";
                            edit();
                            collector.stop();
                            lock();
                            return;
                        }

                        switch (btn.customId) {
                            case calculator_0:
                                str += "0";
                                math += "0";
                                break;
                            case calculator_1:
                                str += "1";
                                math += "1";
                                break;
                            case calculator_2:
                                str += "2";
                                math += "2";
                                break;
                            case calculator_3:
                                str += "3";
                                math += "3";
                                break;
                            case calculator_4:
                                str += "4";
                                math += "4";
                                break;
                            case calculator_5:
                                str += "5";
                                math += "5";
                                break;
                            case calculator_6:
                                str += "6";
                                math += "6";
                                break;
                            case calculator_7:
                                str += "7";
                                math += "7";
                                break;
                            case calculator_8:
                                str += "8";
                                math += "8";
                                break;
                            case calculator_9:
                                str += "9";
                                math += "9";
                                break;
                            case calculator_plus:
                                str += "+";
                                math += "+";
                                break;
                            case calculator_minus:
                                str += "-";
                                math += "-";
                                break;
                            case calculator_devide:
                                str += "÷";
                                math += "/";
                                break;
                            case calculator_star:
                                str += "×";
                                math += "*";
                                break;
                            case calculator_uppercase:
                                str += "^";
                                math += "^";
                                break;
                            case calculator_proz:
                                str += "%";
                                math += "/100";
                                break;
                            case calculator_dot:
                                str += ",";
                                math += ".";
                                break;
                            case calculator_c:
                                str = " ";
                                math += " ";
                                break;
                            case calculator_e1:
                                str += "(";
                                math += "(";
                                break;
                            case calculator_e2:
                                str += ")";
                                math += ")";
                                break;
                            case calculator_pi:
                                str += "π";
                                math += "pi";
                                break;
                            case calculator_starten:
                                str += "×10";
                                math += "*10";
                                break;
                            case calculator_backspace:
                                if (str === " ") break;
                                str = str.split("");
                                str.pop();
                                str = str.join("");

                                math = math.split("");
                                math.pop();
                                math = math.join("");
                                break;
                        }

                        stringify = "```\n" + str + "\n```";
                        edit();
                    });

                    // If time over, deactivate
                    const tenmin = 600000
                    // const tenmin = 10000
                    await wait(tenmin);
                    str = 'This will timeout after 10 minutes'
                    stringify = "```\n" + str + "\n```";
                    lock()
                    collector.stop();
                })
        } catch (error) {
            console.error(error);
        }
    },
}
