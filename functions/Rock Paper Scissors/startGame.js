const Eris = require('eris')

const { ReactionCollector, MessageCollector } = require("eris-collector");
const authorSchema = require('../../models/user.js')

module.exports = async (bot, message, currentGame, games, prefix, lang) => {
const DM = new Eris.Embed()
.title(lang.minigames.rps.gameName)
.color(0x7289DA)
.thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1")
.description(lang.minigames.rps.disclamer)
const dmMessage = await message.channel.createEmbed(DM)


if (currentGame.lobby.currentMembers === 1) {
  currentGame.msgID = []
  const cpuNames = require('../names.js')
  currentGame.lobby.members[1] = `${cpuNames[Math.floor(Math.random() * cpuNames.length)]}`;
    
    const dmUser = await bot.getDMChannel(currentGame.lobby.members[0])
    dmUser.createMessage({embed: new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").title(lang.minigames.rps.gameName).description(`${lang.minigames.rps.instructions}\n\n<:Rock:721973835804573697> - ${lang.minigames.rps.rps[0]}\n<:Paper:721973835892785204> - ${lang.minigames.rps.rps[1]}\n<:Scissors:721973836085592084>- ${lang.minigames.rps.rps[2]}\n\n${currentGame.lobby.emojis[0]} **${currentGame.lobby.memberUsername[0]}** ${lang.misc.waiting} <a:Loading:712097176313921548> (0 ${lang.minigames.rps.wins})\n\n<:CPU:723452091376467968> **${currentGame.lobby.members[1]} (CPU)** ${lang.minigames.rps.cpuWaiting} <a:Loading:712097176313921548> (0 ${lang.minigames.rps.wins})\n\n<a:Loading:712097176313921548> ${lang.minigames.rps.time}`)}).then(msg => {
      msg.addReaction(":Rock:721973835804573697").then(() => msg.addReaction(":Paper:721973835892785204").then(() => msg.addReaction(":Scissors:721973836085592084")))
      currentGame.msgID.push(msg.id)
     require('./Players/OnePlayer.js')(bot, dmUser, currentGame, msg, games, prefix, message, lang)
    }).catch(err => {
      console.log(err)
      message.channel.createMessage({embed: {color: 0x7289DA, description: lang.minigames.general.dmDisabled}})
      if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
      else delete games.get(message.guild.id)[message.author.id]
    });
}

if (currentGame.lobby.currentMembers === 2) {
  let users = []
  let numCheck = 0
  currentGame.msgID = []
  currentGame.lobby.members.forEach(async (user, i) => {
    const dmUser = await bot.getDMChannel(user)
    dmUser.createMessage({embed: new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").title(lang.minigames.rps.gameName).description(`${lang.minigames.rps.instructions}\n\n<:Rock:721973835804573697> - ${lang.minigames.rps.rps[0]}\n<:Paper:721973835892785204> - ${lang.minigames.rps.rps[1]}\n<:Scissors:721973836085592084>- ${lang.minigames.rps.rps[2]}\n\n${currentGame.lobby.emojis[0]} **${currentGame.lobby.memberUsername[0]}** ${lang.misc.waiting} <a:Loading:712097176313921548> (0 ${lang.minigames.rps.wins})\n\n${currentGame.lobby.emojis[1]} **${currentGame.lobby.memberUsername[1]}** ${lang.misc.waiting} <a:Loading:712097176313921548> (0 ${lang.minigames.rps.wins})\n\n<a:Loading:712097176313921548> ${lang.minigames.rps.time}`)}).then(msg => {
      msg.addReaction(":Rock:721973835804573697").then(() => msg.addReaction(":Paper:721973835892785204").then(() => msg.addReaction(":Scissors:721973836085592084")))

      currentGame.msgID.push(msg.id)
      users[i] = {user: bot.users.get(user).username, msg: msg, id: user, player: i}
      if (i === 1) {
        setTimeout(() => {require('./Players/TwoPlayers.js')(bot, users, currentGame, games, prefix, message, lang)}, 2000)
      }
    }).catch(err => {
      if (numCheck === 0) {
      message.channel.createMessage({embed: {color: 0x7289DA, description: lang.minigames.general.multipleDMDisabled}})
      if (users.length === 1) users[0].msg.delete()
      numCheck++
      if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
      else delete games.get(message.guild.id)[message.author.id]
    } else return
    });
  });
}

}
