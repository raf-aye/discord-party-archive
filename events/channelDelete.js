const Eris = require('eris')

module.exports = (bot, games, channel) => {
  if (channel.type === 1) return;
  if (games.get(channel.guild.id) && Object.keys(games.get(channel.guild.id)).filter(e => games.get(channel.guild.id)[e].channel === channel.id).length > 0) {
    let currentGame = games.get(channel.guild.id)[Object.keys(games.get(channel.guild.id)).filter(e => games.get(channel.guild.id)[e].channel === channel.id)]
    if (Object.keys(games.get(channel.guild.id)).length === 1) games.delete(channel.guild.id)
    else delete games.get(channel.guild.id)[currentGame.lobby.host]
  }
}