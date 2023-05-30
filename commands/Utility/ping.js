
exports.run = (bot, message, args, prefix, games, lang) => {
  message.channel.createMessage(lang.commands.ping.pinging).then(msg => {
    var embed = {embed: {
        title: `${lang.commands.ping.pong} :ping_pong:`,
        color: 0x7289DA,
        thumbnail: {url: message.author.avatarURL},
        fields: [
            {
                name: lang.commands.ping.latency,
                value: msg.timestamp - message.timestamp + "ms",
                inline: false
            }
        ]
    }
  }

    message.channel.createMessage(embed)
    msg.delete()
  });
};

exports.help = {
  name: "ping",
  description: "Gets your ping",
  usage: "ping",
  category: "Utility",
  emoji: "🏓"
};

exports.aliases = [];
