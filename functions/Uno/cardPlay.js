const Eris = require('eris')
const word = require('words-to-numbers')


let cards = [ '<:B2:731183149421428747>', '<:B0:731183149446332436>', '<:B1:731183149610041384>', '<:B7:731183150478262332>', '<:B3:731183151929491588>', '<:B4:731183151988342925>', '<:B5:731183152420356186>', '<:B6:731183152713957433>', '<:G7:731183153192108043>', '<:G1:731183153200496750>', '<:BA2:731183153623859341>', '<:B8:731183153846419547>', '<:B9:731183153980637194>', '<:R1:731183154206867497>', '<:BR:731183154446205008>', '<:G0:731183154668503091>', '<:R7:731183154877956156>', '<:G2:731183155217825912>', '<:R2:731183155851296781>', '<:G4:731183155855360130>', '<:G5:731183155855491107>', '<:G8:731183155935051796>', '<:GR:731183155960348674>', '<:G3:731183155977126010>', '<:GA2:731183156006223953>', '<:R3:731183156023263383>', '<:R6:731183156060880982>', '<:G6:731183156064944180>', '<:Y0:731183156127858779>', '<:R5:731183156136509572>', '<:Y7:731183156148961310>', '<:BS:731183156186841088>', '<:R4:731183156232978482>', '<:G9:731183156241367210>', '<:RR:731183156304281601>', '<:R9:731183156316602439>', '<:Y2:731183156316733581>', '<:R8:731183156316864602>', '<:Y4:731183156366934087>', '<:RA2:731183156392362014>', '<:Y6:731183156497088553>', '<:Y1:731183156568522792>', '<:Y5:731183156627243088>', '<:Y3:731183156635369513>', '<:YR:731183156656603348>', '<:Y8:731183156685701211>', '<:Y9:731183156715192401>', '<:YA2:731183156736163961>', '<:GS:731183156740358175>', '<:YS:731183156824113243>', '<:WC:731183284415103118>', '<:W4:731183284305789049>', '<:R0:731183565961691258>', '<:RS:731183284054130818>' ]

let cardNames = [ 'B2', 'B0', 'B1', 'B7', 'B3', 'B4', 'B5', 'B6', 'G7', 'G1', 'BA2', 'B8', 'B9', 'R1', 'BR', 'G0', 'R7', 'G2', 'R2', 'G4', 'G5', 'G8', 'GR', 'G3', 'GA2', 'R3', 'R6', 'G6', 'Y0', 'R5', 'Y7', 'BS', 'R4', 'G9', 'RR', 'R9', 'Y2', 'R8', 'Y4', 'RA2', 'Y6', 'Y1', 'Y5', 'Y3', 'YR', 'Y8', 'Y9', 'YA2', 'GS', 'YS' , "WC", "W4", "R0", "RS" ]

let commands = [ 'play blue 2', 'play blue 0', 'play blue 1', 'play blue 7', 'play blue 3', 'play blue 4', 'play blue 5', 'play blue 6', 'play green 7', 'play green 1', 'play blue +2', 'play blue 8', 'play blue 9', 'play red 1', 'play blue reverse', 'play green 0', 'play red 7', 'play green 2', 'play red 2', 'play green 4', 'play green 5', 'play green 8', 'play green reverse', 'play green 3', 'play green +2', 'play red 3', 'play red 6', 'play green 6', 'play yellow 0', 'play red 5', 'play yellow 7', 'play blue skip', 'play red 4', 'play green 9', 'play red reverse', 'play red 9', 'play yellow 2', 'play red 8', 'play yellow 4', 'play red +2', 'play yellow 6', 'play yellow 1', 'play yellow 5', 'play yellow 3', 'play yellow reverse', 'play yellow 8', 'play yellow 9', 'play yellow +2', 'play green skip', 'play yellow skip', 'play wild red', 'play wild blue', 'play wild green', 'play wild yellow', 'play +4 red', 'play +4 blue', 'play +4 green', 'play +4 yellow', 'play red 0', 'play red skip', 'cards', 'play blue two', 'play blue zero', 'play blue one', 'play blue seven', 'play blue three', 'play blue four', 'play blue five', 'play blue six', 'play green seven', 'play green one', 'play blue +two', 'play blue eight', 'play blue nine', 'play red one', 'play blue reverse', 'play green zero', 'play red seven', 'play green two', 'play red two', 'play green four', 'play green five', 'play green eight', 'play green reverse', 'play green three', 'play green +two', 'play red three', 'play red six', 'play green six', 'play yellow zero', 'play red five', 'play yellow seven', 'play blue skip', 'play red four', 'play green nine', 'play red reverse', 'play red nine', 'play yellow two', 'play red eight', 'play yellow four', 'play red +two', 'play yellow six', 'play yellow one', 'play yellow five', 'play yellow three', 'play yellow reverse', 'play yellow eight', 'play yellow nine', 'play yellow +two', 'play green skip', 'play yellow skip', 'play +four red', 'play +four blue', 'play +four green', 'play +four yellow', 'play red zero', 'play red skip', 'cards', 'say', 'draw', 'rotation', 'help', 'commands' ]

