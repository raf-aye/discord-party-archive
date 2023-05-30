const Eris = require('eris')
const word = require('words-to-numbers')
const { ReactionCollector, MessageCollector } = require("eris-collector");


let cards = [ '<:B2:731183149421428747>', '<:B0:731183149446332436>', '<:B1:731183149610041384>', '<:B7:731183150478262332>', '<:B3:731183151929491588>', '<:B4:731183151988342925>', '<:B5:731183152420356186>', '<:B6:731183152713957433>', '<:G7:731183153192108043>', '<:G1:731183153200496750>', '<:BA2:731183153623859341>', '<:B8:731183153846419547>', '<:B9:731183153980637194>', '<:R1:731183154206867497>', '<:BR:731183154446205008>', '<:G0:731183154668503091>', '<:R7:731183154877956156>', '<:G2:731183155217825912>', '<:R2:731183155851296781>', '<:G4:731183155855360130>', '<:G5:731183155855491107>', '<:G8:731183155935051796>', '<:GR:731183155960348674>', '<:G3:731183155977126010>', '<:GA2:731183156006223953>', '<:R3:731183156023263383>', '<:R6:731183156060880982>', '<:G6:731183156064944180>', '<:Y0:731183156127858779>', '<:R5:731183156136509572>', '<:Y7:731183156148961310>', '<:BS:731183156186841088>', '<:R4:731183156232978482>', '<:G9:731183156241367210>', '<:RR:731183156304281601>', '<:R9:731183156316602439>', '<:Y2:731183156316733581>', '<:R8:731183156316864602>', '<:Y4:731183156366934087>', '<:RA2:731183156392362014>', '<:Y6:731183156497088553>', '<:Y1:731183156568522792>', '<:Y5:731183156627243088>', '<:Y3:731183156635369513>', '<:YR:731183156656603348>', '<:Y8:731183156685701211>', '<:Y9:731183156715192401>', '<:YA2:731183156736163961>', '<:GS:731183156740358175>', '<:YS:731183156824113243>', '<:WC:731183284415103118>', '<:W4:731183284305789049>', '<:R0:731183565961691258>', '<:RS:731183284054130818>' ]

let cardID = [ '731183149421428747', '731183149446332436', '731183149610041384', '731183150478262332', '731183151929491588', '731183151988342925', '731183152420356186', '731183152713957433', '731183153192108043', '731183153200496750', '731183153623859341', '731183153846419547', '731183153980637194', '731183154206867497', '731183154446205008', '731183154668503091', '731183154877956156', '731183155217825912', '731183155851296781', '731183155855360130', '731183155855491107', '731183155935051796', '731183155960348674', '731183155977126010', '731183156006223953', '731183156023263383', '731183156060880982', '731183156064944180', '731183156127858779', '731183156136509572', '731183156148961310', '731183156186841088', '731183156232978482', '731183156241367210', '731183156304281601', '731183156316602439', '731183156316733581', '731183156316864602', '731183156366934087', '731183156392362014', '731183156497088553', '731183156568522792', '731183156627243088', '731183156635369513', '731183156656603348', '731183156685701211', '731183156715192401', '731183156736163961', '731183156740358175', '731183156824113243', '731183284305789049', '731183284415103118', '731183565961691258', '731183284054130818', '717504662412066909' ]

let cardNames = [ 'B2', 'B0', 'B1', 'B7', 'B3', 'B4', 'B5', 'B6', 'G7', 'G1', 'BA2', 'B8', 'B9', 'R1', 'BR', 'G0', 'R7', 'G2', 'R2', 'G4', 'G5', 'G8', 'GR', 'G3', 'GA2', 'R3', 'R6', 'G6', 'Y0', 'R5', 'Y7', 'BS', 'R4', 'G9', 'RR', 'R9', 'Y2', 'R8', 'Y4', 'RA2', 'Y6', 'Y1', 'Y5', 'Y3', 'YR', 'Y8', 'Y9', 'YA2', 'GS', 'YS' , "WC", "W4", "R0", "RS", "TicTacToe_X" ]

