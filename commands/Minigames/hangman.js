const Eris = require('eris');
const authorSchema = require('../../models/user.js')
const moveOn = require('../../functions/Hangman/startGame.js')

const { ReactionCollector, MessageCollector } = require("eris-collector");

exports.run = async (bot, message, args, prefix, games, lang) => {
  let currentGame
  if (games.get(message.guild.id) && games.get(message.guild.id)[message.author.id]) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.minigames.general.inGame))
  if (games.get(message.guild.id) && Object.keys(games.get(message.guild.id)).filter(u => games.get(message.guild.id)[u].lobby.members.includes(message.author.id)).length > 0) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.minigames.general.inGame))
  if (games.get(message.guild.id) && Object.keys(games.get(message.guild.id)).length >= 10) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.minigames.general.maxGames))
  if (games.get(message.guild.id) && Object.keys(games.get(message.guild.id)).filter(e => games.get(message.guild.id)[e].channel === message.channel.id).length > 0) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.minigames.general.gameInChannel))

  authorSchema.findOne({id: message.author.id}, async (err, res) => {
  let emoji1;
  if (!res) emoji1 = '<:Player1:714906015912689685>'
  else emoji1 = res.emoji.P1

    const msg = await message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.minigames.general.confirmSingle.replace("[GAME]", lang.gameTypes.hangman)))
    msg.addReaction(":Yes:712036483694854164").then(() => msg.addReaction(":No:712036483967483975"))

    let filter = (m, emoji, userID) => ['712036483694854164', '712036483967483975'].includes(emoji.id) && userID === message.author.id;

    const collector2 = new ReactionCollector(bot, msg, filter, {
                time: 300000
            })

collector2.on('collect', async (m, emoji, userID) => {
  if (m.id !== msg.id) return;
  if (emoji.id === "712036483694854164") {
    if (games.get(message.guild.id) && Object.keys(games.get(message.guild.id)).filter(u => games.get(message.guild.id)[u].lobby.members.includes(message.author.id)).length > 0) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.minigames.general.inGame2)).then(msg => setTimeout(function() {msg.delete()}, 3000))

    let gameObj = {}
    gameObj[message.author.id] = {
    gameType: "Hangman",
    lobby: {host: message.author.id, members: [message.author.id], memberUsername: [message.author.username], emojis: [emoji1], maxPlayers: 1, maxedOut: false, currentMembers: 1},
    channel: message.channel.id,
    stats: {matches: 0},
    misc: {ownerTriedStart: 0, triedJoining: [], sentMessage: [], afkStreak: [0, 0], inLobby: false, played: 0, cooldown: false},
    board: `  +---+
  |   |
      |
      |
      |
      |
=========`,
    stage: 0,
    wordInfo: {seen: [], word: "", splitWord: [], definition: ""}, // all will be filled later
    guessed: [],
    incorrect: ["None"],
    correct: [],
    msgID: ""
  }

    if (!games.get(message.guild.id)) games.set(message.guild.id, gameObj)
    else Object.assign(games.get(message.guild.id), gameObj)

    msg.delete()
    collector2.stop()
    bot.executeWebhook("737839838295883846", "Uv6kTscp1imCDD0rauJTeYqRygeQdPrW90cjuEj7_gXpIRN23DUbLHH0jtfeJWUwsO_y", {embeds: [new Eris.Embed().title("New Game Started").thumbnail(bot.user.avatarURL).color(0x7289DA).timestamp().description(`**Game Type** - Hangman\n**Server** - ${message.guild.name}\n**Players**:\n\n${games.get(message.guild.id)[message.author.id].lobby.memberUsername.map((u, i) => `${games.get(message.guild.id)[message.author.id].lobby.emojis[i]} ${u}`).join('\n')}`)]})
    moveOn(bot, message, games.get(message.guild.id)[message.author.id], games, prefix, lang)
  } else if (emoji.id === "712036483967483975") {
    msg.delete()
    collector2.stop()
    message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.minigames.general.cancel.replace("[GAME]", lang.gameTypes.hangman)))
  }
});

collector2.on('end', collected => {
  if (games.get(message.guild.id) && games.get(message.guild.id)[message.author.id].misc.inLobby === false) return
  if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
  else delete games.get(message.guild.id)[message.author.id]
  if (msg) msg.edit({embed: new Eris.Embed().color(0x7289DA).description(lang.minigames.general.timeOutLobby)})
})
});
};

exports.help = {
  name: "hangman",
  description: "Try to guess the word, and not let the man hang!",
  usage: "hangman",
  category: "Minigames",
  emoji: "📝"
}

exports.aliases = ['startHangman']
