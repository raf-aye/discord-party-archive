const Eris = require('eris')
const { ReactionCollector, MessageCollector } = require("eris-collector");

let cards = [ '<:B2:731183149421428747>', '<:B0:731183149446332436>', '<:B1:731183149610041384>', '<:B7:731183150478262332>', '<:B3:731183151929491588>', '<:B4:731183151988342925>', '<:B5:731183152420356186>', '<:B6:731183152713957433>', '<:G7:731183153192108043>', '<:G1:731183153200496750>', '<:BA2:731183153623859341>', '<:B8:731183153846419547>', '<:B9:731183153980637194>', '<:R1:731183154206867497>', '<:BR:731183154446205008>', '<:G0:731183154668503091>', '<:R7:731183154877956156>', '<:G2:731183155217825912>', '<:R2:731183155851296781>', '<:G4:731183155855360130>', '<:G5:731183155855491107>', '<:G8:731183155935051796>', '<:GR:731183155960348674>', '<:G3:731183155977126010>', '<:GA2:731183156006223953>', '<:R3:731183156023263383>', '<:R6:731183156060880982>', '<:G6:731183156064944180>', '<:Y0:731183156127858779>', '<:R5:731183156136509572>', '<:Y7:731183156148961310>', '<:BS:731183156186841088>', '<:R4:731183156232978482>', '<:G9:731183156241367210>', '<:RR:731183156304281601>', '<:R9:731183156316602439>', '<:Y2:731183156316733581>', '<:R8:731183156316864602>', '<:Y4:731183156366934087>', '<:RA2:731183156392362014>', '<:Y6:731183156497088553>', '<:Y1:731183156568522792>', '<:Y5:731183156627243088>', '<:Y3:731183156635369513>', '<:YR:731183156656603348>', '<:Y8:731183156685701211>', '<:Y9:731183156715192401>', '<:YA2:731183156736163961>', '<:GS:731183156740358175>', '<:YS:731183156824113243>', '<:WC:731183284415103118>', '<:W4:731183284305789049>', '<:R0:731183565961691258>', '<:RS:731183284054130818>' ]
let cardID = [ '731183149421428747', '731183149446332436', '731183149610041384', '731183150478262332', '731183151929491588', '731183151988342925', '731183152420356186', '731183152713957433', '731183153192108043', '731183153200496750', '731183153623859341', '731183153846419547', '731183153980637194', '731183154206867497', '731183154446205008', '731183154668503091', '731183154877956156', '731183155217825912', '731183155851296781', '731183155855360130', '731183155855491107', '731183155935051796', '731183155960348674', '731183155977126010', '731183156006223953', '731183156023263383', '731183156060880982', '731183156064944180', '731183156127858779', '731183156136509572', '731183156148961310', '731183156186841088', '731183156232978482', '731183156241367210', '731183156304281601', '731183156316602439', '731183156316733581', '731183156316864602', '731183156366934087', '731183156392362014', '731183156497088553', '731183156568522792', '731183156627243088', '731183156635369513', '731183156656603348', '731183156685701211', '731183156715192401', '731183156736163961', '731183156740358175', '731183156824113243', '731183284305789049', '731183284415103118', '731183565961691258', '731183284054130818', '717504662412066909' ]

let cardNames = [ 'B2', 'B0', 'B1', 'B7', 'B3', 'B4', 'B5', 'B6', 'G7', 'G1', 'BA2', 'B8', 'B9', 'R1', 'BR', 'G0', 'R7', 'G2', 'R2', 'G4', 'G5', 'G8', 'GR', 'G3', 'GA2', 'R3', 'R6', 'G6', 'Y0', 'R5', 'Y7', 'BS', 'R4', 'G9', 'RR', 'R9', 'Y2', 'R8', 'Y4', 'RA2', 'Y6', 'Y1', 'Y5', 'Y3', 'YR', 'Y8', 'Y9', 'YA2', 'GS', 'YS' , "WC", "W4", "R0", "RS" ]