let commands = [ 'play blue 2', 'play blue 0', 'play blue 1', 'play blue 7', 'play blue 3', 'play blue 4', 'play blue 5', 'play blue 6', 'play green 7', 'play green 1', 'play blue +2', 'play blue 8', 'play blue 9', 'play red 1', 'play blue reverse', 'play green 0', 'play red 7', 'play green 2', 'play red 2', 'play green 4', 'play green 5', 'play green 8', 'play green reverse', 'play green 3', 'play green +2', 'play red 3', 'play red 6', 'play green 6', 'play yellow 0', 'play red 5', 'play yellow 7', 'play blue skip', 'play red 4', 'play green 9', 'play red reverse', 'play red 9', 'play yellow 2', 'play red 8', 'play yellow 4', 'play red +2', 'play yellow 6', 'play yellow 1', 'play yellow 5', 'play yellow 3', 'play yellow reverse', 'play yellow 8', 'play yellow 9', 'play yellow +2', 'play green skip', 'play yellow skip', 'play wild red', 'play wild blue', 'play wild green', 'play wild yellow', 'play +4 red', 'play +4 blue', 'play +4 green', 'play +4 yellow', 'play red 0', 'play red skip', 'cards', 'play blue two', 'play blue zero', 'play blue one', 'play blue seven', 'play blue three', 'play blue four', 'play blue five', 'play blue six', 'play green seven', 'play green one', 'play blue +two', 'play blue eight', 'play blue nine', 'play red one', 'play blue reverse', 'play green zero', 'play red seven', 'play green two', 'play red two', 'play green four', 'play green five', 'play green eight', 'play green reverse', 'play green three', 'play green +two', 'play red three', 'play red six', 'play green six', 'play yellow zero', 'play red five', 'play yellow seven', 'play blue skip', 'play red four', 'play green nine', 'play red reverse', 'play red nine', 'play yellow two', 'play red eight', 'play yellow four', 'play red +two', 'play yellow six', 'play yellow one', 'play yellow five', 'play yellow three', 'play yellow reverse', 'play yellow eight', 'play yellow nine', 'play yellow +two', 'play green skip', 'play yellow skip', 'play +four red', 'play +four blue', 'play +four green', 'play +four yellow', 'play red zero', 'play red skip', 'cards', 'say', 'draw', 'rotation', 'help', 'commands' ]

let masks = { 'blue 2': 'B2', 'blue 0': 'B0', 'blue 1': 'B1', 'blue 7': 'B7', 'blue 3': 'B3', 'blue 4': 'B4', 'blue 5': 'B5', 'blue 6': 'B6', 'green 7': 'G7', 'green 1': 'G1', 'blue +2': 'BA2', 'blue 8': 'B8', 'blue 9': 'B9', 'red 1': 'R1', 'blue reverse': 'BR', 'green 0': 'G0', 'red 7': 'R7', 'green 2': 'G2', 'red 2': 'R2', 'green 4': 'G4', 'green 5': 'G5', 'green 8': 'G8', 'green reverse': 'GR', 'green 3': 'G3', 'green +2': 'GA2', 'red 3': 'R3', 'red 6': 'R6', 'green 6': 'G6', 'yellow 0': 'Y0', 'red 5': 'R5', 'yellow 7': 'Y7', 'blue skip': 'BS', 'red 4': 'R4', 'green 9': 'G9', 'red reverse': 'RR', 'red 9': 'R9', 'yellow 2': 'Y2', 'red 8': 'R8', 'yellow 4': 'Y4', 'red +2': 'RA2', 'yellow 6': 'Y6', 'yellow 1': 'Y1', 'yellow 5': 'Y5', 'yellow 3': 'Y3', 'yellow reverse': 'YR', 'yellow 8': 'Y8', 'yellow 9': 'Y9', 'yellow +2': 'YA2', 'green skip': 'GS', 'yellow skip': 'YS', 'wild red': 'WC', 'wild blue': "WC", 'wild green': "WC", 'wild yellow': "WC", '+4 red': 'W4', '+4 blue': 'W4', '+4 green': 'W4', '+4 yellow': 'W4', 'red 0': 'R0', 'red skip': 'RS', 'blue two': 'B2', 'blue zero': 'B0', 'blue one': 'B1', 'blue seven': 'B7', 'blue three': 'B3', 'blue four': 'B4', 'blue five': 'B5', 'blue six': 'B6', 'green seven': 'G7', 'green one': 'G1', 'blue +two': 'BA2', 'blue eight': 'B8', 'blue nine': 'B9', 'red one': 'R1', 'green zero': 'G0', 'red seven': 'R7', 'green two': 'G2', 'red two': 'R2', 'green four': 'G4', 'green five': 'G5', 'green eight': 'G8', 'green three': 'G3', 'green +two': 'GA2', 'red three': 'R3', 'red six': 'R6', 'green six': 'G6', 'yellow zero': 'Y0', 'red five': 'R5', 'yellow seven': 'Y7', 'red four': 'R4', 'green nine': 'G9', 'red nine': 'R9', 'yellow two': 'Y2', 'red eight': 'R8', 'yellow four': 'Y4', 'red +two': 'RA2', 'yellow six': 'Y6', 'yellow one': 'Y1', 'yellow five': 'Y5', 'yellow three': 'Y3', 'yellow eight': 'Y8', 'yellow nine': 'Y9', 'yellow +two': 'YA2', '+four red': 'W4', '+four blue': "W4", '+four green': "W4", "+four yellow": "W4", 'red zero': 'R0' }

