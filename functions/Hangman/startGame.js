const wordList = require('./words.json').words // Thank you argonlaser (Github) for the words
const Eris = require('eris')
const { ReactionCollector, MessageCollector } = require("eris-collector");
const letters = /^[A-Za-z]+$/;

function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}

let boards = [`
  +---+
  |   |
      |
      |
      |
      |
=========
`, `
  +---+
  |   |
  O   |
      |
      |
      |
=========
`, `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========
`, `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========
`, `
  +---+
  |   |
  O   |
 /|\\\  |
      |
      |
=========
`, `
  +---+
  |   |
  O   |
 /|\\\  |
 /    |
      |
=========
`, `
  +---+
  |   |
  O   |
 /|\\\  |
 / \\\  |
      |
=========
`];

module.exports = async (bot, message, currentGame, games, prefix, lang) => {
let wordInfo = currentGame.wordInfo
let word = wordList[Math.floor(Math.random() * wordList.length)]
currentGame.wordInfo.word = word.term, currentGame.wordInfo.splitWord = word.term.split(""), currentGame.wordInfo.seen = word.term.replace(/[a-z]/gi, ' _ ').split("  "), currentGame.wordInfo.definition = word.definition
  
const msg = await message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").title("Hangman").description(`\`\`\`\n${currentGame.board}\n\`\`\`\n
${lang.minigames.hangman.instructions}

Note: You have to say each letter individually, you cannot say the whole word!

${lang.minigames.hangman.incorrect} \`${lang.minigames.hangman.none}\`

\`${currentGame.wordInfo.seen.join(" ")}\``).footer(lang.minigames.hangman.note.replace("[HOST]", message.author.username).replace("[PREFIX]", prefix)))
currentGame.msgID = msg.id
  let filter = (m) => m.content.match(letters) && m.content.length === 1
  let collector = new MessageCollector(bot, message.channel, filter, {
      time: 180000
  });

collector.on("collect", (m) => {
  if (!games.get(message.guild.id) || !games.get(message.guild.id)[message.author.id]) return;
  if (currentGame.misc.cooldown === true) return;
  if (currentGame.guessed.includes(m.content.toLowerCase())) {
    if (message.guild.me.permission.has("manageMessages")) return m.delete()
    else return
  }
  
  currentGame.guessed.push(m.content.toLowerCase())
  
  if (!currentGame.wordInfo.splitWord.includes(m.content.toLowerCase())) {
    if ("None".includes(currentGame.incorrect)) currentGame.incorrect = []
    currentGame.incorrect.push(m.content.toLowerCase())
    currentGame.stage++
    currentGame.board = boards[currentGame.stage]
  } else {
    currentGame.correct.push(m.content.toLowerCase())
    currentGame.wordInfo.splitWord.forEach((letter, i) => {
      if (letter === m.content.toLowerCase()) currentGame.wordInfo.seen[i] = letter
    })
  }
if (message.guild.me.permission.has("manageMessages")) m.delete()
  
if (arrayEquals(currentGame.wordInfo.seen, currentGame.wordInfo.splitWord) === true) return won()
if (currentGame.stage === 6) return lost()
  
currentGame.misc.cooldown = true
msg.edit({embed: new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").title("Hangman").description(`\`\`\`\n${currentGame.board}\n\`\`\`\n
${lang.minigames.hangman.instructions}

Note: You have to say each letter individually, you cannot say the whole word!

${lang.minigames.hangman.incorrect} \`${currentGame.incorrect.join(", ")}\`

\`${currentGame.wordInfo.seen.join(" ")}\``).footer(lang.minigames.hangman.note.replace("[HOST]", message.author.username).replace("[PREFIX]", prefix))})
setTimeout(() => {currentGame.misc.cooldown = false}, 1000)
});

collector.on('end', () => {
  if (games.get(message.guild.id) && games.get(message.guild.id)[message.author.id]) return timeOut()
})

  function won() {
    msg.delete()
    let seenWord = currentGame.wordInfo.seen.length
    let earnedTokens = seenWord * 5
    message.channel.createEmbed(new Eris.Embed().color(0x7289DA).title(lang.minigames.hangman.gameOver).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").description(lang.minigames.hangman.wordCorrect.replace("[WORD]", currentGame.wordInfo.splitWord.join("")).replace("[DEFINITION]", currentGame.wordInfo.definition).replace("[TOKENS]", earnedTokens)))
    addTokens(earnedTokens)
  }
  
  function lost() {
    let seenWord = currentGame.correct.length
    let earnedTokens = seenWord * 2
    msg.delete()
    message.channel.createEmbed(new Eris.Embed().color(0x7289DA).title(lang.minigames.hangman.gameOver).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").description(lang.minigames.hangman.wordIncorrect.replace("[WORD]", currentGame.wordInfo.splitWord.join("")).replace("[DEFINITION]", currentGame.wordInfo.definition).replace("[TOKENS]", earnedTokens)))
    addTokens(earnedTokens)
  }
  
  function timeOut() {
    let seenWord = 1
    let earnedTokens = seenWord * 2
    msg.delete()
    message.channel.createEmbed(new Eris.Embed().color(0x7289DA).title(lang.minigames.hangman.timeOut).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").description(lang.minigames.hangman.wordIncorrect.replace("[WORD]", wordInfo.splitWord.join("")).replace("[DEFINITION]", wordInfo.definition).replace("[TOKENS]", earnedTokens)))
    addTokens(earnedTokens)
  }

  function addTokens(tokens) {
    require('../../models/user.js').findOne({id: message.author.id}, (err, res) => {
      if (!res) require('../createProfile.js')(bot, message.author.id, message.author.username, tokens, {connect4: 0, hangman: 0, matchup: 0, quiz: 0, rps: 0, ttt: 0, uno: 0}, {connect4: 0, hangman: 1, matchup: 0, quiz: 0, rps: 0, ttt: 0, uno: 0}, [{players: [message.author.username], game: "Hangman"}], "Hangman")
      else if (res) require('../addTokens.js')(message.author.id, res, tokens, 0, {players: [message.author.username], game: "Hangman"}, "Hangman")
})

if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
else delete games.get(message.guild.id)[message.author.id]
collector.stop()
  }
}