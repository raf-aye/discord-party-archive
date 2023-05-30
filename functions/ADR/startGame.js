const Eris = require('eris')

module.exports = async (bot, message, currentGame, games, prefix) => {
  if (currentGame.lobby.currentMembers === 1) {
    const dmUser = await bot.getDMChannel(message.author.id)
    const cpuNames = require('../names.js')
    let name = cpuNames[Math.floor(Math.random() * cpuNames.length)];
    const msg = await dmUser.createEmbed(new Eris.Embed().color(0x7289DA).title("Attack Defend Reflect").description(`Choose whether to Attack your opponent, Defend the attack from your opponent, or to Reflect the attack from your opponent\n\n<:Attack:752604922826194984> - Attack\n<:Defend:752604436685258822> - Defend\n<:Reflect:752604436437663795> - Reflect\n\n${currentGame.lobby.emojis[0]} **${message.author.username}** - Waiting... <a:Loading:712097176313921548>\n<:CPU:723452091376467968> **${name} (CPU)** - Waiting for you! <a:Loading:712097176313921548>`).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png"))
    msg.addReaction(":Attack:752604922826194984").then(() => msg.addReaction(":Defend:752604436685258822").then(() => msg.addReaction(":Reflect:752604436437663795")))
    currentGame.lobby.members[1] = name
    require('./Players/OnePlayer.js')(bot, dmUser, currentGame, msg, games, prefix, message)
  }
  message.channel.createEmbed(new Eris.Embed().color(0x7289DA).title("Attack, Defend, Reflect!").description("Go to your DM's and play and either Attack, Defend, or Reflect your opponent!").thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png"))
}