let masks2 = { B2: 'Blue 2', B0: 'Blue 0', B1: 'Blue 1', B7: 'Blue 7', B3: 'Blue 3', B4: 'Blue 4', B5: 'Blue 5', B6: 'Blue 6', G7: 'Green 7', G1: 'Green 1', BA2: 'Blue +2', B8: 'Blue 8', B9: 'Blue 9', R1: 'Red 1', BR: 'Blue Reverse', G0: 'Green 0', R7: 'Red 7', G2: 'Green 2', R2: 'Red 2', G4: 'Green 4', G5: 'Green 5', G8: 'Green 8', GR: 'Green Reverse', G3: 'Green 3', GA2: 'Green +2', R3: 'Red 3', R6: 'Red 6', G6: 'Green 6', Y0: 'Yellow 0', R5: 'Red 5', Y7: 'Yellow 7', BS: 'Blue Skip', R4: 'Red 4', G9: 'Green 9', RR: 'Red Reverse', R9: 'Red 9', Y2: 'Yellow 2', R8: 'Red 8', Y4: 'Yellow 4', RA2: 'Red +2', Y6: 'Yellow 6', Y1: 'Yellow 1', Y5: 'Yellow 5', Y3: 'Yellow 3', YR: 'Yellow Reverse', Y8: 'Yellow 8', Y9: 'Yellow 9', YA2: 'Yellow +2', GS: 'Green Skip', YS: 'Yellow Skip', WC: 'Wild Card', W4: 'Wild +4', R0: 'Red 0', RS: 'Red Skip' }

let images = { B2: 'https://cdn.discordapp.com/emojis/731183149421428747.png', B0: 'https://cdn.discordapp.com/emojis/731183149446332436.png', B1: 'https://cdn.discordapp.com/emojis/731183149610041384.png', B7: 'https://cdn.discordapp.com/emojis/731183150478262332.png', B3: 'https://cdn.discordapp.com/emojis/731183151929491588.png', B4: 'https://cdn.discordapp.com/emojis/731183151988342925.png', B5: 'https://cdn.discordapp.com/emojis/731183152420356186.png', B6: 'https://cdn.discordapp.com/emojis/731183152713957433.png', G7: 'https://cdn.discordapp.com/emojis/731183153192108043.png', G1: 'https://cdn.discordapp.com/emojis/731183153200496750.png', BA2: 'https://cdn.discordapp.com/emojis/731183153623859341.png', B8: 'https://cdn.discordapp.com/emojis/731183153846419547.png', B9: 'https://cdn.discordapp.com/emojis/731183153980637194.png', R1: 'https://cdn.discordapp.com/emojis/731183154206867497.png', BR: 'https://cdn.discordapp.com/emojis/731183154446205008.png', G0: 'https://cdn.discordapp.com/emojis/731183154668503091.png', R7: 'https://cdn.discordapp.com/emojis/731183154877956156.png', G2: 'https://cdn.discordapp.com/emojis/731183155217825912.png', R2: 'https://cdn.discordapp.com/emojis/731183155851296781.png', G4: 'https://cdn.discordapp.com/emojis/731183155855360130.png', G5: 'https://cdn.discordapp.com/emojis/731183155855491107.png', G8: 'https://cdn.discordapp.com/emojis/731183155935051796.png', GR: 'https://cdn.discordapp.com/emojis/731183155960348674.png', G3: 'https://cdn.discordapp.com/emojis/731183155977126010.png', GA2: 'https://cdn.discordapp.com/emojis/731183156006223953.png', R3: 'https://cdn.discordapp.com/emojis/731183156023263383.png', R6: 'https://cdn.discordapp.com/emojis/731183156060880982.png', G6: 'https://cdn.discordapp.com/emojis/731183156064944180.png', Y0: 'https://cdn.discordapp.com/emojis/731183156127858779.png', R5: 'https://cdn.discordapp.com/emojis/731183156136509572.png', Y7: 'https://cdn.discordapp.com/emojis/731183156148961310.png', BS: 'https://cdn.discordapp.com/emojis/731183156186841088.png', R4: 'https://cdn.discordapp.com/emojis/731183156232978482.png', G9: 'https://cdn.discordapp.com/emojis/731183156241367210.png', RR: 'https://cdn.discordapp.com/emojis/731183156304281601.png', R9: 'https://cdn.discordapp.com/emojis/731183156316602439.png', Y2: 'https://cdn.discordapp.com/emojis/731183156316733581.png', R8: 'https://cdn.discordapp.com/emojis/731183156316864602.png', Y4: 'https://cdn.discordapp.com/emojis/731183156366934087.png', RA2: 'https://cdn.discordapp.com/emojis/731183156392362014.png', Y6: 'https://cdn.discordapp.com/emojis/731183156497088553.png', Y1: 'https://cdn.discordapp.com/emojis/731183156568522792.png', Y5: 'https://cdn.discordapp.com/emojis/731183156627243088.png', Y3: 'https://cdn.discordapp.com/emojis/731183156635369513.png', YR: 'https://cdn.discordapp.com/emojis/731183156656603348.png', Y8: 'https://cdn.discordapp.com/emojis/731183156685701211.png', Y9: 'https://cdn.discordapp.com/emojis/731183156715192401.png', YA2: 'https://cdn.discordapp.com/emojis/731183156736163961.png', GS: 'https://cdn.discordapp.com/emojis/731183156740358175.png', YS: 'https://cdn.discordapp.com/emojis/731183156824113243.png', WC: "https://cdn.discordapp.com/emojis/731183284415103118.png", W4: "https://cdn.discordapp.com/emojis/731183284305789049.png", RS: "https://cdn.discordapp.com/emojis/731183284054130818.png", R0: "https://cdn.discordapp.com/emojis/731183565961691258.png" }

