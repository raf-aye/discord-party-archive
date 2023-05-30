const Eris = require('eris');

exports.run = (bot, message, args, prefix, games, lang) => {
  message.channel.createEmbed(new Eris.Embed().thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").color(0x7289DA).title(lang.commands.invite.titile).description(lang.commands.invite.info))
}

exports.help = {
  name: "invite",
  description: "Gives you the invite link to the bot",
  usage: "invite",
  category: "Support",
  emoji: "📨"
}

exports.aliases = []