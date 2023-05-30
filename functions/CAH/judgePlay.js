const Eris = require('eris')
const masks = {
"1": 0,
"2": 1,
"3": 2,
"4": 3,
"5": 4,
"one": 0,
"two": 1,
"three": 2,
"four": 3,
"five": 4
}

const { ReactionCollector, MessageCollector } = require("eris-collector");
const green = require('./Cards/green.js');

module.exports = (bot, users, currentGame, games, prefix, message) => {
const judge = users[0]

// let filter = (me, emoji, userID) => ["715114278008389683", "714905971843006566", "714905972178550784", "714905971817971812", "725110718331879515"].includes(emoji.id)
let filter = (me) =>  ["1", "2", "3", "4", "5", "one", "two", "three", "four", 'five'].includes(me.content.toLowerCase()) && me.author.id === judge.id

 
  let collector = new MessageCollector(bot, judge.dmUser, filter, {
  time: 30000
  });

  let played = false
 collector.on('collect', async (m) => {
     let cardIndex = masks[m.content.toLowerCase()]
     if (isNaN(cardIndex)) return;
     let greenCard = currentGame.decks[0].green[cardIndex]

     currentGame.decks[0].green.slice(cardIndex, 1)
     currentGame.decks[0].green.push(green[Math.floor(Math.random() * green.length)])

     currentGame.greenCard = {word: greenCard.word, definition: greenCard.definition}
     played = true

     judge.msg.delete()
     collector.stop()
     const judgeMsg = await judge.dmUser.createEmbed(new Eris.Embed().color(0x4CEF8B).title("Card Played!").thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(`You have picked **${greenCard.word}**\nWait for the other players to play their cards!`))

     require('./playerPlay.js')(bot, users, currentGame, games, prefix, message, judgeMsg)
 })

 collector.on('end', async () => {
     if (played === true) return;
     let cardIndex = Math.floor(Math.random() * currentGame.decks[0].green.length)
     let greenCard = currentGame.decks[0].green[cardIndex]

     currentGame.decks[0].green.slice(cardIndex, 1)
     currentGame.decks[0].green.push(green[Math.floor(Math.random() * green.length)])

     currentGame.greenCard = {word: greenCard.word, definition: greenCard.definition}

     judge.msg.delete()
     if (currentGame.redCards.length === currentGame.lobby.currentMembers) return
     const judgeMsg = await judge.dmUser.createEmbed(new Eris.Embed().color(0x4CEF8B).title("Card Played!").thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(`You did not respond in time, so I have randomly picked **${greenCard.word}**\nWait for the other players to play their cards!`))
     require('./playerPlay.js')(bot, users, currentGame, games, prefix, message, judgeMsg)
 })
}