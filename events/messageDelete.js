const Eris = require('eris')

module.exports = (bot, games, message) => {
  if (message.channel.type === 1) return;
  message.guild = message.channel.guild
  if (games.get(message.guild.id) && Object.keys(games.get(message.guild.id)).filter(e => games.get(message.guild.id)[e].msgID === message.id).length > 0) {
    let currentGame = games.get(message.guild.id)[Object.keys(games.get(message.guild.id)).filter(e => games.get(message.guild.id)[e].msgID === message.id)]
    
    bot.createEmbed(currentGame.channel, new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(lang.misc.messageDeleted))
    if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
    else delete games.get(message.guild.id)[currentGame.lobby.host]
  }
}