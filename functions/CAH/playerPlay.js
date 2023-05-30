const Eris = require('eris')
const red = require('./Cards/red.js');

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

module.exports = async (bot, users, currentGame, games, prefix, message, judgeMsg) => {
    let players = users
    players = players.slice(1, 8)

    players.forEach(async (player) => {
        let p = currentGame.lobby.members.indexOf(player.id)
        const embed = new Eris.Embed()
        .color(0xff6347)
        .title(`The Judge ${users[0].username} has picked the card!`)
        .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
   
        let cards = []
        currentGame.decks[p].red.forEach((card, c) => {
          let emoji = ""
          switch (c) {
            case 0: 
            emoji = "<:One:715114278008389683>"
            break;
            case 1:
            emoji = "<:Two:714905971843006566>"
            break;
            case 2:
            emoji = "<:Three:714905972178550784>"
            break;
            case 3: 
            emoji = "<:Four:714905971817971812>"
            break;
            case 4: 
            emoji = "<:Five:725110718331879515>"
            break;
          }
         cards.push(`${emoji} **${card.word}**\n${card.definition}`)
       })
       embed.description(`Select which card best matches the word **${currentGame.greenCard.word}**\nTo play a card just say the number for the cooresponding card\n(1, 2, 3, 4, 5)\n\n${cards.join('\n\n')}`)
       const msg = await player.dmUser.createEmbed(embed)

       let filter = (me) =>  ["1", "2", "3", "4", "5", "one", "two", "three", "four", 'five'].includes(me.content.toLowerCase()) && me.author.id === player.id

 
  let collector = new MessageCollector(bot, player.dmUser, filter, {
  time: 30000
  });

  let played = false
 collector.on('collect', async (m) => {
    let cardIndex = masks[m.content.toLowerCase()]
    if (isNaN(cardIndex)) return;
    let redCard = currentGame.decks[p].red[cardIndex]

    currentGame.decks[p].red.slice(cardIndex, 1)
    currentGame.decks[p].red.push(red[Math.floor(Math.random() * red.length)])

    currentGame.redCards.push({word: redCard.word, definition: redCard.definition, player: {id: player.id, username: player.username, num: p + 2}})
    played = true  
    if (currentGame.redCards.length === currentGame.lobby.members.length - 1) {
      players.forEach(async p => p.dmUser.createEmbed(new Eris.Embed().color(0xff6347).title("The cards have been played!").thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(`Theme - ${currentGame.greenCard.word}\nRed Cards:\n\n${currentGame.redCards.map(r => `**${r.word}** - ${r.definition}`).join('\n')}`)))
      const judge = users[0]
      let cards = []
      currentGame.redCards.forEach((card, c) => {
          let emoji = ""
          switch (c) {
            case 0: 
            emoji = "<:One:715114278008389683>"
            break;
            case 1:
            emoji = "<:Two:714905971843006566>"
            break;
            case 2:
            emoji = "<:Three:714905972178550784>"
            break;
            case 3: 
            emoji = "<:Four:714905971817971812>"
            break;
            case 4: 
            emoji = "<:Five:725110718331879515>"
            break;
          }
         cards.push(`${emoji} **${card.word}** - ${card.definition}`)
       })
      const judgeMsg = await judge.dmUser.createEmbed(new Eris.Embed().color(0xff6347).title("The cards have been played!").thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(`Theme - ${currentGame.greenCard.word}\nRed Cards:\n\n${cards.join("\n\n")}\n\nSelect a card by typing a number that is between 1-5`).footer("You have 30 seconds to select a card"))
      require('./judgePickCard.js')(bot, users, currentGame, games, prefix, message, judgeMsg)
    } else player.dmUser.createEmbed(new Eris.Embed().color(0xff6347).title("You have played your card!").thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description("Please wait for the other players to play their cards! <a:Loading:712097176313921548>"))
    collector.stop()
 });

 collector.on('end', async () => {
   if (played === false) {
     let cardIndex = Math.floor(Math.random() * 4);
     let redCard = currentGame.decks[0].red[cardIndex]

    currentGame.decks[p].red.slice(cardIndex, 1)
    currentGame.decks[p].red.push(red[Math.floor(Math.random() * red.length)])

    currentGame.redCards.push({word: redCard.word, definition: redCard.definition, player: {id: player.id, username: player.username, num: p + 2}})
    player.dmUser.createEmbed(new Eris.Embed().color(0xff6347).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(`You did not respond in time, so I picked the card ${redCard.word} for you.`))
    if (currentGame.redCards.length === currentGame.lobby.members.length - 1) {
      players.forEach(async p => p.dmUser.createEmbed(new Eris.Embed().color(0xff6347).title("The cards have been played!").thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(`Theme - ${currentGame.greenCard.word}\nRed Cards:\n\n${currentGame.redCards.map(r => `**${r.word}** - ${r.definition}`).join('\n\n')}`)))
      const judge = users[0]
      let cards = []
      currentGame.redCards.forEach((card, c) => {
          let emoji = ""
          switch (c) {
            case 0: 
            emoji = "<:One:715114278008389683>"
            break;
            case 1:
            emoji = "<:Two:714905971843006566>"
            break;
            case 2:
            emoji = "<:Three:714905972178550784>"
            break;
            case 3: 
            emoji = "<:Four:714905971817971812>"
            break;
            case 4: 
            emoji = "<:Five:725110718331879515>"
            break;
          }
         cards.push(`${emoji} **${card.word}** - ${card.definition}`)
       })
      const judgeMsg = await judge.dmUser.createEmbed(new Eris.Embed().color(0xff6347).title("The cards have been played!").thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(`Theme - ${currentGame.greenCard.word}\nRed Cards:\n\n${cards.join("\n\n")}\n\nSelect a card by typing a number that is between 1-5`).footer("You have 30 seconds to select a card"))
      require('./judgePickCard.js')(bot, users, currentGame, games, prefix, message, judgeMsg)
    }
   }
 })
    })
}