let commands = [ 'play blue 2', 'play blue 0', 'play blue 1', 'play blue 7', 'play blue 3', 'play blue 4', 'play blue 5', 'play blue 6', 'play green 7', 'play green 1', 'play blue +2', 'play blue 8', 'play blue 9', 'play red 1', 'play blue reverse', 'play green 0', 'play red 7', 'play green 2', 'play red 2', 'play green 4', 'play green 5', 'play green 8', 'play green reverse', 'play green 3', 'play green +2', 'play red 3', 'play red 6', 'play green 6', 'play yellow 0', 'play red 5', 'play yellow 7', 'play blue skip', 'play red 4', 'play green 9', 'play red reverse', 'play red 9', 'play yellow 2', 'play red 8', 'play yellow 4', 'play red +2', 'play yellow 6', 'play yellow 1', 'play yellow 5', 'play yellow 3', 'play yellow reverse', 'play yellow 8', 'play yellow 9', 'play yellow +2', 'play green skip', 'play yellow skip', 'play wild red', 'play wild blue', 'play wild green', 'play wild yellow', 'play +4 red', 'play +4 blue', 'play +4 green', 'play +4 yellow', 'play red 0', 'play red skip', 'cards', 'play blue two', 'play blue zero', 'play blue one', 'play blue seven', 'play blue three', 'play blue four', 'play blue five', 'play blue six', 'play green seven', 'play green one', 'play blue +two', 'play blue eight', 'play blue nine', 'play red one', 'play blue reverse', 'play green zero', 'play red seven', 'play green two', 'play red two', 'play green four', 'play green five', 'play green eight', 'play green reverse', 'play green three', 'play green +two', 'play red three', 'play red six', 'play green six', 'play yellow zero', 'play red five', 'play yellow seven', 'play blue skip', 'play red four', 'play green nine', 'play red reverse', 'play red nine', 'play yellow two', 'play red eight', 'play yellow four', 'play red +two', 'play yellow six', 'play yellow one', 'play yellow five', 'play yellow three', 'play yellow reverse', 'play yellow eight', 'play yellow nine', 'play yellow +two', 'play green skip', 'play yellow skip', 'play +four red', 'play +four blue', 'play +four green', 'play +four yellow', 'play red zero', 'play red skip', 'cards' ]

let masks = { B2: 'Blue 2', B0: 'Blue 0', B1: 'Blue 1', B7: 'Blue 7', B3: 'Blue 3', B4: 'Blue 4', B5: 'Blue 5', B6: 'Blue 6', G7: 'Green 7', G1: 'Green 1', BA2: 'Blue +2', B8: 'Blue 8', B9: 'Blue 9', R1: 'Red 1', BR: 'Blue Reverse', G0: 'Green 0', R7: 'Red 7', G2: 'Green 2', R2: 'Red 2', G4: 'Green 4', G5: 'Green 5', G8: 'Green 8', GR: 'Green Reverse', G3: 'Green 3', GA2: 'Green +2', R3: 'Red 3', R6: 'Red 6', G6: 'Green 6', Y0: 'Yellow 0', R5: 'Red 5', Y7: 'Yellow 7', BS: 'Blue Skip', R4: 'Red 4', G9: 'Green 9', RR: 'Red Reverse', R9: 'Red 9', Y2: 'Yellow 2', R8: 'Red 8', Y4: 'Yellow 4', RA2: 'Red +2', Y6: 'Yellow 6', Y1: 'Yellow 1', Y5: 'Yellow 5', Y3: 'Yellow 3', YR: 'Yellow Reverse', Y8: 'Yellow 8', Y9: 'Yellow 9', YA2: 'Yellow +2', GS: 'Green Skip', YS: 'Yellow Skip', WC: 'Wild Card', W4: 'Wild +4', R0: 'Red 0', RS: 'Red Skip' }

