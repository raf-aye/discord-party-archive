const Eris = require('eris')

module.exports = (bot, games, guild) => {
  new require('../models/guild.js')({
        id: guild.id,
        prefix: "dp!",
        settings: {},
        lang: "en_US"
  }).save()

  bot.executeWebhook("737882058994614333", "-NtyB4Aj5MiiODXFy1X0akjHY8SErIteOKT6jeaFJA22PfJKHr4uUc0QGukrRe0w0-hS", {embeds: [new Eris.Embed().color(0x7289DA).title("New Server Joined!").thumbnail(guild.iconURL || bot.user.avatarURL).description(`**Name** - ${guild.name}\n**ID** - ${guild.id}\n**Owner** - ${guild.members.get(guild.ownerID).username}\n**Member Count** - ${guild.memberCount}`)]})
}