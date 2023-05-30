const Eris = require('eris')
const { ReactionCollector, MessageCollector } = require("eris-collector");
const authorSchema = require('../../../models/user.js')

module.exports = (bot, dmUser, currentGame, msg, games, prefix, message, lang) => {
  redoRound(1)

  function redoRound(round) {
  if (!games.get(message.guild.id) || !games.get(message.guild.id)[message.author.id]) return 

  const filter2 = (m, emoji2, userID2) => ['721973835804573697', '721973835892785204', '721973836085592084'].includes(emoji2.id) && userID2 !== bot.user.id

  const collector = new ReactionCollector(bot, msg, filter2, {
              time: 20000
  })

  collector.on('collect', async (m, emoji, userID) => {
    if (!games.get(message.guild.id) || !games.get(message.guild.id)[message.author.id]) return 
    if (userID === bot.user.id) return;
    if (currentGame.played.includes(userID)) return;

    if (emoji.id === "721973835804573697") {
      currentGame.stats[0].chosen = {actual: "Rock", translated: lang.minigames.rps.rps[0]}
      currentGame.status[0] = `${currentGame.lobby.emojis[0]} **${currentGame.lobby.memberUsername[0]}** ${lang.minigames.rps.played} <:ThumbsUp:722272300078071898>`
      currentGame.played.push(userID)
      editMessage(round, collector)
    }
    if (emoji.id === "721973835892785204") {
      currentGame.stats[0].chosen  = {actual: "Paper", translated: lang.minigames.rps.rps[1]}
      currentGame.status[0] = `${currentGame.lobby.emojis[0]} **${currentGame.lobby.memberUsername[0]}** ${lang.minigames.rps.played} <:ThumbsUp:722272300078071898>`
      currentGame.played.push(userID)
      editMessage(round, collector)
    }
    if (emoji.id === "721973836085592084") {
      currentGame.stats[0].chosen  = {actual: "Scissors", translated: lang.minigames.rps.rps[2]}
      currentGame.status[0] = `${currentGame.lobby.emojis[0]} **${currentGame.lobby.memberUsername[0]}** ${lang.minigames.rps.played} <:ThumbsUp:722272300078071898>`
      currentGame.played.push(userID)
      editMessage(round, collector)
    }
  });

  collector.on('end', collected => {
  if (!games.get(message.guild.id) || !games.get(message.guild.id)[message.author.id]) return 
    if (currentGame.played.length === 0) {
      let choose = [{actual: "Rock", translated: lang.minigames.rps.rps[0]}, {actual: "Paper", translated: lang.minigames.rps.rps[1]}, {actual: "Scissors", translated: lang.minigames.rps.rps[2]}]
      currentGame.stats[0].chosen  = choose[Math.floor(Math.random() * choose.length)]
      currentGame.played = [currentGame.lobby.members[0]]
      editMessage(round, false)
    }
  })
}

function editMessage(round, collector) {
 if (!games.get(message.guild.id) || !games.get(message.guild.id)[message.author.id]) return 
   if (currentGame.played.length === 1) {
    if (collector !== false) collector.stop()
    let choose = [{actual: "Rock", translated: lang.minigames.rps.rps[0]}, {actual: "Paper", translated: lang.minigames.rps.rps[1]}, {actual: "Scissors", translated: lang.minigames.rps.rps[2]}]
    let chosen = choose[Math.floor(Math.random() * choose.length)]
    const picked1 = currentGame.stats[0].chosen
    const picked2 = chosen

    let win = ""

    if (picked1.actual === "Rock" && picked2.actual === "Scissors") {
      win = `${currentGame.lobby.emojis[0]} ${currentGame.lobby.memberUsername[0]} ${lang.minigames.rps.picked.toLowerCase()} **${picked1.translated}**\n\n<:CPU:723452091376467968> ${currentGame.lobby.members[1]} (CPU) ${lang.minigames.rps.picked.toLowerCase()} **${picked2.translated}**\n\n🎉 **${currentGame.lobby.memberUsername[0]} ${lang.minigames.rps.won}** 🎉`
      currentGame.wins[0] = {wins: currentGame.wins[0].wins + 1, player: "P1"}
    }

    else if (picked1.actual === "Scissors" && picked2.actual === "Rock") {
      win = `${currentGame.lobby.emojis[0]} ${currentGame.lobby.memberUsername[0]} ${lang.minigames.rps.picked.toLowerCase()} **${picked1.translated}**\n\n<:CPU:723452091376467968> ${currentGame.lobby.members[1]} (CPU) ${lang.minigames.rps.picked.toLowerCase()} **${picked2.translated}**\n\n🎉 **${currentGame.lobby.members[1]} ${lang.minigames.rps.won}** 🎉`
      currentGame.wins[1] = {wins: currentGame.wins[1].wins + 1, player: "P2"}
    }

    else if (picked1.actual === "Paper" && picked2.actual === "Rock") {
      win = `${currentGame.lobby.emojis[0]} ${currentGame.lobby.memberUsername[0]} ${lang.minigames.rps.picked.toLowerCase()} **${picked1.translated}**\n\n<:CPU:723452091376467968> ${currentGame.lobby.members[1]} (CPU) ${lang.minigames.rps.picked.toLowerCase()} **${picked2.translated}**\n\n🎉 **${currentGame.lobby.memberUsername[0]} ${lang.minigames.rps.won}** 🎉`
      currentGame.wins[0] = {wins: currentGame.wins[0].wins + 1, player: "P1"}
    }

    else if (picked1.actual === "Rock" && picked2.actual === "Paper") {
      win = `${currentGame.lobby.emojis[0]} ${currentGame.lobby.memberUsername[0]} ${lang.minigames.rps.picked.toLowerCase()} **${picked1.translated}**\n\n<:CPU:723452091376467968> ${currentGame.lobby.members[1]} (CPU) ${lang.minigames.rps.picked.toLowerCase()} **${picked2.translated}**\n\n🎉 **${currentGame.lobby.members[1]} ${lang.minigames.rps.won}** 🎉`
      currentGame.wins[1] = {wins: currentGame.wins[1].wins + 1, player: "P2"}
    }

    else if (picked1.actual === "Scissors" && picked2.actual === "Paper") {
      win = `${currentGame.lobby.emojis[0]} ${currentGame.lobby.memberUsername[0]} ${lang.minigames.rps.picked.toLowerCase()} **${picked1.translated}**\n\n<:CPU:723452091376467968> ${currentGame.lobby.members[1]} (CPU) ${lang.minigames.rps.picked.toLowerCase()} **${picked2.translated}**\n\n🎉 **${currentGame.lobby.memberUsername[0]} ${lang.minigames.rps.won}** 🎉`
      currentGame.wins[0] = {wins: currentGame.wins[0].wins + 1, player: "P1"}
    }

    else if (picked1.actual === "Paper" && picked2.actual === "Scissors") {
      win = `${currentGame.lobby.emojis[0]} ${currentGame.lobby.memberUsername[0]} ${lang.minigames.rps.picked.toLowerCase()} **${picked1.translated}**\n\n<:CPU:723452091376467968> ${currentGame.lobby.members[1]} (CPU) ${lang.minigames.rps.picked.toLowerCase()} **${picked2.translated}**\n\n🎉 **${currentGame.lobby.members[1]} ${lang.minigames.rps.won}** 🎉`
      currentGame.wins[1] = {wins: currentGame.wins[1].wins + 1, player: "P2"}
    }

    else if (picked1.actual === "Rock" && picked2.actual === "Rock") {
      win = `${currentGame.lobby.emojis[0]} ${currentGame.lobby.memberUsername[0]} ${lang.minigames.rps.picked.toLowerCase()} **${picked1.translated}**\n\n<:CPU:723452091376467968> ${currentGame.lobby.members[1]} (CPU) ${lang.minigames.rps.picked.toLowerCase()} **${picked2.translated}**\n\n🎉 **${lang.minigames.rps.tie}** 🎉`
    }

    else if (picked1.actual === "Paper" && picked2.actual === "Paper") {
      win = `${currentGame.lobby.emojis[0]} ${currentGame.lobby.memberUsername[0]} ${lang.minigames.rps.picked.toLowerCase()} **${picked1.translated}**\n\n<:CPU:723452091376467968> ${currentGame.lobby.members[1]} (CPU) ${lang.minigames.rps.picked.toLowerCase()} **${picked2.translated}**\n\n🎉 **${lang.minigames.rps.tie}** 🎉`
    }

    else if (picked1.actual === "Scissors" && picked2.actual === "Scissors") {
      win = `${currentGame.lobby.emojis[0]} ${currentGame.lobby.memberUsername[0]} ${lang.minigames.rps.picked.toLowerCase()} **${picked1.translated}**\n\n<:CPU:723452091376467968> ${currentGame.lobby.members[1]} (CPU) ${lang.minigames.rps.picked.toLowerCase()} **${picked2.translated}**\n\n🎉 **${lang.minigames.rps.tie}** 🎉`
    }
    
    if (round < 3) {
    const embed2 = {embed: new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").title(lang.minigames.rps.gameName).description(`${win}\n\n${lang.minigames.rps.startIn}`)}
    if (msg) msg.edit(embed2)
    setTimeout(() => {
    currentGame.misc.time = 20

    currentGame.stats[0].chosen = ""
    currentGame.stats[1].chosen = ""

    currentGame.played = []
    currentGame.status = [`${currentGame.lobby.emojis[0]} **${currentGame.lobby.memberUsername[0]}** ${lang.misc.waiting} <a:Loading:712097176313921548>`]

    if (msg) msg.edit({embed: new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").title(lang.minigames.rps.gameName).description(`${lang.minigames.rps.instructions}\n\n<:Rock:721973835804573697> - ${lang.minigames.rps.rps[0]}\n<:Paper:721973835892785204> - ${lang.minigames.rps.rps[1]}\n<:Scissors:721973836085592084>- ${lang.minigames.rps.rps[2]}\n\n${currentGame.lobby.emojis[0]} **${currentGame.lobby.memberUsername[0]}** ${lang.misc.waiting} <a:Loading:712097176313921548> (${currentGame.wins[0].wins} ${lang.minigames.rps.wins})\n\n<:CPU:723452091376467968> **${currentGame.lobby.members[1]} (CPU)** ${lang.minigames.rps.cpuWaiting} <a:Loading:712097176313921548> (${currentGame.wins[1].wins} ${lang.minigames.rps.wins})\n\n<a:Loading:712097176313921548> ${lang.minigames.rps.time}`).footer(lang.minigames.rps.playAgain)})
    redoRound(round + 1)
  }, 5000)
} else finishRound(win)
}
}
function finishRound(win) {
  const winner = currentGame.wins.sort((a, b) => b.wins - a.wins)

  const playerWin = {embed: new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").title(lang.minigames.rps.gameOver).description(`${win}\n-------------------------------------------\n\n🏆 ${lang.minigames.rps.wonAgainstCPU} (+10 ${lang.misc.tokenCap})\n\n(${lang.minigames.rps.goBack.replace("(SERVER)", `**${message.guild.name}**`)})`)}
  const cpuWin = {embed: new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").title(lang.minigames.rps.gameOver).description(`${win}\n-------------------------------------------\n\n🥈 ${lang.minigames.rps.lostAgainstCPU} (+5 ${lang.misc.tokenCap})\n\n(${lang.minigames.rps.goBack.replace("(SERVER)", `**${message.guild.name}**`)})`)}
  const draw = {embed: new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").title(lang.minigames.rps.gameOver).description(`${win}\n-------------------------------------------\n\n<:ThumbsUp:722272300078071898> ${lang.minigames.rps.draw} (+8 ${lang.misc.tokenCap})\n\n(${lang.minigames.rps.goBack.replace("(SERVER)", `**${message.guild.name}**`)})`)}

  if (winner[0].player === "P1" && winner[0].wins !== winner[1].wins && msg) msg.edit(playerWin)
  else if (winner[0].player === "P2" && winner[0].wins !== winner[1].wins && msg) msg.edit(cpuWin)
  else if (winner[0].wins === winner[1].wins && msg) msg.edit(draw)

    let tokens = 0
    if (winner[0].player === "P1") tokens = 10
    else if (winner[0].player === "P2") tokens = 5

    if (winner[0].wins === winner[1].wins) tokens = 8
    authorSchema.findOne({id: message.author.id}, (err, res) => {
      if (!res) require('../../createProfile.js')(bot, message.author.id, message.author.username, tokens, {connect4: 0, quiz: 0, rps: 0, ttt: 0, uno: 0}, {connect4: 0, hangman: 0, matchup: 0, quiz: 0, rps: 1, ttt: 0, uno: 0}, [{players: currentGame.lobby.memberUsername, game: "Rock Paper Scissors"}], "Rock Paper Scissors")
      else if (res) require('../../addTokens.js')(message.author.id, res, tokens, 0, {players: currentGame.lobby.memberUsername, game: "Rock Paper Scissors"}, "rps")
});
if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
else delete games.get(message.guild.id)[message.author.id]
}
}
