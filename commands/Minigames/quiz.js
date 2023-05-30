const Eris = require('eris');
const authorSchema = require('../../models/user.js')
const moveOn = require('../../functions/Quiz/startGame.js')

const { ReactionCollector, MessageCollector } = require("eris-collector");

function removeItem(array, item) {
    var i = array.length;

    while (i--) {
        if (array[i] === item) {
            array.splice(array.indexOf(item), 1);
        }
    }
}


exports.run = async (bot, message, args, prefix, games, lang) => {
  let currentGame
  let usage = `${prefix}quiz [1 | 2 | 3 | 4]`
  let range = `1-4`
  if (games.get(message.guild.id) && games.get(message.guild.id)[message.author.id]) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.minigames.general.inGame))
  if (games.get(message.guild.id) && Object.keys(games.get(message.guild.id)).filter(u => games.get(message.guild.id)[u].lobby.members.includes(message.author.id)).length > 0) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.minigames.general.inGame))
  if (games.get(message.guild.id) && Object.keys(games.get(message.guild.id)).length >= 10) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.minigames.general.maxGames))
  if (games.get(message.guild.id) && Object.keys(games.get(message.guild.id)).filter(e => games.get(message.guild.id)[e].channel === message.channel.id).length > 0) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.minigames.general.gameInChannel))

  authorSchema.findOne({id: message.author.id}, async (err, res) => {
    if (!args[0]) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.minigames.general.noPlayerNum.replace("[USAGE]", usage)))
    if (!["one", "two", "three", "four", "1", "2", "3", "4"].includes(args[0].toLowerCase())) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.minigames.general.invalidNum.replace("[RANGE]", range).replace("[USAGE]", usage)))

    let P1Emoji;
    if (!res) P1Emoji = {P1: '<:Player1:714906015912689685>', P2: "<:Player2:714906015694585877>", P3: "<:Player3:714906015971278919>", P4: "<:Player4:714906015966953552>"}
    else P1Emoji = res.emoji
    
    if (["one", "1"].includes(args[0].toLowerCase())) {
      const msg = await message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.minigames.general.confirmSingle.replace("[GAME]", lang.gameTypes.quiz)))
      msg.addReaction(":Yes:712036483694854164").then(() => msg.addReaction(":No:712036483967483975"))
     let filter = (m, emoji, userID) => ['712036483694854164', '712036483967483975'].includes(emoji.id) && userID === message.author.id;

     const collector2 = new ReactionCollector(bot, msg, filter, {
                 time: 1800000
             })

