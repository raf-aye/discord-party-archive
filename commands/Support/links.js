const Eris = require('eris');

exports.run = (bot, message, args, prefix, games, lang) => {
  message.channel.createEmbed(new Eris.Embed().thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").color(0x7289DA).title(lang.commands.links.title).description(lang.commands.links.info))
}

exports.help = {
  name: "links",
  description: "Sends all of the links related to Party Games",
  usage: "links",
  category: "Support",
  emoji: "🔗"
}

exports.aliases = []