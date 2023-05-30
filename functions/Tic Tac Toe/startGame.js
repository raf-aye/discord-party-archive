const Eris = require('eris');

const { ReactionCollector, MessageCollector } = require("eris-collector");
const authorSchema = require('../../models/user.js')

function arrayRemove(arr, value) {
return arr.filter(function(ele){ return ele != value; });
}

module.exports = async (bot, message, currentGame, games, prefix, lang) => {
let player1 = currentGame.lobby.memberUsername[0]
let player2 = currentGame.lobby.memberUsername[1]

let mention1 = `<@${currentGame.lobby.members[0]}>`
let mention2 = `<@${currentGame.lobby.members[1]}>`

currentGame.rotation = [message.author.id, currentGame.lobby.members[1] || "CPU"]

if (!player2) {
  const cpuNames = require('../names.js')
  player2 = `${cpuNames[Math.floor(Math.random() * cpuNames.length)]} (CPU)`
}
const emojis = [
  ':Blurple_A:717617609431842846',
  ':Blurple_B:717617609373384765',
  ':Blurple_C:717617609562128425',
  ':Blurple_D:717617609314402306',
  ':Blurple_E:717617609557934150',
  ':Blurple_F:717617609373384776',
  ':Blurple_G:717617609633431603',
  ':Blurple_H:717617609427779594',
  ':Blurple_I:717617609331441685'
]

const emojiID = [
  '717617609431842846',
  '717617609373384765',
  '717617609562128425',
  '717617609314402306',
  '717617609557934150',
  '717617609373384776',
  '717617609633431603',
  '717617609427779594',
  '717617609331441685'
]

const spot = currentGame.spots
let msg = await message.channel.createMessage({content: mention1, embed: {title: lang.gameTypes.ttt, thumbnail: {url: "https://cdn.discordapp.com/emojis/718331720398798899.png?v=1"},  color: 0x7289DA, description: `
  ${lang.minigames.ttt.instruction}

  <:TicTacToe_X:717504662412066909> - **${player1}**
  <:TicTacToe_O:717504662705668157> - **${player2}**

   **${mention1}**'s ${lang.misc.turn}
   ${lang.minigames.ttt.toPlay}

                   ------------------
                    |  ${spot.a}  |  ${spot.b}  |  ${spot.c}  |
                   ------------------
                    |  ${spot.d}  |  ${spot.e}  |  ${spot.f}  |
                   ------------------
                    |  ${spot.g}  |  ${spot.h}  |  ${spot.i}  |
                   ------------------`}})

currentGame.msgID = msg.id
emojis.forEach(e => msg.addReaction(e))

let num = 0;
let started = false

let filter = (m, emoji, userID) => emojiID.includes(emoji.id) && currentGame.lobby.members.includes(userID)

const collector = new ReactionCollector(bot, msg, filter, {
            time: 300000
          })


collector.on('collect', async (m, emoji, userID) => {
  if (!currentGame) return;
  const reactionCollector = message.guild.members.get(userID).user
  if (reactionCollector.bot == true) return;

  switch (emoji.id) {
    case "717617609431842846":
   if (reactionCollector.id !== currentGame.rotation[0]) return;
   if (currentGame.spotsTaken.includes("A")) return;

   currentGame.spotsTaken.push("A")
   currentGame.spotsAvailable = arrayRemove(currentGame.spotsAvailable, 'A')
   if (currentGame.lobby.members[0] === currentGame.rotation[0]) currentGame.spots.a = "<:TicTacToe_X:717504662412066909>"
   else currentGame.spots.a = "<:TicTacToe_O:717504662705668157>"

   edit()
   break;

    case "717617609373384765":
   if (reactionCollector.id !== currentGame.rotation[0]) return;
   if (currentGame.spotsTaken.includes("B")) return;

   currentGame.spotsTaken.push("B")
   currentGame.spotsAvailable = arrayRemove(currentGame.spotsAvailable, 'B')
   if (currentGame.lobby.members[0] === currentGame.rotation[0]) currentGame.spots.b = "<:TicTacToe_X:717504662412066909>"
   else currentGame.spots.b = "<:TicTacToe_O:717504662705668157>"

   edit()
   break;

    case "717617609562128425":
   if (reactionCollector.id !== currentGame.rotation[0]) return;
   if (currentGame.spotsTaken.includes("C")) return;

   currentGame.spotsTaken.push("C")
   currentGame.spotsAvailable = arrayRemove(currentGame.spotsAvailable, 'C')
   if (currentGame.lobby.members[0] === currentGame.rotation[0]) currentGame.spots.c = "<:TicTacToe_X:717504662412066909>"
   else currentGame.spots.c = "<:TicTacToe_O:717504662705668157>"

   edit()
   break;

    case "717617609314402306":
   if (reactionCollector.id !== currentGame.rotation[0]) return;
   if (currentGame.spotsTaken.includes("D")) return;

   currentGame.spotsTaken.push("D")
   currentGame.spotsAvailable = arrayRemove(currentGame.spotsAvailable, 'D')
   if (currentGame.lobby.members[0] === currentGame.rotation[0]) currentGame.spots.d = "<:TicTacToe_X:717504662412066909>"
   else currentGame.spots.d = "<:TicTacToe_O:717504662705668157>"

   edit()
   break;

    case "717617609557934150":
      if (reactionCollector.id !== currentGame.rotation[0]) return;
   if (currentGame.spotsTaken.includes("E")) return;

   currentGame.spotsTaken.push("E")
   currentGame.spotsAvailable = arrayRemove(currentGame.spotsAvailable, 'E')
   if (currentGame.lobby.members[0] === currentGame.rotation[0]) currentGame.spots.e = "<:TicTacToe_X:717504662412066909>"
   else currentGame.spots.e = "<:TicTacToe_O:717504662705668157>"

   edit()
   break;

    case "717617609373384776":
   if (reactionCollector.id !== currentGame.rotation[0]) return;
   if (currentGame.spotsTaken.includes("F")) return;

   currentGame.spotsTaken.push("F")
   currentGame.spotsAvailable = arrayRemove(currentGame.spotsAvailable, 'F')
   if (currentGame.lobby.members[0] === currentGame.rotation[0]) currentGame.spots.f = "<:TicTacToe_X:717504662412066909>"
   else currentGame.spots.f = "<:TicTacToe_O:717504662705668157>"

   edit()
   break;

    case "717617609633431603":
   if (reactionCollector.id !== currentGame.rotation[0]) return;
   if (currentGame.spotsTaken.includes("G")) return;

   currentGame.spotsTaken.push("G")
   currentGame.spotsAvailable = arrayRemove(currentGame.spotsAvailable, 'G')
   if (currentGame.lobby.members[0] === currentGame.rotation[0]) currentGame.spots.g = "<:TicTacToe_X:717504662412066909>"
   else currentGame.spots.g = "<:TicTacToe_O:717504662705668157>"

   edit()
   break;

   case "717617609427779594":
   if (reactionCollector.id !== currentGame.rotation[0]) return;
   if (currentGame.spotsTaken.includes("H")) return;

   currentGame.spotsTaken.push("H")
   currentGame.spotsAvailable = arrayRemove(currentGame.spotsAvailable, 'H')
   if (currentGame.lobby.members[0] === currentGame.rotation[0]) currentGame.spots.h = "<:TicTacToe_X:717504662412066909>"
   else currentGame.spots.h = "<:TicTacToe_O:717504662705668157>"

   edit()
   break;

   case "717617609331441685":
    if (reactionCollector.id !== currentGame.rotation[0]) return;
    if (currentGame.spotsTaken.includes("I")) return;
 
    currentGame.spotsTaken.push("I")
    currentGame.spotsAvailable = arrayRemove(currentGame.spotsAvailable, 'I')
    if (currentGame.lobby.members[0] === currentGame.rotation[0]) currentGame.spots.i = "<:TicTacToe_X:717504662412066909>"
    else currentGame.spots.i = "<:TicTacToe_O:717504662705668157>"
 
    edit()
    break;
 
  }
});

collector.on('end', collected => {
  if (!games.get(message.guild.id) || !games.get(message.guild.id)[message.author.id]) return;
  if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
  else delete games.get(message.guild.id)[message.author.id]
	msg.edit({content: "\u200b", embed: {color: 0x7289DA, thumbnail: {url: "https://cdn.discordapp.com/emojis/718331720398798899.png?v=1"}, description: lang.minigames.general.timeOutGame}})
});

function checkWinner() {
  let x = "<:TicTacToe_X:717504662412066909>"
  let o = "<:TicTacToe_O:717504662705668157>"
  if (spot.a === x && spot.b == x && spot.c === x) P1Win()
  else if (spot.a === x && spot.d === x && spot.g === x) P1Win()
  else if (spot.a === x && spot.e === x && spot.i === x) P1Win()
  else if (spot.a === o && spot.b == o && spot.c === o) P2Win()
  else if (spot.a === o && spot.d === o && spot.g === o) P2Win()
  else if (spot.a === o && spot.e === o && spot.i === o) P2Win()

  else if (spot.b === x && spot.e === x && spot.h === x) P1Win()
  else if (spot.b === o && spot.e === o && spot.h === o) P2Win()

  else if (spot.c === x && spot.f === x && spot.i === x) P1Win()
  else if (spot.c === x && spot.e === x && spot.g === x) P1Win()
  else if (spot.c === o && spot.f === o && spot.i === o) P2Win()
  else if (spot.c === o && spot.e === o && spot.g === o) P2Win()

  else if (spot.d === x && spot.e === x && spot.f === x) P1Win()
  else if (spot.d === o && spot.e === o && spot.f === o) P2Win()

  else if (spot.g === x && spot.h === x && spot.i === x) P1Win()
  else if (spot.g === o && spot.h === o && spot.i === o) P2Win()
  else return "failed"
}

function edit()  {
  if (checkWinner() === "failed") {
    if (currentGame.spotsAvailable.length == 0) return draw();
    if (currentGame.lobby.currentMembers === 2) {
   currentGame.rotation.reverse()
  let mention;
  if (currentGame.rotation[0] !== message.author.id) mention = mention2
  else mention = mention1
  msg.edit({content: mention, embed: {title: lang.gameTypes.ttt, thumbnail: {url: "https://cdn.discordapp.com/emojis/718331720398798899.png?v=1"},  color: 0x7289DA, description: `
  ${lang.minigames.ttt.instruction}

  <:TicTacToe_X:717504662412066909> - **${player1}**
  <:TicTacToe_O:717504662705668157> - **${player2}**

   **${mention1}**'s ${lang.misc.turn}
   ${lang.minigames.ttt.toPlay}

                   ------------------
                    |  ${spot.a}  |  ${spot.b}  |  ${spot.c}  |
                   ------------------
                    |  ${spot.d}  |  ${spot.e}  |  ${spot.f}  |
                   ------------------
                    |  ${spot.g}  |  ${spot.h}  |  ${spot.i}  |
                   ------------------`}})
} else {
  msg.edit({content: "\u200b", embed: {title: lang.gameTypes.ttt, thumbnail: {url: "https://cdn.discordapp.com/emojis/718331720398798899.png?v=1"},  color: 0x7289DA, description: `
    ${lang.minigames.ttt.instruction}

    <:TicTacToe_X:717504662412066909> - **${player1}**
    <:TicTacToe_O:717504662705668157> - **${player2}**

     **${player2}**'s ${lang.misc.turn} <a:Loading:712097176313921548> ${lang.minigames.ttt.pleaseWait}
     ${lang.minigames.ttt.toPlay}

                     ------------------
                      |  ${spot.a}  |  ${spot.b}  |  ${spot.c}  |
                     ------------------
                      |  ${spot.d}  |  ${spot.e}  |  ${spot.f}  |
                     ------------------
                      |  ${spot.g}  |  ${spot.h}  |  ${spot.i}  |
                     ------------------`}})

setTimeout(function() {
  const available = currentGame.spotsAvailable
  if (available.length == 0) return draw();
  const spotChosen = available[Math.floor(Math.random() * available.length)];
  spot[spotChosen.toLowerCase()] = "<:TicTacToe_O:717504662705668157>"
  currentGame.spotsAvailable = arrayRemove(currentGame.spotsAvailable, spotChosen)
  currentGame.spotsTaken.push(spotChosen)
  if (checkWinner() === undefined) return;

  msg.edit({content: mention1, embed: {title: lang.gameTypes.ttt, thumbnail: {url: "https://cdn.discordapp.com/emojis/718331720398798899.png?v=1"},  color: 0x7289DA, description: `
  ${lang.minigames.ttt.instruction}

  <:TicTacToe_X:717504662412066909> - **${player1}**
  <:TicTacToe_O:717504662705668157> - **${player2}**

   **${mention1}**'s ${lang.misc.turn}
   ${lang.minigames.ttt.toPlay}

                   ------------------
                    |  ${spot.a}  |  ${spot.b}  |  ${spot.c}  |
                   ------------------
                    |  ${spot.d}  |  ${spot.e}  |  ${spot.f}  |
                   ------------------
                    |  ${spot.g}  |  ${spot.h}  |  ${spot.i}  |
                   ------------------`}})
}, 3000)

}
}
}

function P1Win() {
  msg.delete()
  collector.stop()
const end = new Eris.Embed()
.color(0x7289DA)
.thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1")
.title(lang.minigames.ttt.gameOver)
.description(`
  ------------------
   |  ${spot.a}  |  ${spot.b}  |  ${spot.c}  |
  ------------------
   |  ${spot.d}  |  ${spot.e}  |  ${spot.f}  |
  ------------------
   |  ${spot.g}  |  ${spot.h}  |  ${spot.i}  |
  ------------------`)
if (currentGame.lobby.currentMembers === 1) {
  end.field(lang.minigames.ttt.youWon, `<:ThumbsUp:722272300078071898> ${lang.minigames.general.noTokens}`)
  message.channel.createEmbed(end)
  authorSchema.findOne({id: currentGame.lobby.members[0]}, (err, res) => {
    let tokens = 0
    if (!res) require('../createProfile.js')(bot, message.author.id, message.author.username, tokens, {connect4: 0, quiz: 0, rps: 0, ttt: 0, uno: 0}, {connect4: 0, hangman: 0, matchup: 0, quiz: 0, rps: 0, ttt: 1, uno: 0}, [{players: currentGame.lobby.memberUsername, game: "Tic Tac Toe"}], "Tic Tac Toe")
        else if (res) require('../addTokens.js')(message.author.id, res, tokens, 0, {players: currentGame.lobby.memberUsername, game: "Tic Tac Toe"}, "ttt")
  })
} else {
  end.field(`\u200b`, `🏆 **${currentGame.lobby.memberUsername[0]}** ${lang.misc.won}! - +40 ${lang.misc.tokenCap}`)
  end.field("\u200b", `🥈 **${currentGame.lobby.memberUsername[1]}** - +20 ${lang.misc.tokenCap}`)
  message.channel.createEmbed(end)

  currentGame.lobby.members.forEach((member, i) => {
    let token;
    if (i === 0) token = 40
    else token = 20

    let wins;
    if (i === 0) wins = 1
    else wins = 0

    authorSchema.findOne({id: member}, (err, res) => {
      if (!res) require('../createProfile.js')(bot, member, currentGame.lobby.memberUsername[i], token, {connect4: 0, quiz: 0, rps: 0, ttt: wins, uno: 0}, {connect4: 0, hangman: 0, matchup: 0, quiz: 0, rps: 0, ttt: 1, uno: 0}, [{players: currentGame.lobby.memberUsername, game: "Tic Tac Toe"}], "Tic Tac Toe")
        else if (res) require('../addTokens.js')(member, res, token, wins, {players: currentGame.lobby.memberUsername, game: "Tic Tac Toe"}, "ttt")
    })
  })
}
if (games.size === 0) return
if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
else delete games.get(message.guild.id)[message.author.id]
}

function P2Win() {
  console.log(currentGame)
  msg.delete()
  collector.stop()
  const end = new Eris.Embed()
  .color(0x7289DA)
  .thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1")
  .title(lang.minigames.ttt.gameOver)
  .description(`
    ------------------
     |  ${spot.a}  |  ${spot.b}  |  ${spot.c}  |
    ------------------
     |  ${spot.d}  |  ${spot.e}  |  ${spot.f}  |
    ------------------
     |  ${spot.g}  |  ${spot.h}  |  ${spot.i}  |
    ------------------`)
  if (currentGame.lobby.currentMembers === 1) {
  end.field(lang.minigames.ttt.cpuWon, `<:ThumbsUp:722272300078071898> ${lang.minigames.general.noTokens}`)
  message.channel.createEmbed(end)

  
  authorSchema.findOne({id: currentGame.lobby.members[0]}, (err, res) => {
    let tokens = 0
    if (!res) require('../createProfile.js')(bot, message.author.id, message.author.username, tokens, {connect4: 0, quiz: 0, rps: 0, ttt: 0, uno: 0}, {connect4: 0, hangman: 0, matchup: 0, quiz: 0, rps: 0, ttt: 1, uno: 0}, [{players: currentGame.lobby.memberUsername, game: "Tic Tac Toe"}], "Tic Tac Toe")
        else if (res) require('../addTokens.js')(message.author.id, res, tokens, 0, {players: currentGame.lobby.memberUsername, game: "Tic Tac Toe"}, "ttt")
  })
  } else {
  end.field(`\u200b`, `🏆 **${currentGame.lobby.memberUsername[1]}** ${lang.misc.won}! - +40 ${lang.misc.tokenCap}`)
  end.field("\u200b", `🥈 **${currentGame.lobby.memberUsername[0]}** - +20 ${lang.misc.tokenCap}`)
  message.channel.createEmbed(end)

  currentGame.lobby.members.forEach((member, i) => {
    let token;
    if (i === 1) token = 40
    else token = 20

    let wins;
    if (i === 1) wins = 1
    else wins = 0

    authorSchema.findOne({id: member}, (err, res) => {
      if (!res) require('../createProfile.js')(bot, member, currentGame.lobby.memberUsername[i], token, {connect4: 0, quiz: 0, rps: 0, ttt: wins, uno: 0}, {connect4: 0, hangman: 0, matchup: 0, quiz: 0, rps: 0, ttt: 1, uno: 0}, [{players: currentGame.lobby.memberUsername, game: "Tic Tac Toe"}], "Tic Tac Toe")
        else if (res) require('../addTokens.js')(member, res, token, wins, {players: currentGame.lobby.memberUsername, game: "Tic Tac Toe"}, "ttt")
    })
  })
  }
  if (games.size === 0) return;
  if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
  else delete games.get(message.guild.id)[message.author.id]
}

function draw() {
  msg.delete()
  const end = new Eris.Embed()
  .color(0x7289DA)
  .thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1")
  .title(lang.minigames.ttt.gameOver)
  .description(`
    ------------------
     |  ${spot.a}  |  ${spot.b}  |  ${spot.c}  |
    ------------------
     |  ${spot.d}  |  ${spot.e}  |  ${spot.f}  |
    ------------------
     |  ${spot.g}  |  ${spot.h}  |  ${spot.i}  |
    ------------------`)
  if (currentGame.lobby.currentMembers === 1) {
    end.field(lang.minigames.general.draw, `<:ThumbsUp:722272300078071898> ${lang.minigames.general.noTokens}`)
    message.channel.createEmbed(end)

    authorSchema.findOne({id: currentGame.lobby.members[0]}, (err, res) => {
      let tokens = 0
      if (!res) require('../createProfile.js')(bot, message.author.id, message.author.username, tokens, {connect4: 0, quiz: 0, rps: 0, ttt: 0, uno: 0}, {connect4: 0, hangman: 0, matchup: 0, quiz: 0, rps: 0, ttt: 1, uno: 0}, [{players: currentGame.lobby.memberUsername, game: "Tic Tac Toe"}], "Tic Tac Toe")
        else if (res) require('../addTokens.js')(message.author.id, res, tokens, 0, {players: currentGame.lobby.memberUsername, game: "Tic Tac Toe"}, "ttt")
    })
  } else if (currentGame.lobby.currentMembers === 2) {
    end.field(lang.minigames.general.draw, `🥉 ${lang.minigames.general.drawToken.replace("[TOKEN]", "**15**")}`)
    message.channel.createEmbed(end)
    currentGame.lobby.members.forEach((member, i) => {
      let tokens = 15
      authorSchema.findOne({id: member}, (err, res) => {
        if (!res) require('../createProfile.js')(bot, member, currentGame.lobby.memberUsername[i], tokens, {connect4: 0, quiz: 0, rps: 0, ttt: 0, uno: 0}, {connect4: 0, hangman: 0, matchup: 0, quiz: 0, rps: 0, ttt: 1, uno: 0}, [{players: currentGame.lobby.memberUsername, game: "Tic Tac Toe"}], "Tic Tac Toe")
        else if (res) require('../addTokens.js')(member, res, tokens, 0, {players: currentGame.lobby.memberUsername, game: "Tic Tac Toe"}, "ttt")
    })
  });
};
if (games.size === 0) return
if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
else delete games.get(message.guild.id)[message.author.id]
}

}
