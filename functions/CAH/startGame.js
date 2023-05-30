const Eris = require('eris')

module.exports = (bot, message, currentGame, games, prefix) => {
  const cards = JSON.parse(require('./Cards/cah-all-compact.json'));
  
  currentGame.lobby.members.forEach((member, m) => {
  for (var i = 0; i < 7; i++) {
      currentGame.decks[m].red.push(cards.white[Math.floor(Math.random() * cards.white.length)])
  }
});

  
let users = []
  currentGame.lobby.members.forEach(async (member, m) => {
    const dmUser = await bot.getDMChannel(member)
   let msg 
   if (m === 0) {
     const embed = new Eris.Embed()
     .color(0x4CEF8B)
     .title("You are the Judge!")
     .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")

     let cards = []
     currentGame.decks[0].green.forEach((card, c) => {
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
      cards.push(`${emoji} **${card.word}** (${card.definition})`)
    })
    embed.description(`Choose which theme the cards will have to follow!\nTo play a card just say the number for the cooresponding card\n(1, 2, 3, 4, 5)\n\n${cards.join('\n\n')}`)
    msg = await dmUser.createEmbed(embed)
   } else {
    const embed = new Eris.Embed()
    .color(0xff6347)
    .title("You are a Player")
    .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
    .description(`**Sit Tight! The Judge is picking a card!** <a:Loading:712097176313921548>`)
   msg = await dmUser.createEmbed(embed)
   }

   console.log(m)
   users[m] = {id: member, username: currentGame.lobby.memberUsername[m], msg: msg, dmUser: dmUser}
   console.log(users)
   if (m + 1 === currentGame.lobby.currentMembers) return setTimeout(() => {require('./judgePlay.js')(bot, users, currentGame, games, prefix, message)}, 4000)
  })

}