let masks = { 'blue 2': 'B2', 'blue 0': 'B0', 'blue 1': 'B1', 'blue 7': 'B7', 'blue 3': 'B3', 'blue 4': 'B4', 'blue 5': 'B5', 'blue 6': 'B6', 'green 7': 'G7', 'green 1': 'G1', 'blue +2': 'BA2', 'blue 8': 'B8', 'blue 9': 'B9', 'red 1': 'R1', 'blue reverse': 'BR', 'green 0': 'G0', 'red 7': 'R7', 'green 2': 'G2', 'red 2': 'R2', 'green 4': 'G4', 'green 5': 'G5', 'green 8': 'G8', 'green reverse': 'GR', 'green 3': 'G3', 'green +2': 'GA2', 'red 3': 'R3', 'red 6': 'R6', 'green 6': 'G6', 'yellow 0': 'Y0', 'red 5': 'R5', 'yellow 7': 'Y7', 'blue skip': 'BS', 'red 4': 'R4', 'green 9': 'G9', 'red reverse': 'RR', 'red 9': 'R9', 'yellow 2': 'Y2', 'red 8': 'R8', 'yellow 4': 'Y4', 'red +2': 'RA2', 'yellow 6': 'Y6', 'yellow 1': 'Y1', 'yellow 5': 'Y5', 'yellow 3': 'Y3', 'yellow reverse': 'YR', 'yellow 8': 'Y8', 'yellow 9': 'Y9', 'yellow +2': 'YA2', 'green skip': 'GS', 'yellow skip': 'YS', 'wild red': 'WC', 'wild blue': "WC", 'wild green': "WC", 'wild yellow': "WC", '+4 red': 'W4', '+4 blue': 'W4', '+4 green': 'W4', '+4 yellow': 'W4', 'red 0': 'R0', 'red skip': 'RS', 'blue two': 'B2', 'blue zero': 'B0', 'blue one': 'B1', 'blue seven': 'B7', 'blue three': 'B3', 'blue four': 'B4', 'blue five': 'B5', 'blue six': 'B6', 'green seven': 'G7', 'green one': 'G1', 'blue +two': 'BA2', 'blue eight': 'B8', 'blue nine': 'B9', 'red one': 'R1', 'green zero': 'G0', 'red seven': 'R7', 'green two': 'G2', 'red two': 'R2', 'green four': 'G4', 'green five': 'G5', 'green eight': 'G8', 'green three': 'G3', 'green +two': 'GA2', 'red three': 'R3', 'red six': 'R6', 'green six': 'G6', 'yellow zero': 'Y0', 'red five': 'R5', 'yellow seven': 'Y7', 'red four': 'R4', 'green nine': 'G9', 'red nine': 'R9', 'yellow two': 'Y2', 'red eight': 'R8', 'yellow four': 'Y4', 'red +two': 'RA2', 'yellow six': 'Y6', 'yellow one': 'Y1', 'yellow five': 'Y5', 'yellow three': 'Y3', 'yellow eight': 'Y8', 'yellow nine': 'Y9', 'yellow +two': 'YA2', '+four red': 'W4', '+four blue': "W4", '+four green': "W4", "+four yellow": "W4", 'red zero': 'R0' }

