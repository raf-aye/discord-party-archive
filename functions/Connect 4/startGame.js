const Eris = require('eris')
const { ReactionCollector, MessageCollector } = require("eris-collector");
const authorSchema = require('../../models/user.js')

function reverseArray(arr) {
  var newArray = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    newArray.push(arr[i]);
  }
  return newArray;
}

function chkLine(a,b,c,d) {
    // Check first cell non-zero and all cells match
    return ((a != 0) && (a ==b) && (a == c) && (a == d));
}

function arraysEqual(_arr1, _arr2) {

    if (!Array.isArray(_arr1) || ! Array.isArray(_arr2) || _arr1.length !== _arr2.length)
      return false;

    var arr1 = _arr1.concat().sort();
    var arr2 = _arr2.concat().sort();

    for (var i = 0; i < arr1.length; i++) {

        if (arr1[i] !== arr2[i]) {
          return false;
        }


    }

    return true;

}

function checkWin(bd) {
    // Check down
    for (var r = 0; r < 3; r++)
        for (var c = 0; c < 7; c++)
            if (chkLine(bd[r][c], bd[r+1][c], bd[r+2][c], bd[r+3][c]))
                return bd[r][c];

    // Check right
    for (r = 0; r < 6; r++)
        for (c = 0; c < 4; c++)
            if (chkLine(bd[r][c], bd[r][c+1], bd[r][c+2], bd[r][c+3]))
                return bd[r][c];

    // Check down-right
    for (r = 0; r < 3; r++)
        for (c = 0; c < 4; c++)
            if (chkLine(bd[r][c], bd[r+1][c+1], bd[r+2][c+2], bd[r+3][c+3]))
                return bd[r][c];

    // Check down-left
    for (r = 3; r < 6; r++)
        for (c = 0; c < 4; c++)
            if (chkLine(bd[r][c], bd[r-1][c+1], bd[r-2][c+2], bd[r-3][c+3]))
                return bd[r][c];

    return 0;
}

let reactions = [
  ':One:715114278008389683',
  ':Two:714905971843006566',
  ':Three:714905972178550784',
  ':Four:714905971817971812',
  ':Five:725110718331879515',
  ':Six:725110718419959889',
  ':Seven:725110718164369429'
]

let reactions2 = [
  'One:715114278008389683',
  'Two:714905971843006566',
  'Three:714905972178550784',
  'Four:714905971817971812',
  'Five:725110718331879515',
  'Six:725110718419959889',
  'Seven:725110718164369429'
]

