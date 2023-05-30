const Eris = require('eris')
const { ReactionCollector, MessageCollector } = require("eris-collector");
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

module.exports = (bot, users, currentGame, games, prefix, message, judgeMsg) => {
    const judge = users[0]

    let cardLengths
    if (currentGame.redCards.length === 1) cardLengths = ["1", "one"] // Just for testing, impossible to get one player
    if (currentGame.redCards.length === 2) cardLengths = ["1", "2", "one", "two"]
    if (currentGame.redCards.length === 3) cardLengths = ["1", "2", "3", "one", "two", "three"]
    if (currentGame.redCards.length === 4) cardLengths = ["1", "2", "3", "4", "one", "two", "three", "four"]

    let filter = (me) =>  cardLengths.includes(me.content.toLowerCase()) && me.author.id === judge.id

 
    let collector = new MessageCollector(bot, judge.dmUser, filter, {
    time: 30000
    });
    
    collector.on('collect', async (m) => {
     let cardIndex = masks[m.content.toLowerCase()]
     if (isNaN(cardIndex)) return;


     let card = currentGame.redCards[cardIndex]
     let otherCards = currentGame.redCards
     otherCards.splice(cardIndex, 1)

     
     users.forEach(u => u.dmUser.createEmbed(new Eris.Embed().color(0xff6347).author(`${card.player.username} has won!`, bot.users.get(card.player.id).avatarURL).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(`Theme: **${currentGame.greenCard.word}**\n\nWinner Card:\n\n**${card.word}** - ${card.definition}\n\n-----------------------------------------------------------------------\n\nRunner Ups:\n\n${otherCards.map(c => `**${c.word}** - ${c.definition}\n(Played by **${c.player.username}**)`).join("\n\n")}`)))
    });
}