let masks2 = { B2: 'Blue 2', B0: 'Blue 0', B1: 'Blue 1', B7: 'Blue 7', B3: 'Blue 3', B4: 'Blue 4', B5: 'Blue 5', B6: 'Blue 6', G7: 'Green 7', G1: 'Green 1', BA2: 'Blue +2', B8: 'Blue 8', B9: 'Blue 9', R1: 'Red 1', BR: 'Blue Reverse', G0: 'Green 0', R7: 'Red 7', G2: 'Green 2', R2: 'Red 2', G4: 'Green 4', G5: 'Green 5', G8: 'Green 8', GR: 'Green Reverse', G3: 'Green 3', GA2: 'Green +2', R3: 'Red 3', R6: 'Red 6', G6: 'Green 6', Y0: 'Yellow 0', R5: 'Red 5', Y7: 'Yellow 7', BS: 'Blue Skip', R4: 'Red 4', G9: 'Green 9', RR: 'Red Reverse', R9: 'Red 9', Y2: 'Yellow 2', R8: 'Red 8', Y4: 'Yellow 4', RA2: 'Red +2', Y6: 'Yellow 6', Y1: 'Yellow 1', Y5: 'Yellow 5', Y3: 'Yellow 3', YR: 'Yellow Reverse', Y8: 'Yellow 8', Y9: 'Yellow 9', YA2: 'Yellow +2', GS: 'Green Skip', YS: 'Yellow Skip', WC: 'Wild Card', W4: 'Wild +4', R0: 'Red 0', RS: 'Red Skip' }

let images = { B2: 'https://cdn.discordapp.com/emojis/731183149421428747.png', B0: 'https://cdn.discordapp.com/emojis/731183149446332436.png', B1: 'https://cdn.discordapp.com/emojis/731183149610041384.png', B7: 'https://cdn.discordapp.com/emojis/731183150478262332.png', B3: 'https://cdn.discordapp.com/emojis/731183151929491588.png', B4: 'https://cdn.discordapp.com/emojis/731183151988342925.png', B5: 'https://cdn.discordapp.com/emojis/731183152420356186.png', B6: 'https://cdn.discordapp.com/emojis/731183152713957433.png', G7: 'https://cdn.discordapp.com/emojis/731183153192108043.png', G1: 'https://cdn.discordapp.com/emojis/731183153200496750.png', BA2: 'https://cdn.discordapp.com/emojis/731183153623859341.png', B8: 'https://cdn.discordapp.com/emojis/731183153846419547.png', B9: 'https://cdn.discordapp.com/emojis/731183153980637194.png', R1: 'https://cdn.discordapp.com/emojis/731183154206867497.png', BR: 'https://cdn.discordapp.com/emojis/731183154446205008.png', G0: 'https://cdn.discordapp.com/emojis/731183154668503091.png', R7: 'https://cdn.discordapp.com/emojis/731183154877956156.png', G2: 'https://cdn.discordapp.com/emojis/731183155217825912.png', R2: 'https://cdn.discordapp.com/emojis/731183155851296781.png', G4: 'https://cdn.discordapp.com/emojis/731183155855360130.png', G5: 'https://cdn.discordapp.com/emojis/731183155855491107.png', G8: 'https://cdn.discordapp.com/emojis/731183155935051796.png', GR: 'https://cdn.discordapp.com/emojis/731183155960348674.png', G3: 'https://cdn.discordapp.com/emojis/731183155977126010.png', GA2: 'https://cdn.discordapp.com/emojis/731183156006223953.png', R3: 'https://cdn.discordapp.com/emojis/731183156023263383.png', R6: 'https://cdn.discordapp.com/emojis/731183156060880982.png', G6: 'https://cdn.discordapp.com/emojis/731183156064944180.png', Y0: 'https://cdn.discordapp.com/emojis/731183156127858779.png', R5: 'https://cdn.discordapp.com/emojis/731183156136509572.png', Y7: 'https://cdn.discordapp.com/emojis/731183156148961310.png', BS: 'https://cdn.discordapp.com/emojis/731183156186841088.png', R4: 'https://cdn.discordapp.com/emojis/731183156232978482.png', G9: 'https://cdn.discordapp.com/emojis/731183156241367210.png', RR: 'https://cdn.discordapp.com/emojis/731183156304281601.png', R9: 'https://cdn.discordapp.com/emojis/731183156316602439.png', Y2: 'https://cdn.discordapp.com/emojis/731183156316733581.png', R8: 'https://cdn.discordapp.com/emojis/731183156316864602.png', Y4: 'https://cdn.discordapp.com/emojis/731183156366934087.png', RA2: 'https://cdn.discordapp.com/emojis/731183156392362014.png', Y6: 'https://cdn.discordapp.com/emojis/731183156497088553.png', Y1: 'https://cdn.discordapp.com/emojis/731183156568522792.png', Y5: 'https://cdn.discordapp.com/emojis/731183156627243088.png', Y3: 'https://cdn.discordapp.com/emojis/731183156635369513.png', YR: 'https://cdn.discordapp.com/emojis/731183156656603348.png', Y8: 'https://cdn.discordapp.com/emojis/731183156685701211.png', Y9: 'https://cdn.discordapp.com/emojis/731183156715192401.png', YA2: 'https://cdn.discordapp.com/emojis/731183156736163961.png', GS: 'https://cdn.discordapp.com/emojis/731183156740358175.png', YS: 'https://cdn.discordapp.com/emojis/731183156824113243.png', WC: "https://cdn.discordapp.com/emojis/731183284415103118.png", W4: "https://cdn.discordapp.com/emojis/731183284305789049.png", RS: "https://cdn.discordapp.com/emojis/731183284054130818.png", R0: "https://cdn.discordapp.com/emojis/731183565961691258.png" }