let images = { B2: 'https://cdn.discordapp.com/emojis/731183149421428747.png', B0: 'https://cdn.discordapp.com/emojis/731183149446332436.png', B1: 'https://cdn.discordapp.com/emojis/731183149610041384.png', B7: 'https://cdn.discordapp.com/emojis/731183150478262332.png', B3: 'https://cdn.discordapp.com/emojis/731183151929491588.png', B4: 'https://cdn.discordapp.com/emojis/731183151988342925.png', B5: 'https://cdn.discordapp.com/emojis/731183152420356186.png', B6: 'https://cdn.discordapp.com/emojis/731183152713957433.png', G7: 'https://cdn.discordapp.com/emojis/731183153192108043.png', G1: 'https://cdn.discordapp.com/emojis/731183153200496750.png', BA2: 'https://cdn.discordapp.com/emojis/731183153623859341.png', B8: 'https://cdn.discordapp.com/emojis/731183153846419547.png', B9: 'https://cdn.discordapp.com/emojis/731183153980637194.png', R1: 'https://cdn.discordapp.com/emojis/731183154206867497.png', BR: 'https://cdn.discordapp.com/emojis/731183154446205008.png', G0: 'https://cdn.discordapp.com/emojis/731183154668503091.png', R7: 'https://cdn.discordapp.com/emojis/731183154877956156.png', G2: 'https://cdn.discordapp.com/emojis/731183155217825912.png', R2: 'https://cdn.discordapp.com/emojis/731183155851296781.png', G4: 'https://cdn.discordapp.com/emojis/731183155855360130.png', G5: 'https://cdn.discordapp.com/emojis/731183155855491107.png', G8: 'https://cdn.discordapp.com/emojis/731183155935051796.png', GR: 'https://cdn.discordapp.com/emojis/731183155960348674.png', G3: 'https://cdn.discordapp.com/emojis/731183155977126010.png', GA2: 'https://cdn.discordapp.com/emojis/731183156006223953.png', R3: 'https://cdn.discordapp.com/emojis/731183156023263383.png', R6: 'https://cdn.discordapp.com/emojis/731183156060880982.png', G6: 'https://cdn.discordapp.com/emojis/731183156064944180.png', Y0: 'https://cdn.discordapp.com/emojis/731183156127858779.png', R5: 'https://cdn.discordapp.com/emojis/731183156136509572.png', Y7: 'https://cdn.discordapp.com/emojis/731183156148961310.png', BS: 'https://cdn.discordapp.com/emojis/731183156186841088.png', R4: 'https://cdn.discordapp.com/emojis/731183156232978482.png', G9: 'https://cdn.discordapp.com/emojis/731183156241367210.png', RR: 'https://cdn.discordapp.com/emojis/731183156304281601.png', R9: 'https://cdn.discordapp.com/emojis/731183156316602439.png', Y2: 'https://cdn.discordapp.com/emojis/731183156316733581.png', R8: 'https://cdn.discordapp.com/emojis/731183156316864602.png', Y4: 'https://cdn.discordapp.com/emojis/731183156366934087.png', RA2: 'https://cdn.discordapp.com/emojis/731183156392362014.png', Y6: 'https://cdn.discordapp.com/emojis/731183156497088553.png', Y1: 'https://cdn.discordapp.com/emojis/731183156568522792.png', Y5: 'https://cdn.discordapp.com/emojis/731183156627243088.png', Y3: 'https://cdn.discordapp.com/emojis/731183156635369513.png', YR: 'https://cdn.discordapp.com/emojis/731183156656603348.png', Y8: 'https://cdn.discordapp.com/emojis/731183156685701211.png', Y9: 'https://cdn.discordapp.com/emojis/731183156715192401.png', YA2: 'https://cdn.discordapp.com/emojis/731183156736163961.png', GS: 'https://cdn.discordapp.com/emojis/731183156740358175.png', YS: 'https://cdn.discordapp.com/emojis/731183156824113243.png', WC: "https://cdn.discordapp.com/emojis/731183284415103118.png", W4: "https://cdn.discordapp.com/emojis/731183284305789049.png", RS: "https://cdn.discordapp.com/emojis/731183284054130818.png", R0: "https://cdn.discordapp.com/emojis/731183565961691258.png" }

