const Eris = require('eris');

exports.run = (bot, message, args, prefix, games, lang) => {
  message.channel.createEmbed(new Eris.Embed().thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").color(0x7289DA).title(lang.commands.vote.title).description(lang.commands.vote.info))
}

exports.help = {
  name: "vote",
  description: "Sends a link where you can vote for Party Games!",
  usage: "vote",
  category: "Support",
  emoji: "🗳️"
}

exports.aliases = []