let startCards = [ 'B2', 'B0', 'B1', 'B7', 'B3', 'B4', 'B5', 'B6', 'G7', 'G1', 'B8', 'B9', 'R1', 'G0', 'R7', 'G2', 'R2', 'G4', 'G5', 'G8', 'G3', 'R3', 'R6', 'G6', 'Y0', 'R5', 'Y7', 'R4', 'G9', 'R9', 'Y2', 'R8', 'Y4', 'Y6', 'Y1', 'Y5', 'Y3', 'Y8', 'Y9', 'R0' ]


module.exports = (bot, users, currentGame, games, prefix, message) => {
  console.log(users.map(u => u.username))
  function createEmbed(embed) {users.forEach(u => u.dm.createEmbed(embed))}
  function errorEmbed(description, c) {c.createEmbed(new Eris.Embed().color(0x7289DA).description(description)).then(msg => {
    setTimeout(() => {msg.delete()}, 3000)
  })
}
  users.forEach((u, l) => {
    const cooldown = new Set();
   let collector = u.collector
   
   collector.on("collect", (m) => {  
   if (!games.get(message.guild.id) || !games.get(message.guild.id)[message.author.id]) {
     return collector.stop()
   }
   if (m.author.bot) return;
     
  if (m.content.toLowerCase().startsWith("say")) {
     if (!m.content) return;
     if (!m.content.split(" ")[1]) return errorEmbed("You need to provide what to say!\nThe proper use of this command is `say [arguments]`")
     createEmbed(new Eris.Embed().color(0x7289DA).author(`${u.username} says:`, `${bot.users.get(u.id).avatarURL}`).description(m.content.split(" ").slice(1).join(" ")))
    return
   }
  
   if (commands.filter(c => c === m.content.toLowerCase()).length === 0) return errorEmbed("That is not a valid command, if you do not know how to play your card, send `cards` (No Prefix)", m.channel)
   if (currentGame.misc.allowedToPlay === false) return;
   let ranCommand = commands.filter(c => c === m.content.toLowerCase())[0].split(" ")
   
   
   if (ranCommand[0] === "cards") {
     let displayCards = []
     currentGame.decks[l].forEach((c, i) => {
       if (i === 13) return displayCards.push(`... *and ${currentGame.decks[l].length - 13} more...*`)
       if (i >= 14) return;
       
       let card = c.split("").slice(2).slice(0, 2).join("")
       if (c.includes("A2")) card = c.split("").slice(2).slice(0, 3).join("")
       let actualCard = masks2[card]
       
       let playInstructions = ""
       if (actualCard === "Wild +4") playInstructions = "+4 [red | blue | green | yellow]"
       else if (actualCard === "Wild Card") playInstructions = "wild [red | green | blue | yellow]"
       else playInstructions = actualCard.toLowerCase()
       displayCards.push(`${c} ${actualCard} (play ${playInstructions})`)
     })
     return u.dm.createEmbed(new Eris.Embed().title("Your Cards").color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(`${displayCards.join("\n")}`))
   }
  
  if (ranCommand[0] === "help") {
    return u.dm.createEmbed(new Eris.Embed().title("Help").color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description("`play` - Lets you play a card\n`draw` - Lets you draw a card\n\n`help` - Sends this command\n`rotation` - Lists the current rotation\n`cards` - Lists your cards\n`say` - Lets you say stuff to the other players").footer("Remember, these commands have no prefix!"))
  }
   
   if (ranCommand[0] === "rotation") {
     let list = []
     currentGame.rotation.forEach((member, i) => {
       let userIndex = currentGame.lobby.members.indexOf(member)
       list.push(`${i + 1}. ${currentGame.lobby.emojis[userIndex]} **${bot.users.get(member).username}**`)
     })
     return u.dm.createEmbed(new Eris.Embed().title("Rotation").color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(list.join("\n")))
   }
     
   if (currentGame.rotation[0] !== m.author.id) return errorEmbed("It is not your turn yet!", m.channel)
     
   if (ranCommand[0] === "draw") {
    if (currentGame.decks[l].length >= 20) {
      createEmbed(new Eris.Embed().color(0x7289DA).description(`**${u.username}** tried to draw a card, but they have too many cards, so their turn will be skipped`))
    let moveOn = currentGame.rotation[0]
     currentGame.rotation.shift()
     currentGame.rotation.push(moveOn)
     currentGame.misc.allowedToPlay = false
    return setTimeout(() => {playCard("Draw", ranCommand, "Draw", l, collector)}, 2000)  
    }
    var rand = cards[Math.floor(Math.random() * cards.length)];
    currentGame.decks[l].push(rand)
    
    let actualCard = rand.split("").slice(2).slice(0, 2).join("")
    if (rand.includes("A2")) actualCard = rand.split("").slice(2).slice(0, 3).join("")
     
    let wordedCard = masks2[actualCard]
    users.forEach(usr => {
      if (usr.id !== u.id) usr.dm.createEmbed(new Eris.Embed().color(0x7289DA).description(`**${u.username}** drew a card!`))
    });
    u.dm.createEmbed(new Eris.Embed().color(0x7289DA).description(`You drew a **${wordedCard}**`))
    let moveOn = currentGame.rotation[0]
     currentGame.rotation.shift()
     currentGame.rotation.push(moveOn)
     currentGame.misc.allowedToPlay = false
    return setTimeout(() => {playCard("Draw", ranCommand, "Draw", l)}, 2000)  
   }
   ranCommand = ranCommand.slice(1, 3)
   ranCommand[1] = word.wordsToNumbers(ranCommand[1])
   
   const cardPlayed = masks[ranCommand.join(" ")]
   let deck = currentGame.decks[l]
   let index = deck.indexOf(deck.filter(c => c.includes(cardPlayed))[0])
   
   if (index === -1) return errorEmbed("You do not have that card, to see your cards, send `cards` (No Prefix)", m.channel)
     
   if (ranCommand[0] === "wild") {
     switch (ranCommand[1].toLowerCase()) {
        case "red":
        ranCommand[1] = "Red"
        break;
        case "blue":
        ranCommand[1] = "Blue"
        break;
        case "green":
        ranCommand[1] = "Green"
        break;
        case "yellow":
        ranCommand[1] = "Yellow"
        break;
      }
     
     createEmbed(new Eris.Embed().color(0x7289DA).description(`**${m.author.tag}** has played a Wild Card and picked ${ranCommand[1]}`))
     let moveOn = currentGame.rotation[0]
     currentGame.rotation.shift()
     currentGame.rotation.push(moveOn)
     currentGame.misc.allowedToPlay = false
     return setTimeout(() => {playCard(cardPlayed, ranCommand, index, l, collector)}, 2000)
   }
     
    if (ranCommand[0] === "+4") {
      
      switch (ranCommand[1].toLowerCase()) {
        case "red":
        ranCommand[1] = "Red"
        break;
        case "blue":
        ranCommand[1] = "Blue"
        break;
        case "green":
        ranCommand[1] = "Green"
        break;
        case "yellow":
        ranCommand[1] = "Yellow"
        break;
      }
      
     let affected = currentGame.rotation[1]
     let index2 = currentGame.lobby.members.indexOf(affected)
      
    if (currentGame.decks[index2].length >= 20) {
      createEmbed(new Eris.Embed().color(0x7289DA).description(`**${u.username}** tried to do a +4, but **${currentGame.lobby.memberUsername[index2]}**, so their turn will be skipped`))
    let moveOn = currentGame.rotation[0]
     currentGame.rotation.shift()
     currentGame.rotation.push(moveOn)
    currentGame.misc.allowedToPlay = false
    return setTimeout(() => {playCard("Draw", ranCommand, "Draw", l, collector)}, 2000)  
    }
     let addedCards = []
     
    for (var i = 0; i < 4; i++) { 
    var rand = cards[Math.floor(Math.random() * cards.length)];
    addedCards.push(rand);
    currentGame.decks[index2].push(rand)
    }
      
    let newCardNames = []
    
    addedCards.forEach((c, c2) => {
    let r = cardNames.filter(cr => c.includes(cr))[0]
    if (c2 === 3) return newCardNames.push(`and ${masks2[r]}`)
    newCardNames.push(masks2[r])
    })
      
     createEmbed(new Eris.Embed().color(0x7289DA).description(`**${m.author.tag}** has played a Wild +4 and has picked **${ranCommand[1]}**, **${currentGame.lobby.memberUsername[index2]}** has to draw 4 cards!`))
     users.filter(u => u.id === currentGame.lobby.members[index2])[0].dm.createMessage({embed: new Eris.Embed().color(0x7289DA).description(`You have drawed ${newCardNames.join(", ")}`)})
     
     let moveOn = currentGame.rotation[0]
     currentGame.rotation.shift()
     currentGame.rotation.shift()
     currentGame.rotation.push(moveOn)
     currentGame.rotation.push(affected)
     currentGame.misc.allowedToPlay = false
     return setTimeout(() => {playCard(cardPlayed, ranCommand, index, l, collector)}, 2000)
   }
    
     
   if (ranCommand[0] !== currentGame.current.color.toLowerCase() && ranCommand[1] !== currentGame.current.number) return errorEmbed("You cannot play that card right now", m.channel)
   if (ranCommand[1] === "skip") {
     switch (ranCommand[0].toLowerCase()) {
        case "red":
        ranCommand[0] = "Red"
        break;
        case "blue":
        ranCommand[0] = "Blue"
        break;
        case "green":
        ranCommand[0] = "Green"
        break;
        case "yellow":
        ranCommand[0] = "Yellow"
        break;
      }
     createEmbed(new Eris.Embed().color(0x7289DA).description(`**${u.username}** played a **${ranCommand[0]} Skip**!, **${bot.users.get(currentGame.rotation[1]).username}** has been skipped!`))
     let moveOn = currentGame.rotation[0]
     currentGame.rotation.shift()
     currentGame.rotation.push(moveOn)
     
     let playerToSkip = currentGame.rotation[0]
      currentGame.rotation.shift()
      currentGame.rotation.push(playerToSkip)
     currentGame.misc.allowedToPlay = false
    return setTimeout(() => {playCard(cardPlayed, ranCommand, index, l, collector)}, 2000)
   }
    if (ranCommand[1] === "reverse") {
      switch (ranCommand[0].toLowerCase()) {
        case "red":
        ranCommand[0] = "Red"
        break;
        case "blue":
        ranCommand[0] = "Blue"
        break;
        case "green":
        ranCommand[0] = "Green"
        break;
        case "yellow":
        ranCommand[0] = "Yellow"
        break;
      }
     createEmbed(new Eris.Embed().color(0x7289DA).description(`**${u.username}** played a **${ranCommand[0]} Reverse**!, The playing has been reversed`))
     currentGame.rotation.reverse()
      currentGame.misc.allowedToPlay = false
      return setTimeout(() => {playCard(cardPlayed, ranCommand, index, l, collector)}, 2000)
    }
    
    if (ranCommand[1] === "+2") {
      let affected = currentGame.rotation[1]
     let index2 = currentGame.lobby.members.indexOf(affected)
      if (currentGame.decks[index2].length >= 20) {
      createEmbed(new Eris.Embed().color(0x7289DA).description(`**${u.username}** tried to do a +2, but **${currentGame.lobby.memberUsername[index2]}**, so their turn will be skipped`))
    let moveOn = currentGame.rotation[0]
     currentGame.rotation.shift()
     currentGame.rotation.push(moveOn)
    currentGame.misc.allowedToPlay = false
    return setTimeout(() => {playCard("Draw", ranCommand, "Draw", l, collector)}, 2000)  
    }
      switch (ranCommand[0].toLowerCase()) {
        case "red":
        ranCommand[0] = "Red"
        break;
        case "blue":
        ranCommand[0] = "Blue"
        break;
        case "green":
        ranCommand[0] = "Green"
        break;
        case "yellow":
        ranCommand[0] = "Yellow"
        break;
      }
    
     let addedCards = []
     
    for (var i = 0; i < 2; i++) { 
    var rand = cards[Math.floor(Math.random() * cards.length)];
    addedCards.push(rand);
    currentGame.decks[index2].push(rand)
    }
      
    let newCardNames = []
    
    addedCards.forEach((c, c2) => {
    let r = cardNames.filter(cr => c.includes(cr))[0]
    if (c2 === 1) return newCardNames.push(`and ${masks2[r]}`)
    newCardNames.push(masks2[r])
    })
   createEmbed(new Eris.Embed().color(0x7289DA).description(`**${u.username}** played a **${ranCommand[0]} +2**!, **${bot.users.get(currentGame.rotation[1]).username}** has to draw 2 cards!`))
   users.filter(u => u.id === currentGame.lobby.members[index2])[0].dm.createMessage({embed: new Eris.Embed().color(0x7289DA).description(`You have drawed ${newCardNames.join(", ")}`)})
     
     let moveOn = currentGame.rotation[0]
     currentGame.rotation.shift()
     currentGame.rotation.shift()
     currentGame.rotation.push(moveOn)
     currentGame.rotation.push(affected)
     currentGame.misc.allowedToPlay = false
   return setTimeout(() => {playCard(cardPlayed, ranCommand, index, l, collector)}, 2000)  
    }
  
     
     switch (ranCommand[0].toLowerCase()) {
        case "red":
        ranCommand[0] = "Red"
        break;
        case "blue":
        ranCommand[0] = "Blue"
        break;
        case "green":
        ranCommand[0] = "Green"
        break;
        case "yellow":
        ranCommand[0] = "Yellow"
        break;
      }
    createEmbed(new Eris.Embed().color(0x7289DA).description(`**${bot.users.get(currentGame.rotation[0]).username}** played a **${ranCommand[0]} ${ranCommand[1]}**`))
     let moveOn = currentGame.rotation[0]
     currentGame.rotation.shift()
     currentGame.rotation.push(moveOn)
    return setTimeout(() => {playCard(cardPlayed, ranCommand, index, l, collector)}, 2000)
   });
    
  collector.on('end', () => {
    if (!games.get(message.guild.id) || !games.get(message.guild.id)[message.author.id]) return;
     u.dm.createEmbed(new Eris.Embed().color(0x7289DA).description("The game has ended because the game has taken longer than **20 Minutes**"))
     if (l - 1 !== currentGame.lobby.currentMembers) return;
     if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
     else delete games.get(message.guild.id)[message.author.id]
     return;
  }) 
  })
  
  
  
  function playCard(cardPlayed, ranCommand, index, l, collector) {
    if (!games.get(message.guild.id)[message.author.id]) return collector.stop()
    if (ranCommand[0] === "wild") {
      ranCommand[0] = ranCommand[1]
      ranCommand[1] = "Wild"
    }
    
    if (ranCommand[0] === "+4") {
      ranCommand[0] = ranCommand[1]
      ranCommand[1] = "+4"
    }
    if (cardPlayed !== "Draw")  {
    currentGame.current.card = cardPlayed
   currentGame.current.color = ranCommand[0]
   currentGame.current.number = ranCommand[1]

   currentGame.decks[l].splice(index, 1)
  }
    let continueNumber = 0
    currentGame.decks.forEach(deck => {
      if (deck.length === 0 ) {
      continueNumber = 1
      return endGame()
      }
    })
    if (continueNumber === 1) return;
    
  
    
    let hiddenDecks1 = [], hiddenDecks2 = []
   currentGame.decks.forEach((deck, i) => {
     deck.forEach((d, h) => {
       if (h === 10) return hiddenDecks1.push(`... *and ${deck.length - 10} more*`)
       if (h > 10) return;
       hiddenDecks1.push("<:Uno_Back:731228742038585455>")
     })
     let emoji = currentGame.lobby.emojis[currentGame.lobby.members.indexOf(currentGame.lobby.members[i])]
     hiddenDecks2.push(`${emoji} **${bot.users.get(currentGame.lobby.members[i]).username}**'s cards:\n${hiddenDecks1.join(" ")}`)
     hiddenDecks1 = []
   })
  let whosTurn = ''
  users.forEach((u, i) => {
    if (u.id === currentGame.rotation[0]) whosTurn = "It's your turn!"
    else whosTurn = `It is **${bot.users.get(currentGame.rotation[0]).username}'s** turn... Please wait... <a:Loading:712097176313921548>`

    let currentCard = masks2[currentGame.current.card]
    if (currentGame.current.number === "Wild") currentCard = `Wild ${currentGame.current.color}`
    if (currentGame.current.number === "+4") currentCard = `Wild +4 ${currentGame.current.color}`
    u.dm.createMessage({content: `${currentGame.decks[i].join(" ")}`, embed: new Eris.Embed().color(0x7289DA).title("Uno").thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(`${whosTurn}\n\n${hiddenDecks2.join("\n\n")}\n\nCurrent Card **(${masks2[currentGame.current.card]})**:`).image(images[currentGame.current.card]).footer("Forgot the commands? type \"help\" to see the commands (No Prefix!)")})
  })
  currentGame.misc.allowedToPlay = true
  }
  function endGame() {
    currentGame.misc.allowedToPlay = false
    const end = new Eris.Embed()
    .color(0x7289DA)
    .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
    .title("Game Over")
    
    let cards = []
    currentGame.lobby.memberUsername.forEach((member, i) => {

       if (currentGame.decks[i].length === 0) return cards.push(`${currentGame.lobby.emojis[i]} ${member}'s Cards - **Empty (Winner!)**`)
       else cards.push(`${currentGame.lobby.emojis[i]} ${member}'s Cards - ${currentGame.decks[i].join(" ")}`)
    })
    end.description = cards.join('\n')
    currentGame.decks.forEach((deck, i) => {
      currentGame.decks[i] = {deck: deck, id: currentGame.lobby.members[i], user: currentGame.lobby.memberUsername[i]}
    })
    currentGame.decks.sort(function (a, b) { return a.deck.length - b.deck.length });
    let addTokens = []
    let size = currentGame.lobby.currentMembers
    if (size === 2) addTokens = [80, 30]
    else if (size === 3) addTokens = [110, 60, 30]
    else if (size === 4) addTokens = [160, 90, 60, 30]
    currentGame.decks.forEach((deck, i) => {
      if (i === 0)  end.field(`🏆 **${deck.user}** - (+${addTokens[i]} Tokens)`, `\u200b`)
      if (i === 1) end.field(`🥈 **${deck.user}** - (+${addTokens[i]} Tokens)`, `\u200b`)
      if (i === 2) end.field(`🥉 **${deck.user}** - (+${addTokens[i]} Tokens)`, `\u200b`)
      if (i === 3) end.field(`💢 **${deck.user}** - (+${addTokens[i]} Tokens)`, `\u200b`)
      
    })
    createEmbed(end)
    currentGame.decks.forEach((deck, i) => {
    require('../../models/user.js').findOne({id: deck.id}, (err, res) => {
      let wins;
      if (i === 0) wins = 1
      else wins = 0
      
      if (!res) require('../createProfile.js')(bot, deck.id, deck.user, addTokens[i], {connect4: 0, quiz: 0, rps: 0, ttt: 0, uno: wins}, {connect4: 0, hangman: 0, matchup: 0, quiz: 0, rps: 0, ttt: 0, uno: 1}, [{players: currentGame.lobby.memberUsername, cards: deck.deck, game: "Uno"}], "Uno")
      else if (res) require('../addTokens.js')(deck.id, res, addTokens[i], wins, {players: currentGame.lobby.memberUsername, cards: deck.deck, game: "Uno"}, "uno")
    });
    });
  if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
  else delete games.get(message.guild.id)[message.author.id]
  users.forEach(u => u.collector.stop())
  }
}