const Eris = require('eris')

exports.run = (bot, message, args) => {
  if (message.author.id !== "262410813254402048") return;
  if (bot.allowedToPlay === true) {
    bot.allowedToPlay = false
    message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description("Disabled games"))
  } else {
    bot.allowedToPlay = true
    message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description("Enabled games"))
  }
}

exports.help = {
  name: "disable",
  category: "Admin"
}

exports.aliases = ['enable']