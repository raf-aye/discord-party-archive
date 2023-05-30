const Eris = require('eris')

module.exports = (bot, games, guild) => {
  if (games.get(guild.id)) games.delete(guild.id)
  require('../models/guild.js').deleteOne({id: guild.id}, function(err, res) {if (err) console.log(err)})

  bot.executeWebhook("737883417513033799", "NhTUYz14eihw_AzDkB3xoTcpmIREw8eCuBE2CVmcm8GLhfO3Qi8BR8HnGO9naEDdDxQw", {embeds: [new Eris.Embed().color(0x7289DA).title("Server Left...").thumbnail(guild.iconURL || bot.user.avatarURL).description(`**Name** - ${guild.name}\n**ID** - ${guild.id}\n**Owner** - ${guild.members.get(guild.ownerID).username}\n**Member Count** - ${guild.memberCount}`)]})
}