collector2.on('collect', async (m, emoji, userID) => {
  if (m.id !== msg.id) return;
  if (emoji.id === "712036483694854164") {
    collector2.stop()
    msg.delete()
    if (games.get(message.guild.id) && Object.keys(games.get(message.guild.id)).filter(u => games.get(message.guild.id)[u].lobby.members.includes(message.author.id)).length > 0) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.minigames.general.inGame2)).then(msg => setTimeout(function() {msg.delete()}, 3000))

let gameObj = {}
gameObj[message.author.id] = {
gameType: "Quiz",
lobby: {host: message.author.id, members: [message.author.id], memberUsername: [message.author.username], emojis: [P1Emoji.P1], maxPlayers: 1, maxedOut: false, currentMembers: 1},
channel: message.channel.id,
round: {number: 1},
stats: [{points: 0, items: [], player: 1}],
misc: {ownerTriedStart: 0, triedJoining: [], sentMessage: [], afkStreak: [0, 0], inLobby: false},
questions: [],
msgID: ""
}

    if (!games.get(message.guild.id)) games.set(message.guild.id, gameObj)
    else Object.assign(games.get(message.guild.id), gameObj)
    bot.executeWebhook("737839838295883846", "Uv6kTscp1imCDD0rauJTeYqRygeQdPrW90cjuEj7_gXpIRN23DUbLHH0jtfeJWUwsO_y", {embeds: [new Eris.Embed().title("New Game Started").thumbnail(bot.user.avatarURL).color(0x7289DA).timestamp().description(`**Game Type** - Quiz\n**Server** - ${message.guild.name}\n**Players**:\n\n${games.get(message.guild.id)[message.author.id].lobby.memberUsername.map((u, i) => `${games.get(message.guild.id)[message.author.id].lobby.emojis[i]} ${u}`).join('\n')}`)]})
 
    moveOn(bot, message, games.get(message.guild.id)[message.author.id], games, lang)

  } else if (emoji.id === "712036483967483975") {
    collector2.stop()
    msg.delete()
    message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.minigames.cancel.replace("[GAME]", lang.gameTypes.quiz)))
  }
});
    }
    if (["two", "2"].includes(args[0].toLowerCase())) {
      const msg = await message.channel.createEmbed(new Eris.Embed().thumbnail(bot.user.avatarURL).title(lang.minigames.general.inLobby.replace("[GAME]", lang.gameTypes.quiz)).color(0x7289DA).description(`${P1Emoji.P1} ${lang.players.p1} - **${message.author.username} (${lang.misc.host})**\n\n<:Player2:714906015694585877> ${lang.players.p2} - **${lang.misc.waiting}** <a:Loading:712097176313921548>\n---------------------------------------------------\n\n<:Yes:712036483694854164> - ${lang.minigames.general.join.replace("[GAME]", lang.gameTypes.quiz)}\n\n<:No:712036483967483975> - ${lang.minigames.general.leave.replace("[GAME]", lang.gameTypes.quiz)}`))
      msg.addReaction(":Yes:712036483694854164").then(() => msg.addReaction(":No:712036483967483975"))

    let gameObj = {}
    gameObj[message.author.id] = {
    gameType: "Quiz",
    lobby: {host: message.author.id, members: [message.author.id, "Waiting..."], memberUsername: [message.author.username], emojis: [P1Emoji], maxPlayers: 2, maxedOut: false, currentMembers: 1},
    channel: message.channel.id,
    round: {number: 1},
    stats: [{points: 0, items: [], player: 1}, {points: 0, items: [], player: 2}],
    misc: {ownerTriedStart: 0, triedJoining: [], sentMessage: [], afkStreak: [0, 0], inLobby: true},
    questions: [],
    msgID: msg.id
  }
    if (!games.get(message.guild.id))  games.set(message.guild.id, gameObj)

    else Object.assign(games.get(message.guild.id), gameObj)
    currentGame = games.get(message.guild.id)[message.author.id]
    people(msg, 2)
  }
  if (['three', '3'].includes(args[0].toLowerCase())) {
    const msg = await message.channel.createEmbed(new Eris.Embed().thumbnail(bot.user.avatarURL).title(lang.minigames.general.inLobby.replace("[GAME]", lang.gameTypes.quiz)).color(0x7289DA).description(`${P1Emoji.P1} ${lang.players.p1} - **${message.author.username} (${lang.misc.host})**\n\n<:Player2:714906015694585877> ${lang.players.p2} - **${lang.misc.waiting}** <a:Loading:712097176313921548>\n\n<:Player3:714906015971278919> ${lang.players.p3} - **${lang.misc.waiting}** <a:Loading:712097176313921548>\n---------------------------------------------------\n\n<:Yes:712036483694854164> - ${lang.minigames.general.join.replace("[GAME]", lang.gameTypes.quiz)}\n\n<:No:712036483967483975> - ${lang.minigames.general.leave.replace("[GAME]", lang.gameTypes.quiz)}`))
    msg.addReaction(":Yes:712036483694854164").then(() => msg.addReaction(":No:712036483967483975"))
    let gameObj = {}
    gameObj[message.author.id] = {
    gameType: "Quiz",
    lobby: {host: message.author.id, members: [message.author.id, "Waiting...", "Waiting..."], memberUsername: [message.author.username], emojis: [P1Emoji], maxPlayers: 3, maxedOut: false, currentMembers: 1},
    channel: message.channel.id,
    round: {number: 1},
    stats: [{points: 0, items: [], player: 1}, {points: 0, items: [], player: 2},  {points: 0, items: [], player: 3}],
    misc: {ownerTriedStart: 0, triedJoining: [], sentMessage: [], afkStreak: [0, 0, 0], inLobby: true},
    questions: [],
    msgID: msg.id
  }
    if (!games.get(message.guild.id)) games.set(message.guild.id, gameObj)
    else Object.assign(games.get(message.guild.id), gameObj)
    currentGame = games.get(message.guild.id)[message.author.id]
    people(msg, 3)
  }
  if (['four', '4'].includes(args[0].toLowerCase())) {
    const msg = await message.channel.createEmbed(new Eris.Embed().thumbnail(bot.user.avatarURL).title(lang.minigames.general.inLobby.replace("[GAME]", lang.gameTypes.quiz)).color(0x7289DA).description(`${P1Emoji.P1} ${lang.players.p1} - **${message.author.username} (${lang.misc.host})**\n\n<:Player2:714906015694585877> ${lang.players.p2} - **${lang.misc.waiting}** <a:Loading:712097176313921548>\n\n<:Player3:714906015971278919> ${lang.players.p3} - **${lang.misc.waiting}** <a:Loading:712097176313921548>\n\n<:Player4:714906015966953552> ${lang.players.p4} - **${lang.misc.waiting}** <a:Loading:712097176313921548>\n---------------------------------------------------\n\n<:Yes:712036483694854164> - ${lang.minigames.general.join.replace("[GAME]", lang.gameTypes.quiz)}\n\n<:No:712036483967483975> - ${lang.minigames.general.leave.replace("[GAME]", lang.gameTypes.quiz)}`))
    msg.addReaction(":Yes:712036483694854164").then(() => msg.addReaction(":No:712036483967483975"))

    let gameObj = {}
    gameObj[message.author.id] = {
    gameType: "Quiz",
    lobby: {host: message.author.id, members: [message.author.id, "Waiting...", "Waiting...", "Waiting..."], memberUsername: [message.author.username], emojis: [P1Emoji], maxPlayers: 4, maxedOut: false, currentMembers: 1},
    channel: message.channel.id,
    round: {number: 1},
    stats: [{points: 0, items: [], player: 1}, {points: 0, items: [], player: 2},  {points: 0, items: [], player: 3}, {points: 0, items: [], player: 4}],
    misc: {ownerTriedStart: 0, triedJoining: [], sentMessage: [], confirm: 0, afkStreak: [0, 0, 0, 0], inLobby: true},
    questions: [],
    msgID: msg.id
  }
    if (!games.get(message.guild.id)) games.set(message.guild.id, gameObj)
    else Object.assign(games.get(message.guild.id), gameObj)
    currentGame = games.get(message.guild.id)[message.author.id]

   people(msg, 4)
}
  function people (msg, num) {
    const filter = (m, emoji, userID) => ['712036483694854164', '712036483967483975'].includes(emoji.id) && !m.bot

    const collector = new ReactionCollector(bot, msg, filter, {
                time: 1800000
            })

collector.on('collect', async (m, emoji, userID) => {
  if (!currentGame) return;
  const user = message.guild.members.get(userID).user
  if (user.bot) return;
  if (emoji.id == "712036483694854164") {
    if (user.id === currentGame.lobby.host) {
      let bruh;
      if (currentGame.misc.confirm === 1) return;
      if (currentGame.lobby.maxedOut === false) bruh = await message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail(bot.user.avatarURL).description(lang.minigames.general.startWithLess.replace("[HOST]", message.author.username).replace("[MEMBERS]", currentGame.lobby.currentMembers).replace("[MAX]", currentGame.lobby.maxPlayers)))
      else bruh = await message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail(bot.user.avatarURL).description(lang.minigames.general.startWithAll.replace("[HOST]", message.author.username)))
      bruh.addReaction(":Yes:712036483694854164").then(() => bruh.addReaction(':No:712036483967483975'))
      currentGame.misc.confirm = 1
      const filter2 = (m, emoji2, userID2) => ['712036483694854164', '712036483967483975'].includes(emoji2.id) && message.author.id === userID2

      const collector2 = new ReactionCollector(bot, bruh, filter2, {
                  time: 30000
      })

  collector2.on('collect', async (m2, emoji2, userID2) => {
  if (m2.id !== bruh.id) return;
  if (emoji2.id === "712036483694854164") {
    currentGame.msgID = ""
    currentGame.misc.inLobby = false
    collector2.stop()
    msg.delete()
    bruh.delete()

    removeItem(currentGame.lobby.members, 'Waiting...')
    currentGame.lobby.currentMembers = currentGame.lobby.members.length
    currentGame.stats.length = currentGame.lobby.currentMembers
    currentGame.misc.afkStreak.length = currentGame.lobby.currentMembers
    
    currentGame.lobby.emojis[0] = currentGame.lobby.emojis[0].P1
    if (currentGame.lobby.memberUsername[1]) currentGame.lobby.emojis[1] = currentGame.lobby.emojis[1].P2
    if (currentGame.lobby.memberUsername[2]) currentGame.lobby.emojis[2] = currentGame.lobby.emojis[2].P3
    if (currentGame.lobby.memberUsername[3]) currentGame.lobby.emojis[3] = currentGame.lobby.emojis[3].P4

    bot.executeWebhook("737839838295883846", "Uv6kTscp1imCDD0rauJTeYqRygeQdPrW90cjuEj7_gXpIRN23DUbLHH0jtfeJWUwsO_y", {embeds: [new Eris.Embed().title("New Game Started").thumbnail(bot.user.avatarURL).color(0x7289DA).timestamp().description(`**Game Type** - Quiz\n**Server** - ${message.guild.name}\n**Players**:\n\n${currentGame.lobby.memberUsername.map((u, i) => `${currentGame.lobby.emojis[i]} ${u}`).join('\n')}`)]})
    moveOn(bot, message, currentGame, games, prefix, games, lang)
  } else if (emoji2.id === "712036483967483975") {
    collector2.stop()
    bruh.delete()
    currentGame.misc.confirm = 0
  }
  });
  collector2.on('end', collected => {
  currentGame.misc.confirm = 0
  if (currentGame.misc.inLobby === false) return;
  bruh.delete()
  })
    }
    if (currentGame.lobby.members.includes(user.id)) return;

    if (games.get(message.guild.id) && Object.keys(games.get(message.guild.id)).filter(u => games.get(message.guild.id)[u].lobby.members.includes(user.id)).length > 0) {
      if (currentGame.misc.sentMessage.includes(user.id)) return;
      message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.minigames.general.joinWhileGame.replace("[USER]", user.username))).then(m => setTimeout(function () {m.delete()}, 5000))
      currentGame.misc.sentMessage.push(user.id)
      return;
   }

    if (currentGame.lobby.members[1] === "Waiting...")  {
      if (currentGame.misc.triedJoining.filter(x => x===user.id).length >= 3) {
        if (currentGame.misc.sentMessage.includes(user.id)) return;
        message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.minigames.general.joinLeave.replace("[USER]", user.username)).thumbnail(bot.user.avatarURL)).then(m => setTimeout(function () {m.delete()}, 5000))
        currentGame.misc.sentMessage.push(user.id)
        return;
      }

      currentGame.lobby.members[1] = user.id
      currentGame.lobby.memberUsername[1] = user.username
      currentGame.lobby.currentMembers++
      if (currentGame.lobby.maxPlayers === 2) currentGame.lobby.maxedOut = true
      currentGame.misc.triedJoining.push(user.id)
    }
    else if (currentGame.lobby.members[2] === "Waiting...") {
      if (currentGame.misc.triedJoining.filter(x => x===user.id).length >= 3) {
        if (currentGame.misc.sentMessage.includes(user.id)) return;
        message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.minigames.general.joinLeave.replace("[USER]", user.username)).thumbnail(bot.user.avatarURL)).then(m => setTimeout(function () {m.delete()}, 5000))
        currentGame.misc.sentMessage.push(user.id)
        return;
      }
      currentGame.lobby.members[2] = user.id
      currentGame.lobby.memberUsername[2] = user.username
      currentGame.lobby.currentMembers++
      if (currentGame.lobby.maxPlayers === 3) currentGame.lobby.maxedOut = true
      currentGame.misc.triedJoining.push(user.id)
    }
    else if (currentGame.lobby.members[3] === "Waiting...") {
      if (currentGame.misc.triedJoining.filter(x => x===user.id).length >= 3) {
        if (currentGame.misc.sentMessage.includes(user.id)) return;
        message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.minigames.general.joinLeave.replace("[USER]", user.username)).thumbnail(bot.user.avatarURL)).then(m => setTimeout(function () {m.delete()}, 5000))
        currentGame.misc.sentMessage.push(user.id)
        return;
      }
      currentGame.lobby.members[3] = user.id
      currentGame.lobby.memberUsername[3] = user.tag
      currentGame.lobby.currentMembers++
      if (currentGame.lobby.maxPlayers ===4) currentGame.lobby.maxedOut = true
      currentGame.misc.triedJoining.push(user.id)
    }
  else {
    if (currentGame.misc.triedJoining.filter(x => x===user.id).length >= 2) return;
    const dmUser = await bot.getDMChannel(user.id)
    dmUser.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.minigames.general.gameFull))
    currentGame.misc.triedJoining.push(user.id)
    return
  }

      let emoji2 = '<:Player2:714906015694585877>'
      let emoji3 = '<:Player3:714906015971278919>'
      let emoji4 = '<:Player4:714906015966953552>'
    currentGame.misc.confirm = 0
    let player3 = currentGame.lobby.memberUsername[2]
    if (!player3) player3 = `${lang.misc.waiting} <a:Loading:712097176313921548>`

    let player4 = currentGame.lobby.memberUsername[3]
    if (!player4) player4 = `${lang.misc.waiting} <a:Loading:712097176313921548>`


    authorSchema.findOne({id: user.id}, async (err, res) => {
    if (res) currentGame.lobby.emojis.push(res.emoji)

    if (!res) currentGame.lobby.emojis.push({P1: '<:Player1:714906015912689685>', P2: "<:Player2:714906015694585877>", P3: "<:Player3:714906015971278919>", P4: "<:Player4:714906015966953552>"})


  
  if (currentGame.lobby.emojis[1]) emoji2 = currentGame.lobby.emojis[1].P2
  if (currentGame.lobby.emojis[2]) emoji3 = currentGame.lobby.emojis[2].P3
  if (currentGame.lobby.emojis[3]) emoji4 = currentGame.lobby.emojis[3].P4

    const gameInfo = {embed: {
      thumbnail: {url: bot.user.avatarURL},
      title: lang.minigames.general.inLobby.replace("[GAME]", lang.gameTypes.quiz),
      color: 0x7289DA
    }}
        if (currentGame.lobby.maxPlayers === 2) gameInfo.embed.description = `${P1Emoji.P1} ${lang.players.p1} - **${message.author.username} (${lang.misc.host})**\n\n${emoji2} ${lang.players.p2} - **${currentGame.lobby.memberUsername[1]}**\n---------------------------------------------------\n\n${lang.minigames.general.join.replace("[GAME]", lang.gameTypes.quiz)}\n\n${lang.minigames.general.leave.replace("[GAME]", lang.gameTypes.quiz)}`
        if (currentGame.lobby.maxPlayers === 3) gameInfo.embed.description = `${P1Emoji.P1} ${lang.players.p1} - **${message.author.username} (${lang.misc.host})**\n\n${emoji2} ${lang.players.p2} - **${currentGame.lobby.memberUsername[1]}**\n\n${emoji3} ${lang.players.p3} - **${player3}**\n---------------------------------------------------\n\n${lang.minigames.general.join.replace("[GAME]", lang.gameTypes.quiz)}\n\n${lang.minigames.general.leave.replace("[GAME]", lang.gameTypes.quiz)}`
        if (currentGame.lobby.maxPlayers === 4) gameInfo.embed.description = `${P1Emoji.P1} ${lang.players.p1} - **${message.author.username} (${lang.misc.host})**\n\n${emoji2} ${lang.players.p2} - **${currentGame.lobby.memberUsername[1]}**\n\n${emoji3} ${lang.players.p3} - **${player3}**\n\n${emoji4} ${lang.players.p4} - **${player4}**\n---------------------------------------------------\n\n${lang.minigames.general.join.replace("[GAME]", lang.gameTypes.quiz)}\n\n${lang.minigames.general.leave.replace("[GAME]", lang.gameTypes.quiz)}`
        if (currentGame.lobby.maxedOut === true) gameInfo.embed.footer = {text: lang.minigames.fullText}
        msg.edit(gameInfo)
    });
  };
  if (emoji.id === "712036483967483975") {
    if (currentGame.misc.confirm && currentGame.misc.confirm === 1) return;
    if (user.id === currentGame.lobby.host) {
      msg.delete()
      message.channel.createEmbed(new Eris.Embed().description(lang.minigames.general.gameCancelled).thumbnail(bot.user.avatarURL).color(0x7289DA))
      if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
      else delete games.get(message.guild.id)[message.author.id]
    }
    if (!currentGame.lobby.members.includes(user.id)) return;
    currentGame.lobby.emojis.splice(currentGame.lobby.members.indexOf(user.id), 1)
    currentGame.lobby.members.splice(currentGame.lobby.members.indexOf(user.id), 1)
    currentGame.lobby.memberUsername.splice(currentGame.lobby.members.indexOf(user.id), 1)
    currentGame.lobby.currentMembers--
    currentGame.lobby.members.push("Waiting...")

    currentGame.misc.confirm = 0
    let player2 = currentGame.lobby.memberUsername[1]
    if (!player2) player2 = `${lang.misc.waiting} <a:Loading:712097176313921548>`

    let player3 = currentGame.lobby.memberUsername[2]
    if (!player3) player3 = `${lang.misc.waiting} <a:Loading:712097176313921548>`

    let player4 = currentGame.lobby.memberUsername[3]
    
    if (!player4) player4 = `${lang.misc.waiting} <a:Loading:712097176313921548>`

    currentGame.lobby.maxedOut === false

    let emoji2 = "<:Player2:714906015694585877>"
let emoji3 = "<:Player3:714906015971278919>"
let emoji4 = "<:Player4:714906015966953552>"
  
  if (currentGame.lobby.emojis[1]) emoji2 = currentGame.lobby.emojis[1].P2
  if (currentGame.lobby.emojis[2]) emoji3 = currentGame.lobby.emojis[2].P3
  if (currentGame.lobby.emojis[3]) emoji4 = currentGame.lobby.emojis[3].P4

    if (currentGame.lobby.maxPlayers === 2) msg.edit({embed: {color: 0x7289DA, thumbnail: {url: bot.user.avatarURL}, title: lang.minigames.general.inLobby.replace("[GAME]", lang.gameTypes.quiz), description: `${P1Emoji.P1} ${lang.players.p1} - **${message.author.username} (${lang.misc.host})**\n\n${emoji2} ${lang.players.p2} - **${player2}**\n\n${lang.minigames.general.join.replace("[GAME]", lang.gameTypes.quiz)}\n\n${lang.minigames.general.leave.replace("[GAME]", lang.gameTypes.quiz)}`}})
    else  if (currentGame.lobby.maxPlayers === 3) msg.edit({embed: {color: 0x7289DA, thumbnail: {url: bot.user.avatarURL}, title: lang.minigames.general.inLobby.replace("[GAME]", lang.gameTypes.quiz), description:`${P1Emoji.P1} ${lang.players.p1} - **${message.author.username} (${lang.misc.host})**\n\n${emoji2} ${lang.players.p2} - **${player2}**\n\n${emoji3} ${lang.players.p3} - **${player3}**\n\n${lang.minigames.general.join.replace("[GAME]", lang.gameTypes.quiz)}\n\n${lang.minigames.general.leave.replace("[GAME]", lang.gameTypes.quiz)}`}})
    else if (currentGame.lobby.maxPlayers === 4) msg.edit({embed: {color: 0x7289DA, thumbnail: {url: bot.user.avatarURL}, title: lang.minigames.general.inLobby.replace("[GAME]", lang.gameTypes.quiz), description:`${P1Emoji.P1} ${lang.players.p1} - **${message.author.username} (${lang.misc.host})**\n\n${emoji2} ${lang.players.p2} - **${player2}**\n\n${emoji3} ${lang.players.p3} - **${player3}**\n\n${emoji4} ${lang.players.p4} - **${player4}**\n\n${lang.minigames.general.join.replace("[GAME]", lang.gameTypes.quiz)}\n\n${lang.minigames.general.leave.replace("[GAME]", lang.gameTypes.quiz)}`}})
  }
});

collector.on('end', collected => {
  if (games.get(message.guild.id) && games.get(message.guild.id)[message.author.id].misc.inLobby === false) return
  if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
  else delete games.get(message.guild.id)[message.author.id]
	if (msg) msg.edit({embed: {color: 0x7289DA, description: lang.minigames.general.timeOutLobby}})
});

  }
    });

};

exports.help = {
  name: "quiz",
  description: "Answer random trivia!",
  usage: "quiz [1 | 2 | 3 | 4]",
  category: "Minigames",
  emoji: "<:Quiz:735153182602297356>"
}

exports.aliases = ['startQuiz']