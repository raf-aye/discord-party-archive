const Eris = require('eris')
const { ReactionCollector, MessageCollector } = require("eris-collector");
const authorSchema = require('../../../models/user.js')

module.exports = (bot, users, currentGame, games, prefix, message, lang) => {
  redoRound(1)

  function redoRound(round) {
    if (!games.get(message.guild.id) || !games.get(message.guild.id)[message.author.id]) return
users.forEach((u, i) => {
  const player = u.player

  const filter2 = (m, emoji2, userID2) => ['721973835804573697', '721973835892785204', '721973836085592084'].includes(emoji2.id) && userID2 !== bot.user.id

  const collector = new ReactionCollector(bot, u.msg, filter2, {
              time: 20000
  })

  users[i].collector = collector
  collector.on('collect', async (m, emoji, userID) => {
    if (!games.get(message.guild.id) || !games.get(message.guild.id)[message.author.id]) return 
    if (userID === bot.user.id) return;
    if (currentGame.played.includes(userID)) return;

    if (emoji.id === "721973835804573697") {
      currentGame.stats[player].chosen = {actual: "Rock", translated: lang.minigames.rps.rps[0]}
      currentGame.status[player] = `${currentGame.lobby.emojis[player]} **${currentGame.lobby.memberUsername[player]}** ${lang.minigames.rps.played} <:ThumbsUp:722272300078071898>`
      currentGame.played.push(userID)
      editMessage(round)
    }
    if (emoji.id === "721973835892785204") {
      currentGame.stats[player].chosen = {actual: "Paper", translated: lang.minigames.rps.rps[1]}
      currentGame.status[player] = `${currentGame.lobby.emojis[player]} **${currentGame.lobby.memberUsername[player]}** ${lang.minigames.rps.played} <:ThumbsUp:722272300078071898>`
      currentGame.played.push(userID)
      editMessage(round)
    }
    if (emoji.id === "721973836085592084") {
      currentGame.stats[player].chosen = {actual: "Scissors", translated: lang.minigames.rps.rps[2]}
      currentGame.status[player] = `${currentGame.lobby.emojis[player]} **${currentGame.lobby.memberUsername[player]}** ${lang.minigames.rps.played} <:ThumbsUp:722272300078071898>`
      currentGame.played.push(userID)
      editMessage(round)
    }
  });

  collector.on('end', collected => {
    if (currentGame.played.length === 0) {
      let choose = [{actual: "Rock", translated: lang.minigames.rps.rps[0]}, {actual: "Paper", translated: lang.minigames.rps.rps[1]}, {actual: "Scissors", translated: lang.minigames.rps.rps[2]}]
      currentGame.stats[0].chosen  = choose[Math.floor(Math.random() * choose.length)]
      currentGame.stats[1].chosen  = choose[Math.floor(Math.random() * choose.length)]
      currentGame.played = [currentGame.lobby.members[0], currentGame.lobby.members[1]]
      editMessage(round)
    }
    if (currentGame.played.length === 1) {
      let choose = [{actual: "Rock", translated: lang.minigames.rps.rps[0]}, {actual: "Paper", translated: lang.minigames.rps.rps[1]}, {actual: "Scissors", translated: lang.minigames.rps.rps[2]}]
      currentGame.stats[1].chosen  = choose[Math.floor(Math.random() * choose.length)]
      currentGame.played = [currentGame.lobby.members[0], currentGame.lobby.members[1]]
      editMessage(round)
    }
  })
})
}

function editMessage(round, timeout) {
  if (!games.get(message.guild.id) || !games.get(message.guild.id)[message.author.id]) return 
  const embed = {embed: new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").title(lang.minigames.rps.gameName).description(`${lang.minigames.rps.instructions}\n\n<:Rock:721973835804573697> - ${lang.minigames.rps.rps[0]}\n<:Paper:721973835892785204> - ${lang.minigames.rps.rps[1]}\n<:Scissors:721973836085592084>- ${lang.minigames.rps.rps[2]}\n\n${currentGame.status[0]}\n\n${currentGame.status[1]}\n\n<a:Loading:712097176313921548> ${lang.minigames.rps.time}`)}
  if (currentGame.played.length === 1) users.forEach(usr => {
    if (usr.msg) usr.msg.edit(embed)
  });
  else if (currentGame.played.length === 2) {
    users.forEach(u => u.collector.stop())
    const picked1 = currentGame.stats[0].chosen
    const picked2 = currentGame.stats[1].chosen

    let win = ""

    if (picked1.actual === "Rock" && picked2.actual === "Scissors") {
      win = `${currentGame.lobby.emojis[0]} ${currentGame.lobby.memberUsername[0]} picked **${picked1.translated}**\n\n${currentGame.lobby.emojis[1]} ${currentGame.lobby.memberUsername[1]} picked **${picked2.translated}**\n\n🎉 **${currentGame.lobby.memberUsername[0]} Won This Round!** 🎉`
      currentGame.wins[0] = {wins: currentGame.wins[0].wins + 1, player: "P1"}
    }

    else if (picked1.actual === "Scissors" && picked2.actual === "Rock") {
      win = `${currentGame.lobby.emojis[0]} ${currentGame.lobby.memberUsername[0]} picked **${picked1.translated}**\n\n${currentGame.lobby.emojis[1]} ${currentGame.lobby.memberUsername[1]} picked **${picked2.translated}**\n\n🎉 **${currentGame.lobby.memberUsername[1]} Won This Round!** 🎉`
      currentGame.wins[1] = {wins: currentGame.wins[1].wins + 1, player: "P2"}
    }

    else if (picked1.actual === "Paper" && picked2.actual === "Rock") {
      win = `${currentGame.lobby.emojis[0]} ${currentGame.lobby.memberUsername[0]} picked **${picked1.translated}**\n\n${currentGame.lobby.emojis[1]} ${currentGame.lobby.memberUsername[1]} picked **${picked2.translated}**\n\n🎉 **${currentGame.lobby.memberUsername[0]} Won This Round!** 🎉`
      currentGame.wins[0] = {wins: currentGame.wins[0].wins + 1, player: "P1"}
    }

    else if (picked1.actual === "Rock" && picked2.actual === "Paper") {
      win = `${currentGame.lobby.emojis[0]} ${currentGame.lobby.memberUsername[0]} picked **${picked1.translated}**\n\n${currentGame.lobby.emojis[1]} ${currentGame.lobby.memberUsername[1]} picked **${picked2.translated}**\n\n🎉 **${currentGame.lobby.memberUsername[1]} Won This Round!** 🎉`
      currentGame.wins[1] = {wins: currentGame.wins[1].wins + 1, player: "P2"}
    }

    else if (picked1.actual === "Scissors" && picked2.actual === "Paper") {
      win = `${currentGame.lobby.emojis[0]} ${currentGame.lobby.memberUsername[0]} picked **${picked1.translated}**\n\n${currentGame.lobby.emojis[1]} ${currentGame.lobby.memberUsername[1]} picked **${picked2.translated}**\n\n🎉 **${currentGame.lobby.memberUsername[0]} Won This Round!** 🎉`
      currentGame.wins[0] = {wins: currentGame.wins[0].wins + 1, player: "P1"}
    }

    else if (picked1.actual === "Paper" && picked2.actual === "Scissors") {
      win = `${currentGame.lobby.emojis[0]} ${currentGame.lobby.memberUsername[0]} picked **${picked1.translated}**\n\n${currentGame.lobby.emojis[1]} ${currentGame.lobby.memberUsername[1]} picked **${picked2.translated}**\n\n🎉 **${currentGame.lobby.memberUsername[1]} Won This Round!** 🎉`
      currentGame.wins[1] = {wins: currentGame.wins[1].wins + 1, player: "P2"}
    }

    else if (picked1.actual === "Rock" && picked2.actual === "Rock") {
      win = `${currentGame.lobby.emojis[0]} ${currentGame.lobby.memberUsername[0]} picked **${picked1.translated}**\n\n${currentGame.lobby.emojis[1]} ${currentGame.lobby.memberUsername[1]} picked **${picked2.translated}**\n\n🎉 **It was a tie!** 🎉`
    }

    else if (picked1.actual === "Paper" && picked2.actual === "Paper") {
      win = `${currentGame.lobby.emojis[0]} ${currentGame.lobby.memberUsername[0]} picked **${picked1.translated}**\n\n${currentGame.lobby.emojis[1]} ${currentGame.lobby.memberUsername[1]} picked **${picked2.translated}**\n\n🎉 **It was a tie!** 🎉`
    }

    else if (picked1.actual === "Scissors" && picked2.actual === "Scissors") {
      win = `${currentGame.lobby.emojis[0]} ${currentGame.lobby.memberUsername[0]} picked **${picked1.translated}**\n\n${currentGame.lobby.emojis[1]} ${currentGame.lobby.memberUsername[1]} picked **${picked2.translated}**\n\n🎉 **It was a tie!** 🎉`
    }

    if (round < 3) {
    const embed2 = {embed: new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").title(lang.minigames.rps.gameName).description(`${win}\n\n${lang.minigames.rps.startIn}`)}
    users.forEach(usr => {
      if (usr.msg) usr.msg.edit(embed2)
    });
    setTimeout(() => {
    currentGame.misc.time = 20

    currentGame.stats[0].chosen = ""
    currentGame.stats[1].chosen = ""

    currentGame.played = []
    currentGame.status = [`${currentGame.lobby.emojis[0]} **${currentGame.lobby.memberUsername[0]}** ${lang.misc.waiting} <a:Loading:712097176313921548>`, `${currentGame.lobby.emojis[1]} **${currentGame.lobby.memberUsername[1]}** ${lang.misc.waiting} <a:Loading:712097176313921548>`]

    users.forEach(usr => {
      if (usr.msg) usr.msg.edit({embed: new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").title(lang.minigames.rps.gameName).description(`${lang.minigames.rps.instructions}\n\n<:Rock:721973835804573697> - ${lang.minigames.rps.rps[0]}\n<:Paper:721973835892785204> - ${lang.minigames.rps.rps[1]}\n<:Scissors:721973836085592084>- ${lang.minigames.rps.rps[2]}\n\n${currentGame.lobby.emojis[0]} **${currentGame.lobby.memberUsername[0]}** ${lang.misc.waiting} <a:Loading:712097176313921548> (${currentGame.wins[0].wins} ${lang.minigames.rps.wins})\n\n${currentGame.lobby.emojis[1]} **${currentGame.lobby.memberUsername[1]}** ${lang.misc.waiting} <a:Loading:712097176313921548> (${currentGame.wins[1].wins} ${lang.minigames.rps.wins})\n\n<a:Loading:712097176313921548> ${lang.minigames.rps.time}`).footer(lang.minigames.rps.playAgain)})
});
    redoRound(round + 1)
  }, 5000)
} else finishRound(win)
}
}
function finishRound(win) {
  const winner = currentGame.wins.sort((a, b) => b.wins - a.wins)
  if (winner[0].player === "P2") {
    winner[0].user = currentGame.lobby.memberUsername[1]
    winner[1].user = currentGame.lobby.memberUsername[0]

    winner[0].id = currentGame.lobby.members[1]
    winner[1].id = currentGame.lobby.members[0]
  }
  if (winner[0].player === "P1") {
    winner[0].user = currentGame.lobby.memberUsername[0]
    winner[1].user = currentGame.lobby.memberUsername[1]

    winner[0].id = currentGame.lobby.members[0]
    winner[1].id = currentGame.lobby.members[1]
  }

  const embed2 = {embed: new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").title(lang.minigames.rps.gameOver).description(`${win}\n-------------------------------------------\n\n🏆 ${lang.minigames.rps.winner} **${winner[0].user}** (${winner[0].wins} ${lang.minigames.rps.wins}) (+40 ${lang.misc.tokenCap})\n\n🥈 **${winner[1].user}** ${lang.minigames.rps.second} (${winner[1].wins} ${lang.minigames.rps.wins}) (+20 ${lang.misc.tokenCap})\n\n(${lang.minigames.rps.goBack.replace("(SERVER)", `**${message.guild.name}**`)})`)}
  const draw = {embed: new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").title(lang.minigames.rps.gameOver).description(`${win}\n-------------------------------------------\n\n<:ThumbsUp:722272300078071898> ${lang.minigames.rps.draw} (+10 ${lang.misc.tokenCap})\n\n(${lang.minigames.rps.goBack.replace("(SERVER)", `**${message.guild.name}**`)})`)}

  if (winner[0].wins !== winner[1].wins) users.forEach(usr => {
    if (usr.msg) usr.msg.edit(embed2)
  });
  else if (winner[0].wins === winner[1].wins) users.forEach(usr => {
    if (usr.msg) usr.msg.edit(draw)
  });
  winner.forEach((user, i) => {
    let tokens;
    if (i === 0) tokens = 40
    else tokens = 20
    
    let win
    if (i === 0) win = 1
    else win = 0
    
    if (winner[0].wins === winner[1].wins) {
      tokens = 10
      win = 0
    }
    authorSchema.findOne({id: user.id}, (err, res) => {
      if (!res) require('../../createProfile.js')(bot, user.id, user.user, tokens, {connect4: 0, quiz: 0, rps: win, ttt: 0, uno: 0}, {connect4: 0, hangman: 0, matchup: 0, quiz: 0, rps: 1, ttt: 0, uno: 0}, [{players: currentGame.lobby.memberUsername, game: "Rock Paper Scissors"}], "Rock Paper Scissors")
      else if (res) require('../../addTokens.js')(user.id, res, tokens, win, {players: currentGame.lobby.memberUsername, game: "Rock Paper Scissors"}, "rps")
  })
});
if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
else delete games.get(message.guild.id)[message.author.id]
}
}