let startCards = [ 'B2', 'B0', 'B1', 'B7', 'B3', 'B4', 'B5', 'B6', 'G7', 'G1', 'B8', 'B9', 'R1', 'G0', 'R7', 'G2', 'R2', 'G4', 'G5', 'G8', 'G3', 'R3', 'R6', 'G6', 'Y0', 'R5', 'Y7', 'R4', 'G9', 'R9', 'Y2', 'R8', 'Y4', 'Y6', 'Y1', 'Y5', 'Y3', 'Y8', 'Y9', 'R0' ]

let reactionMasks = { '<:B2:731183149421428747>': 'B2:731183149421428747', '<:B0:731183149446332436>': 'B0:731183149446332436', '<:B1:731183149610041384>': 'B1:731183149610041384', '<:B7:731183150478262332>': 'B7:731183150478262332', '<:B3:731183151929491588>': 'B3:731183151929491588', '<:B4:731183151988342925>': 'B4:731183151988342925', '<:B5:731183152420356186>': 'B5:731183152420356186', '<:B6:731183152713957433>': 'B6:731183152713957433', '<:G7:731183153192108043>': 'G7:731183153192108043', '<:G1:731183153200496750>': 'G1:731183153200496750', '<:BA2:731183153623859341>': 'BA2:731183153623859341', '<:B8:731183153846419547>': 'B8:731183153846419547', '<:B9:731183153980637194>': 'B9:731183153980637194', '<:R1:731183154206867497>': 'R1:731183154206867497', '<:BR:731183154446205008>': 'BR:731183154446205008', '<:G0:731183154668503091>': 'G0:731183154668503091', '<:R7:731183154877956156>': 'R7:731183154877956156', '<:G2:731183155217825912>': 'G2:731183155217825912', '<:R2:731183155851296781>': 'R2:731183155851296781', '<:G4:731183155855360130>': 'G4:731183155855360130', '<:G5:731183155855491107>': 'G5:731183155855491107', '<:G8:731183155935051796>': 'G8:731183155935051796', '<:GR:731183155960348674>': 'GR:731183155960348674', '<:G3:731183155977126010>': 'G3:731183155977126010', '<:GA2:731183156006223953>': 'GA2:731183156006223953', '<:R3:731183156023263383>': 'R3:731183156023263383', '<:R6:731183156060880982>': 'R6:731183156060880982', '<:G6:731183156064944180>': 'G6:731183156064944180', '<:Y0:731183156127858779>': 'Y0:731183156127858779', '<:R5:731183156136509572>': 'R5:731183156136509572', '<:Y7:731183156148961310>': 'Y7:731183156148961310', '<:BS:731183156186841088>': 'BS:731183156186841088', '<:R4:731183156232978482>': 'R4:731183156232978482', '<:G9:731183156241367210>': 'G9:731183156241367210', '<:RR:731183156304281601>': 'RR:731183156304281601', '<:R9:731183156316602439>': 'R9:731183156316602439', '<:Y2:731183156316733581>': 'Y2:731183156316733581', '<:R8:731183156316864602>': 'R8:731183156316864602', '<:Y4:731183156366934087>': 'Y4:731183156366934087', '<:RA2:731183156392362014>': 'RA2:731183156392362014', '<:Y6:731183156497088553>': 'Y6:731183156497088553', '<:Y1:731183156568522792>': 'Y1:731183156568522792', '<:Y5:731183156627243088>': 'Y5:731183156627243088', '<:Y3:731183156635369513>': 'Y3:731183156635369513', '<:YR:731183156656603348>': 'YR:731183156656603348', '<:Y8:731183156685701211>': 'Y8:731183156685701211', '<:Y9:731183156715192401>': 'Y9:731183156715192401', '<:YA2:731183156736163961>': 'YA2:731183156736163961', '<:GS:731183156740358175>': 'GS:731183156740358175', '<:YS:731183156824113243>': 'YS:731183156824113243', "<:RS:731183284054130818>": ":RS:731183284054130818", "<:R0:731183565961691258>": ":R0:731183565961691258", "<:W4:731183284305789049>": ":W4:731183284305789049", "<:WC:731183284415103118>": ":WC:731183284415103118" }