let startCards = [ 'B2', 'B0', 'B1', 'B7', 'B3', 'B4', 'B5', 'B6', 'G7', 'G1', 'B8', 'B9', 'R1', 'G0', 'R7', 'G2', 'R2', 'G4', 'G5', 'G8', 'G3', 'R3', 'R6', 'G6', 'Y0', 'R5', 'Y7', 'R4', 'G9', 'R9', 'Y2', 'R8', 'Y4', 'Y6', 'Y1', 'Y5', 'Y3', 'Y8', 'Y9', 'R0' ]

let reactionMasks = { '<:B2:731183149421428747>': 'B2:731183149421428747', '<:B0:731183149446332436>': 'B0:731183149446332436', '<:B1:731183149610041384>': 'B1:731183149610041384', '<:B7:731183150478262332>': 'B7:731183150478262332', '<:B3:731183151929491588>': 'B3:731183151929491588', '<:B4:731183151988342925>': 'B4:731183151988342925', '<:B5:731183152420356186>': 'B5:731183152420356186', '<:B6:731183152713957433>': 'B6:731183152713957433', '<:G7:731183153192108043>': 'G7:731183153192108043', '<:G1:731183153200496750>': 'G1:731183153200496750', '<:BA2:731183153623859341>': 'BA2:731183153623859341', '<:B8:731183153846419547>': 'B8:731183153846419547', '<:B9:731183153980637194>': 'B9:731183153980637194', '<:R1:731183154206867497>': 'R1:731183154206867497', '<:BR:731183154446205008>': 'BR:731183154446205008', '<:G0:731183154668503091>': 'G0:731183154668503091', '<:R7:731183154877956156>': 'R7:731183154877956156', '<:G2:731183155217825912>': 'G2:731183155217825912', '<:R2:731183155851296781>': 'R2:731183155851296781', '<:G4:731183155855360130>': 'G4:731183155855360130', '<:G5:731183155855491107>': 'G5:731183155855491107', '<:G8:731183155935051796>': 'G8:731183155935051796', '<:GR:731183155960348674>': 'GR:731183155960348674', '<:G3:731183155977126010>': 'G3:731183155977126010', '<:GA2:731183156006223953>': 'GA2:731183156006223953', '<:R3:731183156023263383>': 'R3:731183156023263383', '<:R6:731183156060880982>': 'R6:731183156060880982', '<:G6:731183156064944180>': 'G6:731183156064944180', '<:Y0:731183156127858779>': 'Y0:731183156127858779', '<:R5:731183156136509572>': 'R5:731183156136509572', '<:Y7:731183156148961310>': 'Y7:731183156148961310', '<:BS:731183156186841088>': 'BS:731183156186841088', '<:R4:731183156232978482>': 'R4:731183156232978482', '<:G9:731183156241367210>': 'G9:731183156241367210', '<:RR:731183156304281601>': 'RR:731183156304281601', '<:R9:731183156316602439>': 'R9:731183156316602439', '<:Y2:731183156316733581>': 'Y2:731183156316733581', '<:R8:731183156316864602>': 'R8:731183156316864602', '<:Y4:731183156366934087>': 'Y4:731183156366934087', '<:RA2:731183156392362014>': 'RA2:731183156392362014', '<:Y6:731183156497088553>': 'Y6:731183156497088553', '<:Y1:731183156568522792>': 'Y1:731183156568522792', '<:Y5:731183156627243088>': 'Y5:731183156627243088', '<:Y3:731183156635369513>': 'Y3:731183156635369513', '<:YR:731183156656603348>': 'YR:731183156656603348', '<:Y8:731183156685701211>': 'Y8:731183156685701211', '<:Y9:731183156715192401>': 'Y9:731183156715192401', '<:YA2:731183156736163961>': 'YA2:731183156736163961', '<:GS:731183156740358175>': 'GS:731183156740358175', '<:YS:731183156824113243>': 'YS:731183156824113243', "<:RS:731183284054130818>": ":RS:731183284054130818", "<:R0:731183565961691258>": ":R0:731183565961691258", "<:W4:731183284305789049>": ":W4:731183284305789049", "<:WC:731183284415103118>": ":WC:731183284415103118" }

