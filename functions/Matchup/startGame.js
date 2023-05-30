const Eris = require('eris');
const { ReactionCollector, MessageCollector } = require("eris-collector");

let animals = [
  '🐢',  '🐸',  '🐷',
  '🐹',  '🐝',  '🐔',
  '🦋 ', '🐺',

  '🐢',  '🐸',  '🐷',
  '🐹',  '🐝',  '🐔',
  '🦋 ', '🐺'
]

let food = [
  '🍎', '🍐', '🍌',
  '🍊', '🍔', '🍕',
  '🍟', '🥪',

  '🍎', '🍐', '🍌',
  '🍊', '🍔', '🍕',
  '🍟', '🥪'
]

let sports = [
  '⚽', '🏀', '🏈',
  '⚾', '🏐', '<:Tennis_Racket:729401437754228863>',
  '🎱', '🏓',
  
  '⚽', '🏀', '🏈',
  '⚾', '🏐', '<:Tennis_Racket:729401437754228863>', 
  '🎱', '🏓'
]

module.exports = async (bot, message, currentGame, games, prefix, lang) => {
let boardChoose = [{arr: sports, theme: lang.minigames.matchup.themes[0]}, {arr: food, theme: lang.minigames.matchup.themes[1]}, {arr: animals, theme: lang.minigames.matchup.themes[2]}]
let board = boardChoose[Math.floor(Math.random() * boardChoose.length)];

currentGame.rawBoard = board.arr.sort(() => Math.random() - Math.random())

const msg = await message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").title(lang.minigames.matchup.matchup).description(`
  ${lang.minigames.matchup.instructions2}
  ${lang.minigames.matchup.theme}: **${board.theme}**
  ${lang.minigames.matchup.matches}: **${currentGame.stats.matches}**

  ${lang.minigames.matchup.instruction}
  +-------------------------+
  | <:Spacer:730511110653870310> | <:Blurple_A:717617609431842846> | <:Blurple_B:717617609373384765> | <:Blurple_C:717617609562128425> | <:Blurple_D:717617609314402306> |
  | <:One:715114278008389683> | :white_large_square: | :white_large_square: | :white_large_square: | :white_large_square: |
  | <:Two:714905971843006566> | :white_large_square: | :white_large_square: | :white_large_square: | :white_large_square: |
  | <:Three:714905972178550784> | :white_large_square: | :white_large_square: | :white_large_square: | :white_large_square: |
  | <:Four:714905971817971812> | :white_large_square: | :white_large_square: | :white_large_square: | :white_large_square: |
  +-------------------------+
  `).footer(lang.minigames.matchup.note.replace("[HOST]", message.author.username).replace("[PREFIX]", prefix)))
currentGame.msgID = msg.id

  let filter = (m) => ['a1', 'a2', 'a3', 'a4', 'b1', 'b2', 'b3', 'b4', 'c1', 'c2', 'c3', 'c4', 'd1', 'd2', 'd3', 'd4'].includes(m.content.toLowerCase()) && m.author.id === message.author.id;

        let collector = new MessageCollector(bot, message.channel, filter, {
            time: 300000
        });
const actualIndexes = {"a1": 0, "b1": 1, "c1": 2, "d1": 3, "a2": 4, "b2": 5, "c2": 6, "d2": 7, "a3": 8, "b3": 9, "c3": 10, "d3": 11, "a4": 12, "b4": 13, "c4": 14, "d4": 15}

collector.on("collect", (m) => {
   if (!games.get(message.guild.id) || !games.get(message.guild.id)[message.author.id]) return;
  if (currentGame.misc.allowedToPlay === false) return;

  const content = m.content.toLowerCase()
  if (!Object.keys(actualIndexes).includes(content)) return;

  const index = actualIndexes[content]
  if (currentGame.currentPlayed.filter(i => i.index === index).length > 0) return;
  if (currentGame.filledIndexes.includes(index)) return;
  
  currentGame.board[index] = currentGame.rawBoard[index]
  currentGame.misc.played++
  currentGame.currentPlayed.push({space: currentGame.rawBoard[index], index: index})
  if (message.guild.me.permission.has("manageMessages")) m.delete()
  edit()
});

collector.on("end", (collected) => {
  if (games.get(message.guild.id) && games.get(message.guild.id)[message.author.id]) return endGame(true)
})

function edit() {
  let space = currentGame.board

  if (currentGame.misc.played === 2 && currentGame.currentPlayed[0].space === currentGame.currentPlayed[1].space) {
    currentGame.stats.matches++
    if (currentGame.stats.matches === 8) return endGame(false)
    currentGame.played.push(currentGame.currentPlayed[0].space)
    currentGame.currentPlayed.forEach(e => currentGame.filledIndexes.push(e.index))
    currentGame.currentPlayed = []
    currentGame.misc.played = 0
  }

  msg.edit({embed: new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").title(lang.minigames.matchup.matchup).description(`
  ${lang.minigames.matchup.instructions2}
  ${lang.minigames.matchup.theme}: **${board.theme}**
  ${lang.minigames.matchup.matches}: **${currentGame.stats.matches}**

  ${lang.minigames.matchup.instruction}
  +------------------------+
  | <:Spacer:730511110653870310> | <:Blurple_A:717617609431842846> | <:Blurple_B:717617609373384765> | <:Blurple_C:717617609562128425> | <:Blurple_D:717617609314402306> |
  | <:One:715114278008389683> | ${space[0]} | ${space[1]} | ${space[2]} | ${space[3]} |
  | <:Two:714905971843006566> | ${space[4]} | ${space[5]} | ${space[6]} | ${space[7]} |
  | <:Three:714905972178550784> | ${space[8]} | ${space[9]} | ${space[10]} | ${space[11]} |
  | <:Four:714905971817971812> | ${space[12]} | ${space[13]} | ${space[14]} | ${space[15]} |
  +------------------------+
  `).footer(lang.minigames.matchup.note.replace("[HOST]", message.author.username).replace("[PREFIX]", prefix))})

  currentGame.misc.allowedToPlay = true

  if (currentGame.misc.played === 2 && currentGame.currentPlayed.length > 0 && currentGame.currentPlayed[0].space !== currentGame.currentPlayed[1].space) {
      currentGame.currentPlayed.forEach(p => {
        currentGame.board[p.index] = "⬜"
      })
      currentGame.misc.allowedToPlay = false
      currentGame.misc.played = 0
      currentGame.played
      currentGame.currentPlayed = []
      setTimeout(() => {edit()}, 1200)
      return;
  }
}

function endGame(timedOut) {
let space = currentGame.board

let end = new Eris.Embed()
.color(0x7289DA)
.thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1")
.title(lang.minigames.matchup.gameOver)
.description(`
+-------------------------+
| <:Spacer:730511110653870310> | <:Blurple_A:717617609431842846> | <:Blurple_B:717617609373384765> | <:Blurple_C:717617609562128425> | <:Blurple_D:717617609314402306> |
| <:One:715114278008389683> | ${space[0]} | ${space[1]} | ${space[2]} | ${space[3]} |
| <:Two:714905971843006566> | ${space[4]} | ${space[5]} | ${space[6]} | ${space[7]} |
| <:Three:714905972178550784> | ${space[8]} | ${space[9]} | ${space[10]} | ${space[11]} |
| <:Four:714905971817971812> | ${space[12]} | ${space[13]} | ${space[14]} | ${space[15]} |
+-------------------------+`)

let earnedTokens = currentGame.stats.matches * 3 + 20
if (earnedTokens === 20) earnedTokens = 5
end.field(`<:ThumbsUp:722272300078071898> ${lang.minigames.matchup.earnings.replace("[MATCH]", currentGame.stats.matches).replace("[TOKENS]", earnedTokens)}`, "\u200b")
if (timedOut === true) end.title = lang.minigames.matchup.timeOut
message.channel.createEmbed(end)
require('../../models/user.js').findOne({id: message.author.id}, (err, res) => {
  if (!res) require('../createProfile.js')(bot, message.author.id, message.author.username, earnedTokens, {connect4: 0, hangman: 0, matchup: 0, quiz: 0, rps: 0, ttt: 0, uno: 0}, {connect4: 0, hangman: 0, matchup: 1, quiz: 0, rps: 0, ttt: 0, uno: 0}, [{players: currentGame.lobby.memberUsername, board: currentGame.board, rawBoard: currentGame.rawBoard, game: "Matchup"}], "Matchup")
      else if (res) require('../addTokens.js')(message.author.id, res, earnedTokens, 0, {players: currentGame.lobby.memberUsername, board: currentGame.board, rawBoard: currentGame.rawBoard, game: "Matchup"}, "matchup")
})
if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
else delete games.get(message.guild.id)[message.author.id]
collector.stop()
msg.delete()
}

}