module.exports = async (bot, message, currentGame, games, prefix, lang) => {
currentGame.decks.length = currentGame.lobby.currentMembers
let deck = [], users = []
currentGame.lobby.members.forEach(m => currentGame.rotation.push(m))

  
if (currentGame.rotation.length === 1) {
  currentGame.rotation.push("CPU")
  for (var m = 0; m < 2; m++) {
  for (var i = 0; i < 6; i++) { 
    var rand = cards[Math.floor(Math.random() * cards.length)];
    deck.push(rand);
  }
  currentGame.decks[m] = deck
  deck = []
 }
let startCard = startCards[Math.floor(Math.random() * startCards.length)];
currentGame.current.card = startCard
currentGame.current.color = masks[startCard].split(" ")[0]
currentGame.current.number = masks[startCard].split(" ")[1]
  
let playableCards = []
currentGame.decks[0].forEach(card => {
 if (card[2] === startCard[0]) playableCards.push({emoji: card, name: masks[cardNames.filter(e => card.includes(e))[0]], react: reactionMasks[card], id: cardID.filter(e => card.includes(e))[0] })
})
  
playableCards.push({emoji: "<:TicTacToe_X:717504662412066909>", name: "Draw Card", react: ":TicTacToe_X:717504662412066909", id: "717504662412066909"})
  currentGame.playableCards[m] = playableCards.map(e => e.id)
const cpuNames = require('../names.js')
let name = cpuNames[Math.floor(Math.random() * cpuNames.length)];
  
currentGame.lobby.members[1] = name
const dmUser = await bot.getDMChannel(currentGame.lobby.members[0])

const embed = new Eris.Embed()
  .color(0x7289DA)
  .title("Uno")
  .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
  .description(`${lang.minigames.uno.description2}\n\n${lang.minigames.uno.playableCards}\n\n${playableCards.map(c => `${c.emoji} - **${c.name}**`).join('\n')}\n\n${lang.minigames.uno.inOrder}\n\n${lang.minigames.uno.currentCard2.replace("[CARD]", `${lang.minigames.uno.colors[currentGame.current.color.toLowerCase()]} ${currentGame.current.number}`)}`)
  .image(images[startCard])
  .footer(lang.minigames.uno.solicited.replace("[USER]", currentGame.lobby.memberUsername[0]))
  dmUser.createMessage({content: currentGame.decks[0].join(" "), embed: embed }).then(msg => {
  playableCards.forEach(card => msg.addReaction(card.react))
  }).catch(err => {

// dmUser.createMessage({content: `${currentGame.decks[0].join(" ")}`, embed: new Eris.Embed().color(0x7289DA).title("Uno").thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(`Try and get rid of all of your cards in this fun game of Uno! Your cards are shown above\n\nHere are the commands (They do not have any prefixes!):\n\n**play [card] [number]** - Lets you play one of your cards\n(ex: play red 4; play +4 blue; play wild green)\n**draw** - Lets you draw a random card\n**say** - Lets you say things to the other players (ex: say Hello!)\n\nType **help** to see the full list of commands\n\n**It's your turn!**\n\n${currentGame.lobby.emojis[0]} **${message.author.username}**'s cards:\n<:Uno_Back:731228742038585455> <:Uno_Back:731228742038585455> <:Uno_Back:731228742038585455> <:Uno_Back:731228742038585455> <:Uno_Back:731228742038585455> <:Uno_Back:731228742038585455>\n<:CPU:723452091376467968> **${currentGame.lobby.members[1]} (CPU)**'s cards:\n<:Uno_Back:731228742038585455> <:Uno_Back:731228742038585455> <:Uno_Back:731228742038585455> <:Uno_Back:731228742038585455> <:Uno_Back:731228742038585455> <:Uno_Back:731228742038585455>\n\nCurrent Card: **(${masks[startCard]})**`).image(images[startCard])}).catch(err => {
      console.log(err)
      message.channel.createMessage({embed: {color: 0x7289DA, description: lang.minigames.general.multipleDMDisabled}})
      if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
      else delete games.get(message.guild.id)[message.author.id]
      return;
    });
return require('./botPlay.js')(bot, dmUser, currentGame, games, prefix, message, lang)
}
  
  let rotation = Math.floor(Math.random() * 3) + 0  
  for (var i = 0; i <= rotation; i++) { 
    let player = currentGame.rotation[0]
    currentGame.rotation.shift()
    currentGame.rotation.push(player)
  }
currentGame.decks[0].push("<:W4:731183284305789049>")

currentGame.lobby.members.forEach(async (member, m) => {
  for (var i = 0; i < 6; i++) { 
    var rand = cards[Math.floor(Math.random() * cards.length)];
    deck.push(rand);
  }
  currentGame.decks[m] = deck
  deck = []
})
  
let startCard = startCards[Math.floor(Math.random() * startCards.length)];
currentGame.current.card = startCard
currentGame.current.color = masks[startCard].split(" ")[0]
currentGame.current.number = masks[startCard].split(" ")[1]
currentGame.current.url = images[startCard]

// for (const m in currentGame.lobby.members) {
currentGame.lobby.members.forEach(async (member, m) => {
  const dmUser = await bot.getDMChannel(member)
  
  let decks = []
  
  currentGame.lobby.memberUsername.forEach((me, i) => {decks.push(`${currentGame.lobby.emojis[i]} ${lang.minigames.uno.cards.replace("[USER]", me)}\n<:Uno_Back:731228742038585455> <:Uno_Back:731228742038585455> <:Uno_Back:731228742038585455> <:Uno_Back:731228742038585455> <:Uno_Back:731228742038585455> <:Uno_Back:731228742038585455>`)})

  let playableCards = []
currentGame.decks[m].forEach(card => {
 if (card[2] === currentGame.current.color[0].toUpperCase() || card[3] === currentGame.current.number || card[2] === "W") playableCards.push({emoji: card, name: masks[cardNames.filter(e => card.includes(e))[0]], react: reactionMasks[card], id: cardID.filter(e => card.includes(e))[0]})
})
  
 if (playableCards.length === 0) playableCards.push({emoji: "<:TicTacToe_X:717504662412066909>", name: "Draw Card", react: ":TicTacToe_X:717504662412066909", id: "717504662412066909"})
  currentGame.playableCards[m] = playableCards.map(e => e.id)
  const embed = new Eris.Embed()
  .color(0x7289DA)
  .title(lang.minigames.uno.gameName)
  .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
  .description(`${lang.minigames.uno.description2}\n\n${lang.minigames.uno.playableCards}\n\n${playableCards.map(c => `${c.emoji} - **${c.name}**`).join('\n')}\n\n${lang.minigames.uno.inOrder}\n\n${lang.minigames.uno.currentCard2.replace("[CARD]", `${lang.minigames.uno.colors[currentGame.current.color.toLowerCase()]} ${currentGame.current.number}`)}`)
  .image(images[startCard])
  .footer(lang.minigames.uno.solicited.replace("[USER]", currentGame.lobby.memberUsername[m]))
  if (currentGame.rotation[0] === member) { 
    dmUser.createMessage({content: currentGame.decks[m].join(" "), embed: embed }).then(msg => {
  // dmUser.createMessage({content: `${currentGame.decks[m].join(" ")}`, embed: new Eris.Embed().color(0x7289DA).title("Uno").thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(`Try and get rid of all of your cards in this fun game of Uno! Your cards are shown above\n\nHere are the commands (They do not have any prefixes!):\n\n**play [card] [number]** - Lets you play one of your cards\n(ex: play red 4; play +4 blue; play wild green)\n**draw** - Lets you draw a random card\n**say** - Lets you say things to the other players (ex: say Hello!)\n\nType **help** to see the full list of commands\n\n${isTurn}\n\n${decks.join('\n')}\n\nCurrent Card: **(${masks[startCard]})**`).image(images[startCard])}).then(msg => {
  playableCards.forEach(card => msg.addReaction(card.react))
  let filter = (me) => me

 
  let collector = new MessageCollector(bot, dmUser, filter, {
  time: 1200000
  });

  users[m] = {username: currentGame.lobby.memberUsername[m], id: member, msg: msg, collector: collector, dm: dmUser}
  
  if (m + 1 === currentGame.lobby.currentMembers) return setTimeout(() => {require('./cardPlay2.js')(bot, users, currentGame, games, prefix, message, lang)}, 2000)
  }).catch(err => {
      console.log(err)
      message.channel.createMessage({embed: {color: 0x7289DA, description: lang.minigames.general.multipleDMDisabled}})
      if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
      else delete games.get(message.guild.id)[message.author.id]
      return;
    });
   } else {
     const notTurn = new Eris.Embed()
     .color(0x7289DA)
     .title(lang.minigames.uno.gameName)
     .description(lang.minigames.uno.sitBack)
     .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
     .footer(lang.minigames.uno.solicited.replace("[USER]", currentGame.lobby.memberUsername[m]))
     dmUser.createMessage({content: currentGame.decks[m].join(" "), embed: notTurn }).then(msg => {
  
  let filter = (me) => me

 
  let collector = new MessageCollector(bot, dmUser, filter, {
  time: 1200000
  });

  users[m] = {username: currentGame.lobby.memberUsername[m], id: member, msg: msg, collector: collector, dm: dmUser}
  
  if (m + 1 === currentGame.lobby.currentMembers) return setTimeout(() => {require('./cardPlay2.js')(bot, users, currentGame, games, prefix, message, lang)}, 2000)
  }).catch(err => {
      console.log(err)
      message.channel.createMessage({embed: {color: 0x7289DA, description: lang.minigames.general.multipleDMDisabled}})
      if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
      else delete games.get(message.guild.id)[message.author.id]
      return;
    });
   }
 })  
  
    let hiddenDecks1 = [], hiddenDecks2 = []
     currentGame.decks.forEach((deck, i) => {
     deck.forEach((d, h) => {
       if (h === 10) return hiddenDecks1.push(lang.minigames.uno.andMore.replace("[CARDS]", `${deck.length - 10}`))
       if (h > 10) return;
       hiddenDecks1.push("<:Uno_Back:731228742038585455>")
     })
     let emoji = currentGame.lobby.emojis[currentGame.lobby.members.indexOf(currentGame.lobby.members[i])]
     let player = ""
     if (currentGame.rotation[0] === currentGame.lobby.members[i]) player = `**(${lang.minigames.uno.playing})**`
     hiddenDecks2.push(`${emoji} ${lang.minigames.uno.cards.replace("[USER]", currentGame.lobby.memberUsername[i])} ${player}\n${hiddenDecks1.join(" ")}`)
     hiddenDecks1 = []
     });
      
  const embed2 = new Eris.Embed()
        .color(0x7289DA)
        .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
        .title(lang.minigames.uno.gameName)
        .description(`${lang.minigames.uno.lobbyMsg}\n\n${hiddenDecks2.join("\n\n")}\n\n${lang.minigames.uno.currentCard2.replace("[CARD]", `${lang.minigames.uno.colors[currentGame.current.color.toLowerCase()]} ${currentGame.current.number}`)}`)
        .image(images[startCard])
        const lobbyMsg = await message.channel.createMessage({content: lang.minigames.uno.yourTurn.replace("[USER]", `<@${currentGame.rotation[0]}>`), embed: embed2})
        currentGame.msgID = lobbyMsg.id
} 