let colors = {"R": "Red", "B": "Blue", "G": "Green", "Y": "Yellow", "W": "Wild"}
let flipColors = {"Red": "R", "Blue": "B", "Green": "G", "Yellow": "Y", "Wild": "W"}
module.exports = (bot, users, currentGame, games, prefix, message) => {
    const currentPlayer = users.filter(u => u.id === currentGame.rotation[0])[0]
    const c = users.findIndex(e => e.id === currentGame.rotation[0])
 
    let m = currentPlayer.msg
    let filter = (m, emoji, userID) => cardID.includes(emoji.id) && userID === currentPlayer.id;

    let collector = ""
    let cancelWild = true
    let playedACard = false
    
    if (currentGame.rotation[0] === currentPlayer.id) collector = new ReactionCollector(bot, m, filter, {
            time: 120000
        });
    playCard(collector, currentPlayer.id, m, c)
    
    function playCard(collect, user, mes, l) {
     if (!games.get(message.guild.id) || !games.get(message.guild.id)[message.author.id]) return;
    if (currentGame.rotation[0] !== user) return
    collect.on("collect", async (m, emoji, userID) => {
        if (!games.get(message.guild.id) || !games.get(message.guild.id)[message.author.id]) return;
        if (!currentGame.playableCards[l].includes(emoji.id)) return
      
        const playedCard = cardNames.filter(e => `<:${emoji.name}:${emoji.id}>`.includes(e))[0]
        const dm = await bot.getDMChannel(currentGame.rotation[0])
        
        if (playedCard[0] === "W") return wildCard(dm, collect, user, mes, l, playedCard)
        if (playedCard[1] === "A") return add2(dm, collect, user, mes, l, playedCard)
        if (playedCard[1] === "S") return skip(dm, collect, user, mes, l, playedCard)
      
        if (playedCard !== "TicTacToe_X") {
        currentGame.current.card = playedCard
        currentGame.current.color = masks2[playedCard].split(" ")[0]
        currentGame.current.number = masks2[playedCard].split(" ")[1]
        if (currentGame.current.number === "+2") currentGame.current.number = "A2"
        if (currentGame.current.number === "Skip") currentGame.current.number = "S"
        if (currentGame.current.number === "Reverse") currentGame.current.number = "R"
        currentGame.current.url = images[playedCard]
        currentGame.decks[l].splice(cardNames.findIndex(e => `<:${emoji.name}:${emoji.id}>`.includes(e)), 1)
        return goOn(undefined, playedCard)
        }
        if (playedCard === "TicTacToe_X") return goOn("draw", playedCard)
  
        
        

  async function skip(dm, collect, user, mes, l, playedCard) {
    const nextPlayer = users.filter(u => u.id === currentGame.rotation[1])[0]
    const i = users.findIndex(e => e.id === currentGame.rotation[1])

    nextPlayer.dm.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(`You have been skipped by **${users.filter(u => u.id === currentGame.rotation[0])[0].username}**!`))

    if (currentGame.rotation.length === 2) {
        const dmMsg = await dm.createMessage("temp")
        users[users.findIndex(e => e.id === currentGame.rotation[0])].msg = dmMsg
          } else {
         const dm = await bot.getDMChannel(currentGame.rotation[0])
         const dmMsg = await dm.createEmbed(new Eris.Embed().color(0x7289DA).title("Uno").description("Sit back and relax, it's not your turn yet!\nCheck up on the lobby to see who's turn it is right now!\nYour deck is shown above\n\nYou will be mentioned in the lobby when it is your turn, to comply with Discord's spam policy, the bot will not DM you multiple times.").thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").footer(`This DM is solicited by ${currentGame.lobby.memberUsername[users.findIndex(e => e.id === currentGame.rotation[0])]}, as they joined this game`))
         users[users.findIndex(e => e.id === currentGame.rotation[0])].msg = dmMsg
        }
      currentGame.rotation.push(currentGame.rotation[0])
      currentGame.rotation.shift()
    
    currentGame.current.color = colors[playedCard[0]]
    currentGame.current.number = "S"
    currentGame.current.card = playedCard
    currentGame.current.url = images[playedCard]
    goOn(undefined, playedCard)
  }
      
      
  async function add2(dm, collect, user, mes, l, playedCard) {
    const nextPlayer = users.filter(u => u.id === currentGame.rotation[1])[0]
    const i = users.findIndex(e => e.id === currentGame.rotation[1])
     for (var c = 0; c < 2; c++) {
       let card = cards[Math.floor(Math.random() * cards.length)];
       if (currentGame.decks[i].length < 23) currentGame.decks[i].push(card)
     }
    nextPlayer.dm.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(`You have been +2'd by **${users.filter(u => u.id === currentGame.rotation[0])[0].username}**!\n\nYou have been skipped and gained 2 new cards`))

    if (currentGame.rotation.length === 2) {
        const dmMsg = await dm.createMessage("temp")
        users[users.findIndex(e => e.id === currentGame.rotation[0])].msg = dmMsg
          } else {
         const dm = await bot.getDMChannel(currentGame.rotation[0])
         const dmMsg = await dm.createEmbed(new Eris.Embed().color(0x7289DA).title("Uno").description("Sit back and relax, it's not your turn yet!\nCheck up on the lobby to see who's turn it is right now!\nYour deck is shown above\n\nYou will be mentioned in the lobby when it is your turn, to comply with Discord's spam policy, the bot will not DM you multiple times.").thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").footer(`This DM is solicited by ${currentGame.lobby.memberUsername[users.findIndex(e => e.id === currentGame.rotation[0])]}, as they joined this game`))
         users[users.findIndex(e => e.id === currentGame.rotation[0])].msg = dmMsg
        }
      currentGame.rotation.push(currentGame.rotation[0])
      currentGame.rotation.shift()
    
    currentGame.current.color = colors[playedCard[0]]
    currentGame.current.number = "A2"
    currentGame.current.card = playedCard
    currentGame.current.url = images[playedCard]
    goOn(undefined, playedCard)
  }    
      
  async function wildCard(dm, collect, user, mes, l, playedCard) {
          let playedWild = false
          const confirmColor = await dm.createEmbed(new Eris.Embed().color(0x7289DA).title("Uno").description(`Select a colorn\n<:Player2:714906015694585877> - Red\n\n<:Player1:714906015912689685> - Blue\n\n<:Player3:714906015971278919> - Green\n\n<:Player4:714906015966953552> - Yellow`))
          await confirmColor.addReaction(":Player2:714906015694585877")
          await confirmColor.addReaction(":Player1:714906015912689685")
          await confirmColor.addReaction(":Player3:714906015971278919")
          await confirmColor.addReaction(":Player4:714906015966953552")
          
          let filter = (m, emoji, userID) => ["714906015912689685", "714906015694585877", "714906015971278919", "714906015966953552"].includes(emoji.id) && userID === currentGame.rotation[0];
          
          const wildCollector = new ReactionCollector(bot, confirmColor, filter, {
            time: 200000
          });
          wildCollector.on("collect", async (wM, wEmoji, wUID) => {
             if (!games.get(message.guild.id) || !games.get(message.guild.id)[message.author.id]) return;
            let color = ""
            playedWild = true
            switch (wEmoji.id) {
              case "714906015694585877": // Red
                color = "Red"
                break;
                
              case "714906015912689685": // Blue
                color = "Blue"
                break;
                
              case "714906015971278919": // Green
                color = "Green"
                break;
                
              case "714906015966953552": // Yellow
                color = "Yellow"
                break;
                
            }
            if (playedCard[1] === "4") {
              const nextPlayer = users.filter(u => u.id === currentGame.rotation[1])[0]
              const i = users.findIndex(e => e.id === currentGame.rotation[1])
              for (var c = 0; c < 4; c++) {
                let card = cards[Math.floor(Math.random() * cards.length)];
                if (currentGame.decks[i].length < 23) currentGame.decks[i].push(card)
              }
              nextPlayer.dm.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(`You have been +4'd by **${users.filter(u => u.id === currentGame.rotation[0])[0].username}**!\n\nYou have been skipped and gained 4 new cards\nThe color is now **${color}**`))
              if (currentGame.rotation.length === 2) {
              const dmMsg = await dm.createMessage("temp")
              users[users.findIndex(e => e.id === currentGame.rotation[0])].msg = dmMsg
              } else {
                const dm = await bot.getDMChannel(currentGame.rotation[0])
                const dmMsg = await dm.createEmbed(new Eris.Embed().color(0x7289DA).title("Uno").description("Sit back and relax, it's not your turn yet!\nCheck up on the lobby to see who's turn it is right now!\nYour deck is shown above\n\nYou will be mentioned in the lobby when it is your turn, to comply with Discord's spam policy, the bot will not DM you multiple times.").thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").footer(`This DM is solicited by ${currentGame.lobby.memberUsername[m]}, as they joined this game`))
                users[users.findIndex(e => e.id === currentGame.rotation[0])].msg = dmMsg
              }
              currentGame.rotation.push(currentGame.rotation[0])
              currentGame.rotation.shift()
            }
              currentGame.current.color = color
              currentGame.current.number = "Wild"
              currentGame.current.card = playedCard
              currentGame.current.url = images[playedCard]
              confirmColor.delete()
              goOn(undefined, playedCard)
              
          })
    
      wildCollector.on("end", collected => {
        if (playedWild === true) return
        else return goOn("skip", "TicTacToe_X")
      })
       }
      
    
      
    });
      
  collect.on('end', collected => {
    if (playedACard === true) {
      playedACard = false
      return 
    } else return skipPlay()
  })
      
function skipPlay() {
  const i = users.findIndex(e => e.id === currentGame.rotation[0])
  let playableCards = []
  currentGame.decks[i].forEach(card => {
   if (card[2] === currentGame.current.color[0] || card[3] === currentGame.current.number || card[2] === "W") playableCards.push({emoji: card, name: masks2[cardNames.filter(e => card.includes(e))[0]], react: reactionMasks[card], id: cardID.filter(e => card.includes(e))[0] })
  })
  
  if (playableCards.length === 0) playableCards.push({emoji: "<:TicTacToe_X:717504662412066909>", name: "Draw Card", react: ":TicTacToe_X:717504662412066909", id: "717504662412066909"})
  currentGame.playableCards[i] = playableCards.map(e => e.id)
      
  let pickedCard = playableCards[Math.floor(Math.random() * playableCards.length)];
  if (pickedCard.name === "Draw Card") return goOn("draw", "TicTacToe_X")
  if (["S", "W", "A2", "R"].includes(pickedCard.name)) return goOn("skip", "TicTacToe_X")
  
  currentGame.current.color = colors[pickedCard.name[0]]
  currentGame.current.number = masks[pickedCard.name.toLowerCase()][1]
  currentGame.current.card = masks[pickedCard.name.toLowerCase()]
  currentGame.current.url = images[masks[pickedCard.name.toLowerCase()]]
  return goOn(undefined, pickedCard.name)
}
      
      async function goOn(type, playedCard) {
        if (!games.get(message.guild.id) || !games.get(message.guild.id)[message.author.id]) return;
        playedACard = true
        mes.delete()
        if (type !== "draw" || type !== "skip") currentGame.decks[l].splice(currentGame.decks[l].findIndex(e => e.includes(playedCard)), 1)
          
      let check = false
        currentGame.decks.forEach(deck => {
          let check2 = false
         if (deck.length === 0) {
           check2 = true
           console.log(check2)
           winner()
          }
          if (check2 === true) check = true
       })
        if (check === true) return
          
        const dm = await bot.getDMChannel(currentGame.rotation[0])
        const dmMsg = await dm.createEmbed(new Eris.Embed().color(0x7289DA).title("Uno").description("Sit back and relax, it's not your turn yet!\nCheck up on the lobby to see who's turn it is right now!\nYour deck is shown above\n\nYou will be mentioned in the lobby when it is your turn, to comply with Discord's spam policy, the bot will not DM you multiple times.").thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").footer(`This DM is solicited by ${currentGame.lobby.memberUsername[users.findIndex(e => e.id === currentGame.rotation[0])]}, as they joined this game`))
        users[users.findIndex(e => e.id === currentGame.rotation[0])].msg = dmMsg
        
        if (type === "draw") {
          var rand = cards[Math.floor(Math.random() * cards.length)];
          currentGame.decks[l].push(rand)

        }
          
        if (type !== "reverse") {
        currentGame.rotation.push(currentGame.rotation[0])
        currentGame.rotation.shift()
        }
      
        const nextPlayer = users.filter(u => u.id === currentGame.rotation[0])[0]
        const i = users.findIndex(e => e.id === currentGame.rotation[0])
        
      
        let playableCards = []
currentGame.decks[i].forEach(card => {
 if (card[2] === currentGame.current.color[0] || card[3] === currentGame.current.number || card[2] === "W") playableCards.push({emoji: card, name: masks2[cardNames.filter(e => card.includes(e))[0]], react: reactionMasks[card], id: cardID.filter(e => card.includes(e))[0] })
})
  
if (playableCards.length === 0) playableCards.push({emoji: "<:TicTacToe_X:717504662412066909>", name: "Draw Card", react: ":TicTacToe_X:717504662412066909", id: "717504662412066909"})
currentGame.playableCards[i] = playableCards.map(e => e.id)
      
        const nextMsg = await nextPlayer.msg.edit({content: currentGame.decks[i].join(" "), embed: new Eris.Embed().color(0x7289DA).title("Uno").thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(`Try and get rid of all of your cards in this fun game of Uno!\n\nYour cards are shown above\nThe current card is shown below\n\nPlayable Cards:\n\n${playableCards.map(c => `${c.emoji} - **${c.name}**`).join('\n')}\n\n(All cards are reacted in order)\n\nCurrent Card (${currentGame.current.color} ${currentGame.current.number}):`).image(currentGame.current.url).footer(`This DM is solicited by ${currentGame.lobby.memberUsername[users.findIndex(e => e.id === currentGame.rotation[0])]}, as they joined this game`)})
        playableCards.forEach(card => nextMsg.addReaction(card.react))

        let msgID = currentGame.msgID
        currentGame.msgID = ""
        const msg = await message.channel.getMessage(msgID)
        if (msg) msg.delete()
          
      let hiddenDecks1 = [], hiddenDecks2 = []
     currentGame.decks.forEach((deck, i) => {
     deck.forEach((d, h) => {
       if (h === 10) return hiddenDecks1.push(`... *and ${deck.length - 10} more*`)
       if (h > 10) return;
       hiddenDecks1.push("<:Uno_Back:731228742038585455>")
     })
     let emoji = currentGame.lobby.emojis[currentGame.lobby.members.indexOf(currentGame.lobby.members[i])]
     let player = ""
     if (currentGame.rotation[0] === currentGame.lobby.members[i]) player = "**(Playing)**"
     hiddenDecks2.push(`${emoji} **${bot.users.get(currentGame.lobby.members[i]).username}**'s cards: ${player}\n${hiddenDecks1.join(" ")}`)
     hiddenDecks1 = []
     });
      
        const embed = new Eris.Embed()
        .color(0x7289DA)
        .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
        .title("Uno")
        .image(currentGame.current.url)
        .description(`Play your cards right, and win bragging rights!\n\n${hiddenDecks2.join("\n\n")}\n\nCurrent Card (${currentGame.current.color} ${currentGame.current.number}):`)
         const ms = await message.channel.createMessage({content: `<@${currentGame.rotation[0]}> it is your turn!`, embed: embed})
         currentGame.msgID = ms.id
    let filter = (m, emoji, userID) => cardID.includes(emoji.id) && userID === currentGame.rotation[0];

    let collector2 = new ReactionCollector(bot, nextMsg, filter, {
            time: 120000
    });
    collect.stop()
    playCard(collector2, currentGame.rotation[0], nextMsg, i)
    }
      
      
  async function reverse(dm, collect, user, mes, l, playedCard) {
    if (currentGame.rotation.length === 2) return goOn(undefined, playedCard)
    
    const dmMsg = await dm.createEmbed(new Eris.Embed().color(0x7289DA).title("Uno").description("Sit back and relax, it's not your turn yet!\nCheck up on the lobby to see who's turn it is right now!\nYour deck is shown above\n\nYou will be mentioned in the lobby when it is your turn, to comply with Discord's spam policy, the bot will not DM you multiple times.").thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").footer(`This DM is solicited by ${currentGame.lobby.memberUsername[users.findIndex(e => e.id === currentGame.rotation[0])]}, as they joined this game`))
    users[users.findIndex(e => e.id === currentGame.rotation[0])].msg = dmMsg
    
    currentGame.rotation.reverse()
    
    currentGame.current.color = colors[playedCard[0]]
    currentGame.current.number = "R"
    currentGame.current.card = playedCard
    currentGame.current.url = images[playedCard]
    
    return goOn("reverse", playedCard)
  }
      
  async function botPlay() {
    let playableCards = []
currentGame.decks[1].forEach(card => {
 if (card[2] === currentGame.current.color[0] || card[3] === currentGame.current.number || card[2] === "W") playableCards.push({emoji: card, name: masks2[cardNames.filter(e => card.includes(e))[0]], react: reactionMasks[card], id: cardID.filter(e => card.includes(e))[0] })
})
    
if (playableCards.length === 0) playableCards.push({emoji: "<:TicTacToe_X:717504662412066909>", name: "Draw Card", react: ":TicTacToe_X:717504662412066909", id: "717504662412066909"})
currentGame.playableCards[1] = playableCards.map(e => e.id)
let pickedCard = playableCards[Math.floor(Math.random() * playableCards.length)];
if (pickedCard.name === "Draw Card") return goOn("draw", "TicTacToe_X")
    
  currentGame.current.color = colors[pickedCard.name[0]]
  currentGame.current.number = masks[pickedCard.name.toLowerCase()][1]
  currentGame.current.card = masks[pickedCard.name.toLowerCase()]
  currentGame.current.url = images[masks[pickedCard.name.toLowerCase()]]
  return goOn(undefined, pickedCard.name)
  }
      
      async function checkWinner() {
       currentGame.decks.forEach(deck => {
         if (deck.length === 0) return winner()
       })
    }
                                 
   async function winner() {
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
    users.forEach(u => u.dm.createEmbed(end))
     
     
    let msgID = currentGame.msgID
    currentGame.msgID = ""
    const msg = await message.channel.getMessage(msgID)
    if (msg) msg.delete()
     
     message.channel.createEmbed(end)
     
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
       }
    }
  
  
}