let reactionID = [
  '715114278008389683',
  '714905971843006566',
  '714905972178550784',
  '714905971817971812',
  '725110718331879515',
  '725110718419959889',
  '725110718164369429'
]
module.exports = async (bot, message, currentGame, games, prefix, lang) => {
  let player1 = currentGame.lobby.memberUsername[0]
  let player2 = currentGame.lobby.memberUsername[1]

  let mention1 = `<@${currentGame.lobby.members[0]}>`
  let mention2 = `<@${currentGame.lobby.members[1]}>`

  if (!player2) {
    const cpuNames = require('../names.js')
    player2 = `${cpuNames[Math.floor(Math.random() * cpuNames.length)]} (CPU)`
  }
  if (mention2 === "<@undefined>") mention2 = "CPU"

  currentGame.rotation = [message.author.id, currentGame.lobby.members[1] || "CPU"]
  const msg = await message.channel.createMessage({content: mention1, embed: new Eris.Embed().color(0x7289DA).title(lang.minigames.connect.gameName).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").description(`
${lang.minigames.connect.instructions}

🔴 - **${player1}**
🔵 - **${player2}**

${mention1}'s ${lang.misc.turn}
${lang.minigames.connect.howToPlay}

+-------------------------------------+
 | <:One:715114278008389683> | <:Two:714905971843006566> | <:Three:714905972178550784> | <:Four:714905971817971812> | <:Five:725110718331879515> | <:Six:725110718419959889> | <:Seven:725110718164369429> |
 | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ |
 | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ |
 | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ |
 | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ |
 | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ |
 | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ |
+-------------------------------------+
`)})
  currentGame.msgID = msg.id
reactions.forEach(r => msg.addReaction(r))

let filter = (m, emoji, userID) => reactionID.includes(emoji.id) && currentGame.lobby.members.includes(userID)

const collector = new ReactionCollector(bot, msg, filter, {
            time: 600000
})


collector.on('collect', async (m, emoji, userID) => {
  let key = Object.keys(m.reactions)
  // if (!arraysEqual(key, reactions2)) return

  let reverse = reverseArray(currentGame.rawBoard)

  const user = message.guild.members.get(userID)
  if (!user) return
  if (userID !== currentGame.rotation[0]) return


  function loop(k) {
    let validSpot = false
    for (i = 0; i < 6; i++) {
      if (reverse[i][k] !== 0) validSpot = false
      else validSpot = true
    }
    return validSpot
  }

  switch (emoji.id) {
    case "715114278008389683":
      if (loop(0) === false) return 
      putChip(0, userID)
      break;

    case "714905971843006566":
      if (loop(1) === false) return;
      putChip(1, userID)
      break;

    case "714905972178550784":
      if (loop(2) === false) return;
      putChip(2, userID)
      break;

    case "714905971817971812":
      if (loop(3) === false) return;
      putChip(3, userID)
      break;

    case "725110718331879515":
      if (loop(4) === false) return;
      putChip(4, userID)
      break;

    case "725110718419959889":
      if (loop(5) === false) return;
      putChip(5, userID)
      break;

    case "725110718164369429":
      if (loop(6) === false) return;
      putChip(6, userID)
      break;
  }
});

collector.on('end', collected => {
  if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
  else delete games.get(message.guild.id)[message.author.id]
	msg.edit({content: "\u200b", embed: {color: 0x7289DA, thumbnail: {url: "https://cdn.discordapp.com/emojis/718331720398798899.png?v=1"}, description: lang.minigames.general.timeOutGame}})
});

function putChip(p, userID) {
  let actualIndexes = [5, 4, 3, 2, 1, 0]
  let reverse = reverseArray(currentGame.board)

  let alreadyWritten = false
  let full = true

  reverse.forEach((place, i) => {
    place = place[p]
    if (place !== "⚪") return;
    if (alreadyWritten === true) return;

    if (currentGame.lobby.members[0] === userID) {
      currentGame.board[actualIndexes[i]][p] = "🔴"
      currentGame.rawBoard[actualIndexes[i]][p] = 1
    } else {
      currentGame.board[actualIndexes[i]][p] = "🔵"
      currentGame.rawBoard[actualIndexes[i]][p] = 2
    }
    full = false
    alreadyWritten = true
  })

  if (full === true) return;
  edit()
}

function placeAIChip(p, actualIndexes, alreadyWritten, full, reverse, num) {

  reverse.forEach((place, i) => {
    place = place[p]
    if (place !== "⚪") return;
    if (alreadyWritten === true) return;
    currentGame.board[actualIndexes[i]][p] = "🔵"
    currentGame.rawBoard[actualIndexes[i]][p] = 2
    full = false
    alreadyWritten = true
  })
  if (num === 2 && full === true) return edit()
  return full
}

function AIPlace() {
  let randomIndex = [0, 1, 2, 3, 4, 5, 6]
  let p = randomIndex[Math.floor(Math.random() * randomIndex.length)];
  let actualIndexes = [5, 4, 3, 2, 1, 0]
  let reverse = reverseArray(currentGame.board)

  let alreadyWritten = false
  let full = true

  if (placeAIChip(p, actualIndexes, alreadyWritten, full, reverse, 1) === true) return placeAIChip(p, actualIndexes, alreadyWritten, full, reverse, 2)

  edit()
}

function edit() {
  let row1 = currentGame.board[0], row2 = currentGame.board[1], row3 = currentGame.board[2], row4 = currentGame.board[3], row5 = currentGame.board[4], row6 = currentGame.board[5]

  let winner = checkWin(currentGame.rawBoard)

  if (winner === 1) {
    msg.delete()
    collector.stop()
    finalWinner(1)

  } else if (winner === 2) {
    msg.delete()
    collector.stop()

    finalWinner(2)
  } else if (winner === 0 && currentGame.rawBoard.every(r => r.every(u => u !== 0))) {
    msg.delete()
    collector.stop()

    if (currentGame.lobby.currentMembers === 1) return draw(true)
    else return draw(false)
  } else if (winner === 0) {
  currentGame.rotation.reverse()
   let mention;
   if (currentGame.rotation[0] !== message.author.id) mention = mention2
   else mention = mention1
   if (currentGame.rotation[0] === "CPU") return AIPlace()
  msg.edit({content: mention, embed: new Eris.Embed().color(0x7289DA).title(lang.minigames.connect.gameName).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").description(`
${lang.minigames.connect.instructions}

🔴 - **${player1}**
🔵 - **${player2}**

${mention}'s ${lang.misc.turn}
${lang.minigames.connect.howToPlay}

+-------------------------------------+
 | <:One:715114278008389683> | <:Two:714905971843006566> | <:Three:714905972178550784> | <:Four:714905971817971812> | <:Five:725110718331879515> | <:Six:725110718419959889> | <:Seven:725110718164369429> |
 | ${row1[0]} | ${row1[1]} | ${row1[2]} | ${row1[3]} | ${row1[4]} | ${row1[5]} | ${row1[6]} |
 | ${row2[0]} | ${row2[1]} | ${row2[2]} | ${row2[3]} | ${row2[4]} | ${row2[5]} | ${row2[6]} |
 | ${row3[0]} | ${row3[1]} | ${row3[2]} | ${row3[3]} | ${row3[4]} | ${row3[5]} | ${row3[6]} |
 | ${row4[0]} | ${row4[1]} | ${row4[2]} | ${row4[3]} | ${row4[4]} | ${row4[5]} | ${row4[6]} |
 | ${row5[0]} | ${row5[1]} | ${row5[2]} | ${row5[3]} | ${row5[4]} | ${row5[5]} | ${row5[6]} |
 | ${row6[0]} | ${row6[1]} | ${row6[2]} | ${row6[3]} | ${row6[4]} | ${row6[5]} | ${row6[6]} |
+-------------------------------------+
`)})
}
}
function draw(isCPU) {
  let row1 = currentGame.board[0], row2 = currentGame.board[1], row3 = currentGame.board[2], row4 = currentGame.board[3], row5 = currentGame.board[4], row6 = currentGame.board[5]

  const embed = new Eris.Embed()
  .color(0x7289DA)
  .title(lang.minigames.connect.gameOver)
  .thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1")
  .description(`+-------------------------------------+
   | <:One:715114278008389683> | <:Two:714905971843006566> | <:Three:714905972178550784> | <:Four:714905971817971812> | <:Five:725110718331879515> | <:Six:725110718419959889> | <:Seven:725110718164369429> |
   | ${row1[0]} | ${row1[1]} | ${row1[2]} | ${row1[3]} | ${row1[4]} | ${row1[5]} | ${row1[6]} |
   | ${row2[0]} | ${row2[1]} | ${row2[2]} | ${row2[3]} | ${row2[4]} | ${row2[5]} | ${row2[6]} |
   | ${row3[0]} | ${row3[1]} | ${row3[2]} | ${row3[3]} | ${row3[4]} | ${row3[5]} | ${row3[6]} |
   | ${row4[0]} | ${row4[1]} | ${row4[2]} | ${row4[3]} | ${row4[4]} | ${row4[5]} | ${row4[6]} |
   | ${row5[0]} | ${row5[1]} | ${row5[2]} | ${row5[3]} | ${row5[4]} | ${row5[5]} | ${row5[6]} |
   | ${row6[0]} | ${row6[1]} | ${row6[2]} | ${row6[3]} | ${row6[4]} | ${row6[5]} | ${row6[6]} |
  +-------------------------------------+`)

  if (isCPU === true) {
    embed.field(lang.minigames.general.draw, `<:ThumbsUp:722272300078071898> ${lang.minigames.general.noTokens}`)
  } else if (isCPU === false) {
    embed.field(lang.minigames.general.draw, `🥉 ${lang.minigames.general.drawTokens.replace("[TOKENS]", `**${lang.numbers["1"]}${lang.numbers["0"]}**`)}`)
  }
  message.channel.createEmbed(embed)
  currentGame.lobby.members.forEach((member, i) => {
    let tokens;
    if (isCPU === true) tokens = 0
    else tokens = 10
    authorSchema.findOne({id: member}, (err, res) => {
      if (!res) require('../createProfile.js')(bot, member, currentGame.lobby.memberUsername[i], tokens, {connect4: 0, hangman: 0, matchup: 0, quiz: 0, rps: 0, ttt: 0, uno: 0}, {connect4: 1, hangman: 0, matchup: 0, quiz: 0, rps: 0, ttt: 0, uno: 0}, [{players: currentGame.lobby.memberUsername, game: "Connect 4"}], "Connect 4")
      else if (res) require('../addTokens.js')(message.author.id, res, tokens, 0, {players: currentGame.lobby.memberUsername, game: "Connect 4"}, "connect4")
  })
});
}

function finalWinner(player) {
  let row1 = currentGame.board[0], row2 = currentGame.board[1], row3 = currentGame.board[2], row4 = currentGame.board[3], row5 = currentGame.board[4], row6 = currentGame.board[5]
  const embed = new Eris.Embed()
  .color(0x7289DA)
  .title(lang.minigames.connect.gameOver)
  .thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1")
  .description(`+-------------------------------------+
   | <:One:715114278008389683> | <:Two:714905971843006566> | <:Three:714905972178550784> | <:Four:714905971817971812> | <:Five:725110718331879515> | <:Six:725110718419959889> | <:Seven:725110718164369429> |
   | ${row1[0]} | ${row1[1]} | ${row1[2]} | ${row1[3]} | ${row1[4]} | ${row1[5]} | ${row1[6]} |
   | ${row2[0]} | ${row2[1]} | ${row2[2]} | ${row2[3]} | ${row2[4]} | ${row2[5]} | ${row2[6]} |
   | ${row3[0]} | ${row3[1]} | ${row3[2]} | ${row3[3]} | ${row3[4]} | ${row3[5]} | ${row3[6]} |
   | ${row4[0]} | ${row4[1]} | ${row4[2]} | ${row4[3]} | ${row4[4]} | ${row4[5]} | ${row4[6]} |
   | ${row5[0]} | ${row5[1]} | ${row5[2]} | ${row5[3]} | ${row5[4]} | ${row5[5]} | ${row5[6]} |
   | ${row6[0]} | ${row6[1]} | ${row6[2]} | ${row6[3]} | ${row6[4]} | ${row6[5]} | ${row6[6]} |
  +-------------------------------------+`)
if (player === 1 && !currentGame.lobby.members[1]) {
  embed.field('You Won!', `<:ThumbsUp:722272300078071898> ${lang.minigames.general.noTokens}`)
  P1Win(embed)
} else if (player === 1 && currentGame.lobby.members[1]) {
  embed.field(`\u200b`, `🏆 **${currentGame.lobby.memberUsername[0]}** ${lang.misc.won}! - +${lang.numbers["4"]}${lang.numbers["0"]} ${lang.misc.tokenCap}`)
  embed.field("\u200b", `🥈 **${currentGame.lobby.memberUsername[1]}** - +${lang.numbers["2"]}${lang.numbers["0"]} ${lang.misc.tokenCap}`)
  P1Win(embed)
} else if (player === 2 && !currentGame.lobby.members[1]) {
  embed.field("🏆 The CPU Won!", `<:ThumbsUp:722272300078071898> ${lang.minigames.general.noTokens}`)
  P2Win(embed)
} else if (player === 2 && currentGame.lobby.members[1]) {
  embed.field(`\u200b`, `🏆 **${currentGame.lobby.memberUsername[1]}** ${lang.misc.won}! - +${lang.numbers["4"]}${lang.numbers["0"]} ${lang.misc.tokenCap}`)
  embed.field("\u200b", `🥈 **${currentGame.lobby.memberUsername[0]}** - +${lang.numbers["2"]}${lang.numbers["0"]} ${lang.misc.tokenCap}`)
  P2Win(embed)
}
}

function P1Win(embed) {
  if (currentGame.lobby.currentMembers === 1) {
    message.channel.createEmbed(embed)
    authorSchema.findOne({id: currentGame.lobby.members[0]}, (err, res) => {
      let tokens = 0
      if (!res) require('../createProfile.js')(bot, message.author.id, message.author.username, tokens, {connect4: 0, hangman: 0, matchup: 0, quiz: 0, rps: 0, ttt: 0, uno: 0}, {connect4: 1, hangman: 0, matchup: 0, quiz: 0, rps: 0, ttt: 0, uno: 0}, [{players: currentGame.lobby.memberUsername, game: "Connect 4"}], "Connect 4")
  else if (res) require('../addTokens.js')(message.author.id, res, tokens, 0, {players: currentGame.lobby.memberUsername, game: "Connect 4"}, "connect4")
    })
  } else {
    message.channel.createEmbed(embed)

    currentGame.lobby.members.forEach((member, i) => {
      let token;
      if (i === 0) token = 40
      else token = 20

      let wins;
      if (i === 0) wins = 1
      else wins = 0

      authorSchema.findOne({id: member}, (err, res) => {
        if (!res) require('../createProfile.js')(bot, member, currentGame.lobby.memberUsername[i], token, {connect4: wins, hangman: 0, matchup: 0, quiz: 0, rps: 0, ttt: 0, uno: 0}, {connect4: 1, hangman: 0, matchup: 0, quiz: 0, rps: 0, ttt: 0, uno: 0}, [{players: currentGame.lobby.memberUsername, game: "Connect 4"}], "Connect 4")
      else if (res) require('../addTokens.js')(member, res, token, wins, {players: currentGame.lobby.memberUsername, game: "Connect 4"}, "connect4")
      })
    })
  }
  if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
  else delete games.get(message.guild.id)[message.author.id]
  }
function P2Win(embed) {
message.channel.createEmbed(embed)
if (currentGame.lobby.currentMembers === 1) {
authorSchema.findOne({id: currentGame.lobby.members[0]}, (err, res) => {
  let tokens = 0
  if (!res) require('../createProfile.js')(bot, message.author.id, message.author.username, tokens, {connect4: 0, hangman: 0, matchup: 0, quiz: 0, rps: 0, ttt: 0, uno: 0}, {connect4: 1, hangman: 0, matchup: 0, quiz: 0, rps: 0, ttt: 0, uno: 0}, [{players: currentGame.lobby.memberUsername, game: "Connect 4"}], "Connect 4")
  else if (res) require('../addTokens.js')(message.author.id, res, tokens, 0, {players: currentGame.lobby.memberUsername, game: "Connect 4"}, "connect4")
})
} else {
currentGame.lobby.members.forEach((member, i) => {
  let token;
  if (i === 1) token = 40
  else token = 20

  let wins;
  if (i === 1) wins = 1
  else wins = 0

  authorSchema.findOne({id: member}, (err, res) => {
    if (!res) require('../createProfile.js')(bot, member, currentGame.lobby.memberUsername[i], token, {connect4: wins, hangman: 0, matchup: 0, quiz: 0, rps: 0, ttt: 0, uno: 0}, {connect4: 1, hangman: 0, matchup: 0, quiz: 0, rps: 0, ttt: 0, uno: 0}, [{players: currentGame.lobby.memberUsername, game: "Connect 4"}], "Connect 4")
      else if (res) require('../addTokens.js')(member, res, token, wins, {players: currentGame.lobby.memberUsername, game: "Connect 4"}, "connect4")
  })
})
}
if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
else delete games.get(message.guild.id)[message.author.id]
}

}
