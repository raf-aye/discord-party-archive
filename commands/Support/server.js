const Eris = require('eris');

exports.run = (bot, message, args, prefix, games, lang) => {
  message.channel.createEmbed(new Eris.Embed().thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").color(0x7289DA).title(lang.commands.server.title).description(lang.commands.server.info))
}

exports.help = {
  name: "server",
  description: "Sends the invite link to the Offical Party Games server",
  usage: "server",
  category: "Support",
  emoji: "👥"
}

exports.aliases = []