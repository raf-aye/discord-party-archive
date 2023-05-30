const Eris = require('eris');
const moveOn = require('./quizQuestion.js')
const { ReactionCollector, MessageCollector } = require("eris-collector");

module.exports = async (bot, message, currentGame, games, lang) => {
  if (!currentGame) return;
  if (!message.guild.me.permission.has("sendMessages")) return checkPermissions("Send Messages", "N/A")
  if (!message.guild.me.permission.has("readMessages")) return checkPermissions("Read Messages", "N/A")
  if (!message.guild.me.permission.has("embedLinks")) return checkPermissions("Embed Links", "message")
  if (!message.guild.me.permission.has("addReactions")) return checkPermissions("Add Reactions", "embed")

  const msg = await message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png").title(lang.minigames.quiz.title).description(`${lang.minigames.quiz.hostDesc.replace("[VOTES]", "0").replace("[MEMBERS]", currentGame.lobby.currentMembers)}`))
  msg.addReaction(":Yes:712036483694854164")
  currentGame.msgID = msg.id
  const filter = (m, emoji, userID) => ['712036483694854164'].includes(emoji.id) && currentGame.lobby.members.includes(userID)

const collector = new ReactionCollector(bot, msg, filter, {
    time: 25000
});


  let num = 0;
  let started = false
collector.on("collect", (m, emoji, userID) => {
  if (!collector) return;
  const reactionCollector = message.guild.members.get(userID).user
  if (emoji.id === "712036483694854164") {
    if (!currentGame.lobby.members.includes(reactionCollector.id)) return;
    num++
    if (currentGame.lobby.currentMembers === 1 && num === 1) {
      started = true
      collector.stop()
      moveOn(bot, message, currentGame, games)
      currentGame.msgID = ""
      msg.delete()
    }
    else if (currentGame.lobby.currentMembers === 2 &&  num === 1) {
      started = true
      collector.stop()
      moveOn(bot, message, currentGame, games)
      currentGame.msgID = ""
      msg.delete()
    }
    else if (currentGame.lobby.currentMembers === 3 && num === 2) {
      started = true
      collector.stop()
    moveOn(bot, message, currentGame, games)
    currentGame.msgID = ""
    msg.delete()
    }
    else if (currentGame.lobby.currentMembers === 4 && num === 3) {
      started = true
      collector.stop()
      moveOn(bot, message, currentGame, games)
      currentGame.msgID = ""
      msg.delete()
    }
    else msg.edit({embed: {color: 0x7289DA, thumbnail: {url: "https://cdn.discordapp.com/emojis/715385885222240277.png"}, title: lang.minigames.quiz.title, description: `${lang.minigames.quiz.hostDesc.replace("[VOTES]", num).replace("[MEMBERS]", currentGame.lobby.currentMembers)}`}})
  }
});

 collector.on('end', collected => {
   if (started === true) return;
   if (collected.size !== num + 1) {
     moveOn(bot, message, currentGame, games)
   }
 })

 function checkPermissions(permission, type) {
   if (type.toLowerCase() === "message") message.channel.createMessage(lang.minigames.quiz.noPerm.replace("[PERM]", `\`${permission}\``))
   else if (type.toLowerCase() === "embed") message.channel.createMessage({embed: {color: 0x7289DA, description: lang.minigames.quiz.noPerm.replace("[PERM]", "`Add Reactions`")}})

   if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
   else delete games.get(message.guild.id)[message.author.id]
 }
    }
