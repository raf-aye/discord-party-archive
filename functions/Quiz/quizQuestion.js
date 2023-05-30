const Eris = require('eris');
const fetch = require('node-fetch');
const { ReactionCollector, MessageCollector } = require("eris-collector");

function capitalize_Words(str) {
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

const markdownEscape = function(text) {
   return text.replace(/((\_|\*|\~|\`|\|){2})/g, '\\$1');
};

Object.filter = (obj, predicate) =>
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

const objectMap = (obj, fn) =>
  Object.fromEntries(
  Object.entries(obj).map(
    ([k, v], i) => [k, fn(v, k, i)]
    )
    )

module.exports = async (bot, message, currentGame, games, lang) => {
  const msg = await message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png").description(lang.minigames.quiz.confirm))
 setTimeout(() => {
   msg.delete()
   run(1)
}, 1000)
function run (num) {
  if (!currentGame) return;
  currentGame.msgID = ""
  if (msg.deleted === false) msg.delete()
  if (!message.guild.me.permission.has("sendMessages")) return checkPermissions("Send Messages", "N/A")
  if (!message.guild.me.permission.has("readMessages")) return checkPermissions("Read Messages", "message")
  if (!message.guild.me.permission.has("embedLinks")) return checkPermissions("Embed Links", "message")
  if (!message.guild.me.permission.has("addReactions")) return checkPermissions("Add Reactions", "embed")

 require('node-fetch')("https://opentdb.com/api.php?amount=10000&type=multiple", {
 method: "GET",
 headers: { 'Content-Type': 'application/json' }
 }).then(async res => {
   const bod = await res.json()
   let question = bod.results[Math.floor(Math.random() * bod.results.length)]

   let answers = [question.correct_answer, question.incorrect_answers[0], question.incorrect_answers[1], question.incorrect_answers[2]]
   for(let i = answers.length - 1; i > 0; i--){
 const j = Math.floor(Math.random() * i)
 const temp = answers[i]
 answers[i] = answers[j]
 answers[j] = temp
 }
 question.correct_answer = markdownEscape(require('he').decode(question.correct_answer))
 answers[0] = markdownEscape(require('he').decode(answers[0]))
 answers[1] = markdownEscape(require('he').decode(answers[1]))
 answers[2] = markdownEscape(require('he').decode(answers[2]))
 answers[3] = markdownEscape(require('he').decode(answers[3]))

 question.question = markdownEscape(require('he').decode(question.question))
  if (currentGame.lobby.currentMembers === 1) currentGame.questions.push({question: num, name: question.question, correct: question.correct_answer, incorrect: question.incorrect_answers, players: [{answered: "Unknown", correct: "Unknown", name: message.guild.members.find(m => m.user.id ===currentGame.lobby.members[0]).user.username, player: "P1"}]})
 if (currentGame.lobby.currentMembers === 2) currentGame.questions.push({question: num, name: question.question, correct: question.correct_answer, incorrect: question.incorrect_answers, players: [{answered: "Unknown", correct: "Unknown", name: message.guild.members.find(m => m.user.id ===currentGame.lobby.members[0]).user.username, player: "P1"}, {answered: "Unknown", correct: "Unknown", name: message.guild.members.find(m => m.user.id ===currentGame.lobby.members[1]).user.username, player: "P2"}]})
 if (currentGame.lobby.currentMembers === 3) currentGame.questions.push({question: num, name: question.question, correct: question.correct_answer, incorrect: question.incorrect_answers, players: [{answered: "Unknown", correct: "Unknown", name: message.guild.members.find(m => m.user.id ===currentGame.lobby.members[0]).user.username, player: "P1"}, {answered: "Unknown", correct: "Unknown", name: message.guild.members.find(m => m.user.id ===currentGame.lobby.members[1]).user.username, player: "P2"}, {answered: "Unknown", correct: "Unknown", name: message.guild.members.find(m => m.user.id ===currentGame.lobby.members[2]).user.username, player: "P3"}]})
 if (currentGame.lobby.currentMembers === 4) currentGame.questions.push({question: num, name: question.question, correct: question.correct_answer, incorrect: question.incorrect_answers, players: [{answered: "Unknown", correct: "Unknown", name: message.guild.members.find(m => m.user.id ===currentGame.lobby.members[0]).user.username, player: "P1"}, {answered: "Unknown", correct: "Unknown", name: message.guild.members.find(m => m.user.id ===currentGame.lobby.members[1]).user.username, player: "P2"}, {answered: "Unknown", correct: "Unknown", name: message.guild.members.find(m => m.user.id ===currentGame.lobby.members[2]).user.username, player: "P3"}, {answered: "Unknown", correct: "Unknown", name: message.guild.members.find(m => m.user.id ===currentGame.lobby.members[3]).user.username, player: "P4"}]})
   let embed = new Eris.Embed()
   .color(0x7289DA)
   .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png")
   .title(lang.minigames.quiz.question.replace("[NUM]", num))
   .description(`${question.question}\n\n<:One:715114278008389683> - **${answers[0]}**\n\n<:Two:714905971843006566> - **${answers[1]}**\n\n<:Three:714905972178550784> - **${answers[2]}**\n\n<:Four:714905971817971812> - **${answers[3]}**`)
   .field(lang.minigames.quiz.category, `**${question.category}**`, true)
   .field("\u200b", "\u200b", true)
   .field(lang.minigames.quiz.difficulty, `**${capitalize_Words(question.difficulty)}**`, true)
   .field("\u200b", "<a:Loading:699476392651391076> **20 Seconds** Remaining")
   const msg2 = await message.channel.createEmbed(embed)
   msg2.addReaction(":One:715114278008389683").then(() => msg2.addReaction(":Two:714905971843006566").then(() => msg2.addReaction(":Three:714905972178550784").then(() => msg2.addReaction(":Four:714905971817971812"))))

   const filter = (m, emoji, userID) => {
     return ['715114278008389683', '714905971843006566', '714905972178550784', '714905971817971812'].includes(emoji.id) && currentGame.lobby.members.includes(userID)
   };

   let collector = new ReactionCollector(bot, msg2, filter, {
            time: 20000
  });


   currentGame.msgID = msg2.id

   setTimeout(function () {
     embed.fields[3] = {value: `<a:Loading:699476392651391076> ${lang.minigames.quiz.timeLeft.replace("[TIME]", "10")}`, name: "\u200b", inline: false}
     msg2.edit({embed: embed})
     setTimeout(function () {
       embed.fields[3] = {value: `<a:Loading:699476392651391076> ${lang.minigames.quiz.timeLeft.replace("[TIME]", "5")}`, name: "\u200b", inline: false}
       msg2.edit({embed: embed})
     }, 5000)
   }, 10000)
 collector.on('collect', async (m, emoji, userID) => {
   if (!currentGame) return;
   const reactionCollector = message.guild.members.get(userID).user
   let player;
   if (currentGame.lobby.members[0] === reactionCollector.id) player = "P1"
   else if (currentGame.lobby.members[1] === reactionCollector.id) player = "P2"
   else if (currentGame.lobby.members[2] === reactionCollector.id) player = "P3"
   else if (currentGame.lobby.members[3] === reactionCollector.id) player = "P4"
   else return;
   let playerNum
   if (currentGame.lobby.members[0] === reactionCollector.id) playerNum = 0
   else if (currentGame.lobby.members[1] === reactionCollector.id) playerNum = 1
   else if (currentGame.lobby.members[2] === reactionCollector.id) playerNum = 2
   else if (currentGame.lobby.members[3] === reactionCollector.id) playerNum = 3
   else return;
   if (emoji.id === "715114278008389683") {
     if (answers[0] === question.correct_answer) currentGame.questions[num - 1].players[playerNum] = {answered: answers[0], correct: "Yes", name: reactionCollector.name, player: player}
     else currentGame.questions[num - 1].players[playerNum] = {answered: answers[0], correct: "No", name: reactionCollector.username, player: player}
   }
   if (emoji.id === "714905971843006566") {
     if (answers[1] === question.correct_answer) currentGame.questions[num - 1].players[playerNum] = {answered: answers[1], correct: "Yes", name: reactionCollector.username, player: player}
     else currentGame.questions[num - 1].players[playerNum] = {answered: answers[1], correct: "No", name: reactionCollector.username, player: player}
   }
   if (emoji.id === "714905972178550784") {
     if (answers[2] === question.correct_answer) currentGame.questions[num - 1].players[playerNum] = {answered: answers[2], correct: "Yes", name: reactionCollector.username, player: player}
     else currentGame.questions[num - 1].players[playerNum] = {answered: answers[2], correct: "No", name: reactionCollector.username, player: player}
   }
   if (emoji.id === "714905971817971812") {
     if (answers[3] === question.correct_answer) currentGame.questions[num - 1].players[playerNum] = {answered: answers[3], correct: "Yes", name: reactionCollector.username, player: player}
     else currentGame.questions[num - 1].players[playerNum] = {answered: answers[3], correct: "No", name: reactionCollector.username, player: player}
   }

   const reacted = currentGame.questions[num - 1].players.filter(a => a.answered !== "Unknown").length
   console.log(reacted)
   if (currentGame.lobby.currentMembers === reacted) collector.stop()
 });
 collector.on('end', collected => {
  if (!games.get(message.guild.id) || !games.get(message.guild.id)[message.author.id]) return;
   currentGame.msgID = ""
   msg2.delete()
   let correct = currentGame.questions[num - 1].players.filter(u => u.correct === "Yes") || "None"
   let incorrect = currentGame.questions[num - 1].players.filter(u => u.correct === "No") || "None"
   let unanswered = currentGame.questions[num - 1].players.filter(u => u.correct === "Unknown") || "None"

   if (correct.length === 0) correct = "None"
   if (incorrect.length === 0) incorrect = "None"
   if (unanswered.length === 0) unanswered = "None"


   let correctPeople = []
   let incorrectPeople = []
   let unansweredPeople = []

   let correctPlayer = []
   let incorrectPlayer = []

   if (typeof correct === "array" || typeof correct === "object") {
     correct.forEach((player, i) => {
     if (player.player === "P1") {
       correctPeople.push(`${currentGame.lobby.emojis[0]} ${player.name} (+250 ${lang.minigames.quiz.points})`)
       correctPlayer.push("P1")
     }
     else if (player.player === "P2") {
       correctPeople.push(`${currentGame.lobby.emojis[1]} ${player.name} (+250 ${lang.minigames.quiz.points})`)
       correctPlayer.push("P2")
     }
     else if (player.player === "P3") {
       correctPeople.push(`${currentGame.lobby.emojis[2]} ${player.name} (+250 ${lang.minigames.quiz.points})`)
       correctPlayer.push("P3")
     }
     else if (player.player === "P4") {
       correctPeople.push(`${currentGame.lobby.emojis[3]} ${player.name} (+250 ${lang.minigames.quiz.points})`)
       correctPlayer.push("P4")
     }
   });
   correct = correctPeople.join("\n")
   }
   if (typeof incorrect === "array" || typeof incorrect === "object") {
     incorrect.forEach((player, i) => {
     if (player.player === "P1") {
       incorrectPeople.push(`${currentGame.lobby.emojis[0]} ${player.name} (+50 ${lang.minigames.quiz.points})`)
       incorrectPlayer.push("P1")
     }
     else if (player.player === "P2") {
       incorrectPeople.push(`${currentGame.lobby.emojis[1]} ${player.name} (+50 ${lang.minigames.quiz.points})`)
       incorrectPlayer.push("P2")
     }
     else if (player.player === "P3") {
       incorrectPeople.push(`${currentGame.lobby.emojis[2]} ${player.name} (+50 ${lang.minigames.quiz.points}s)`)
       incorrectPlayer.push("P3")
     }
     else if (player.player === "P4") {
       incorrectPeople.push(`${currentGame.lobby.emojis[3]} ${player.name} (+50 ${lang.minigames.quiz.points})`)
       incorrectPlayer.push("P4")
     }
   });
   incorrect = incorrectPeople.join("\n")
   }
   if (typeof unanswered === "array" || typeof unanswered === "object") {
     unanswered.forEach((player, i) => {
     if (player.player === "P1") {
       unansweredPeople.push(`${currentGame.lobby.emojis[0]} ${player.name} (+0 ${lang.minigames.quiz.points})`)
       currentGame.misc.afkStreak[0]++
     }
     else if (player.player === "P2") {
       unansweredPeople.push(`${currentGame.lobby.emojis[1]} ${player.name} (+0 ${lang.minigames.quiz.points})`)
       currentGame.misc.afkStreak[1]++
     }
     else if (player.player === "P3") {
       unansweredPeople.push(`${currentGame.lobby.emojis[2]} ${player.name} (+0 ${lang.minigames.quiz.points})`)
       currentGame.misc.afkStreak[2]++
     }
     else if (player.player === "P4") {
       unansweredPeople.push(`${currentGame.lobby.emojis[3]} ${player.name} (+0 ${lang.minigames.quiz.points})`)
       currentGame.misc.afkStreak[3]++
     }
   });
   unanswered = unansweredPeople.join("\n")
   }

   correctPlayer.forEach(player => {
     if (player === "P1") {
       currentGame.stats.forEach((plr, i) => {
       if (plr.player === 1) {
         currentGame.stats[i].points = currentGame.stats[i].points + 250
         currentGame.misc.afkStreak[0] = 0
       }
       else return;
     });
   };
      if (player === "P2") {
        currentGame.stats.forEach((plr, i) => {
        if (plr.player === 2) {
          currentGame.stats[i].points = currentGame.stats[i].points + 250
          currentGame.misc.afkStreak[1] = 0
        }
        else return;
      });
     }
     else if (player === "P3") {
       currentGame.stats.forEach((plr, i) => {
       if (plr.player === 3) {
         currentGame.stats[i].points = currentGame.stats[i].points + 250
         currentGame.misc.afkStreak[2] = 0
       }
       else return;
     });
     }
     else if (player === "P4") {
       currentGame.stats.forEach((plr, i) => {
       if (plr.player === 4) {
         currentGame.stats[i].points = currentGame.stats[i].points + 250
         currentGame.misc.afkStreak[3] = 0
       }
       else return;
     });
     }
   })
   incorrectPlayer.forEach(player => {
     if (player === "P1") {
       currentGame.stats.forEach((plr, i) => {
       if (plr.player === 1) {
         currentGame.stats[i].points = currentGame.stats[i].points + 50
         currentGame.misc.afkStreak[0] = 0
       }
       else return;
     });
    }
     else if (player === "P2") {
       currentGame.stats.forEach((plr, i) => {
       if (plr.player === 2) {
         currentGame.stats[i].points = currentGame.stats[i].points + 50
         currentGame.misc.afkStreak[1] = 0
       }
       else return;
     });
     }
     else if (player === "P3") {
       currentGame.stats.forEach((plr, i) => {
       if (plr.player === 3) {
         currentGame.stats[i].points = currentGame.stats[i].points + 50
         currentGame.misc.afkStreak[2] = 0
       }
       else return;
     });
     }
     else if (player === "P4") {
       currentGame.stats.forEach((plr, i) => {
       if (plr.player === 4) {
         currentGame.stats[i].points = currentGame.stats[i].points + 50
         currentGame.misc.afkStreak[3] = 0
       }
       else return;
     });
     }
   })


   const leaderboard = currentGame.stats.sort(function(a, b) {return b.points-a.points})
   let board = []
   leaderboard.forEach((player, i) => {
     if (player.player === 1) {
      if (i === 0) board.push({str: `🥇 ${message.guild.members.find(m => m.user.id === currentGame.lobby.members[0]).user.username} - **${player.points} ${lang.minigames.quiz.points}**`, user: message.guild.members.find(m => m.user.id === currentGame.lobby.members[0]).user.username,id:message.guild.members.find(m => m.user.id === currentGame.lobby.members[0]).user.id, player: 1, points: player.points, emoji: currentGame.lobby.emojis[0]})
      else if (i === 1) board.push({str: `🥈 ${message.guild.members.find(m => m.user.id === currentGame.lobby.members[0]).user.username} - **${player.points} ${lang.minigames.quiz.points}**`, user: message.guild.members.find(m => m.user.id === currentGame.lobby.members[0]).user.username, id:message.guild.members.find(m => m.user.id === currentGame.lobby.members[0]).user.id,player: 1, points: player.points, emoji: currentGame.lobby.emojis[0]})
      else if (i === 2) board.push({str: `🥉 ${message.guild.members.find(m => m.user.id === currentGame.lobby.members[0]).user.username} - **${player.points} ${lang.minigames.quiz.points}**`, user: message.guild.members.find(m => m.user.id === currentGame.lobby.members[0]).user.username, id:message.guild.members.find(m => m.user.id === currentGame.lobby.members[0]).user.id,player: 1, points: player.points, emoji: currentGame.lobby.emojis[0]})
      else if (i === 3) board.push({str: `💢 ${message.guild.members.find(m => m.user.id === currentGame.lobby.members[0]).user.username} - **${player.points} ${lang.minigames.quiz.points}**`, user: message.guild.members.find(m => m.user.id === currentGame.lobby.members[0]).user.username, id:message.guild.members.find(m => m.user.id === currentGame.lobby.members[0]).user.id,player: 1, points: player.points, emoji: currentGame.lobby.emojis[0]})
      }
      else if (player.player === 2) {
       if (i === 0) board.push({str: `🥇 ${message.guild.members.find(m => m.user.id === currentGame.lobby.members[1]).user.username} - **${player.points} ${lang.minigames.quiz.points}**`, user: message.guild.members.find(m => m.user.id === currentGame.lobby.members[1]).user.username, id:message.guild.members.find(m => m.user.id === currentGame.lobby.members[1]).user.id,player: 2, points: player.points, emoji: currentGame.lobby.emojis[1]})
       else if (i === 1) board.push({str: `🥈 ${message.guild.members.find(m => m.user.id === currentGame.lobby.members[1]).user.username} - **${player.points} ${lang.minigames.quiz.points}**`, user: message.guild.members.find(m => m.user.id === currentGame.lobby.members[1]).user.username, id:message.guild.members.find(m => m.user.id === currentGame.lobby.members[1]).user.id,player: 2, points: player.points, emoji: currentGame.lobby.emojis[1]})
       else if (i === 2) board.push({str: `🥉 ${message.guild.members.find(m => m.user.id === currentGame.lobby.members[1]).user.username} - **${player.points} ${lang.minigames.quiz.points}**`, user: message.guild.members.find(m => m.user.id === currentGame.lobby.members[1]).user.username, id:message.guild.members.find(m => m.user.id === currentGame.lobby.members[1]).user.id,player: 2, points: player.points, emoji: currentGame.lobby.emojis[1]})
       else if (i === 3) board.push({str: `💢 ${message.guild.members.find(m => m.user.id === currentGame.lobby.members[1]).user.username} - **${player.points} ${lang.minigames.quiz.points}**`, user: message.guild.members.find(m => m.user.id === currentGame.lobby.members[1]).user.username, id:message.guild.members.find(m => m.user.id === currentGame.lobby.members[1]).user.id,player: 2, points: player.points, emoji: currentGame.lobby.emojis[1]})
       }
       else if (player.player === 3) {
        if (i === 0) board.push({str: `🥇 ${message.guild.members.find(m => m.user.id === currentGame.lobby.members[2]).user.username} - **${player.points} ${lang.minigames.quiz.points}**`, user: message.guild.members.find(m => m.user.id === currentGame.lobby.members[2]).user.username, id:message.guild.members.find(m => m.user.id === currentGame.lobby.members[2]).user.id,player: 3, points: player.points, emoji: currentGame.lobby.emojis[2]})
        else if (i === 1) board.push({str: `🥈 ${message.guild.members.find(m => m.user.id === currentGame.lobby.members[2]).user.username} - **${player.points} ${lang.minigames.quiz.points}**`, user: message.guild.members.find(m => m.user.id === currentGame.lobby.members[2]).user.username, id:message.guild.members.find(m => m.user.id === currentGame.lobby.members[2]).user.id,player: 3, points: player.points, emoji: currentGame.lobby.emojis[2]})
        else if (i === 2) board.push({str: `🥉 ${message.guild.members.find(m => m.user.id === currentGame.lobby.members[2]).user.username} - **${player.points} ${lang.minigames.quiz.points}**`, user: message.guild.members.find(m => m.user.id === currentGame.lobby.members[2]).user.username, id:message.guild.members.find(m => m.user.id === currentGame.lobby.members[2]).user.id,player: 3, points: player.points, emoji: currentGame.lobby.emojis[2]})
        else if (i === 3) board.push({str: `💢 ${message.guild.members.find(m => m.user.id === currentGame.lobby.members[2]).user.username} - **${player.points} ${lang.minigames.quiz.points}**`, user: message.guild.members.find(m => m.user.id === currentGame.lobby.members[2]).user.username, id:message.guild.members.find(m => m.user.id === currentGame.lobby.members[2]).user.id,player: 3, points: player.points, emoji: currentGame.lobby.emojis[2]})
        }
        else if (player.player === 4) {
         if (i === 0) board.push({str: `🥇 ${message.guild.members.find(m => m.user.id === currentGame.lobby.members[3]).user.username} - **${player.points} ${lang.minigames.quiz.points}**`, user: message.guild.members.find(m => m.user.id === currentGame.lobby.members[3]).user.username, id:message.guild.members.find(m => m.user.id === currentGame.lobby.members[3]).user.id, player: 4, points: player.points, emoji: currentGame.lobby.emojis[3]})
         else if (i === 1) board.push({str: `🥈 ${message.guild.members.find(m => m.user.id === currentGame.lobby.members[3]).user.username} - **${player.points} ${lang.minigames.quiz.points}**`, user: message.guild.members.find(m => m.user.id === currentGame.lobby.members[3]).user.username, id:message.guild.members.find(m => m.user.id === currentGame.lobby.members[3]).user.id, player: 4, points: player.points, emoji: currentGame.lobby.emojis[3]})
         else if (i === 2) board.push({str: `🥉 ${message.guild.members.find(m => m.user.id === currentGame.lobby.members[3]).user.username} - **${player.points} ${lang.minigames.quiz.points}**`, user: message.guild.members.find(m => m.user.id === currentGame.lobby.members[3]).user.username, id:message.guild.members.find(m => m.user.id === currentGame.lobby.members[3]).user.id, player: 4, points: player.points, emoji: currentGame.lobby.emojis[3]})
         else if (i === 3) board.push({str: `💢 ${message.guild.members.find(m => m.user.id === currentGame.lobby.members[3]).user.username} - **${player.points} ${lang.minigames.quiz.points}**`, user: message.guild.members.find(m => m.user.id === currentGame.lobby.members[3]).user.username, id:message.guild.members.find(m => m.user.id === currentGame.lobby.members[3]).user.id, player: 4, points: player.points, emoji: currentGame.lobby.emojis[3]})
         }

   })
   const end = new Eris.Embed()
   .color(0x7289DA)
   .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png")
   .description(lang.minigames.quiz.answer.replace("[ANSWER]", question.correct_answer))
   .field(lang.minigames.quiz.gotCorrect, `**${correct}**`, true)
   .field("\u200b", "\u200b", true)
   .field(lang.minigames.quiz.gotWrong, `**${incorrect}**`, true)
   if (unanswered !== "None") end.field(lang.minigames.quiz.unanswered, `**${unanswered}**`, true)


   if (num <= 4) {
     end.field(lang.minigames.quiz.leaderboard, board.map(m => m.str).join("\n"))
     end.field(lang.minigames.quiz.nextRound, "<a:5Seconds:715403934180573235>")
     message.channel.createEmbed(end).then(m => {
       currentGame.msgID = m.id
       setTimeout(function () {
         m.delete()
         run(num + 1)
       }, 5000)
     });
   } else {
     end.title("Game Over!")
     if (currentGame.misc.afkStreak[0] > 2 && currentGame.lobby.currentMembers !== 1) {
       end.field('\u200b', lang.minigames.quiz.noPlay)
       message.channel.createEmbed(end)
       return;
     }
     if (currentGame.lobby.currentMembers === 1) {
       require('../../models/user.js').findOne({id: message.author.id}, (err, res) => {
       let tokens = Math.round(board[0].points / 10 - 50)
       if (tokens < 11) tokens = 10
       end.field(`🏆 ${lang.minigames.tokensEarned.replace("[TOKENS]", tokens)}`, `${lang.minigames.pointsEarned.replace("[POINTS]", board[0].points)}`)
       if (!res) require('../createProfile.js')(bot, message.author.id, message.author.username, tokens, {connect4: 0, quiz: 0, rps: 0, ttt: 0, uno: 0}, {connect4: 0, hangman: 0, matchup: 0, quiz: 1, rps: 0, ttt: 0, uno: 0}, [{players: currentGame.lobby.memberUsername, points: board[0].points, game: "Quiz"}], "Quiz")
      else if (res) require('../addTokens.js')(message.author.id, res, tokens, 0, {players: currentGame.lobby.memberUsername, points: board[0].points, game: "Quiz"}, "quiz")
       message.channel.createEmbed(end)
       if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
       else delete games.get(message.guild.id)[message.author.id]
     });
     return;
     }
     if (currentGame.lobby.currentMembers === 2) {
       end.field(`\u200b`, `🏆 **${board[0].user} ${lang.misc.won}!** - +50 ${lang.misc.tokenCap}`)

       if (currentGame.misc.afkStreak[1] > 2) {
         end.field("\u200b", `🥈 **${board[1].user}** - ${lang.minigames.quiz.afk}`)
       }
       else end.field("\u200b", `🥈 **${board[1].user}** - +30 ${lang.misc.tokenCap}`)
     }

     else if (currentGame.lobby.currentMembers === 3) {
       end.field(`\u200b`, `🏆 **${board[0].user} won!** - +70 ${lang.misc.tokenCap}`)

       if (currentGame.misc.afkStreak[1] > 2) {
         end.field("\u200b", `🥈 **${board[1].user}** - ${lang.minigames.quiz.afk}`)
       } else end.field("\u200b", `🥈 **${board[1].user}** - +50 ${lang.misc.tokenCap}`)

       if (currentGame.misc.afkStreak[2] > 2) {
         end.field("\u200b", `🥉 **${board[2].user}** - ${lang.minigames.quiz.afk}`)
       } else end.field("\u200b", `🥉 **${board[2].user}** - +30 ${lang.misc.tokenCap}`)

     }

     else if (currentGame.lobby.currentMembers === 4) {
       end.field(`\u200b`, `🏆 **${board[0].user} won!** - +70 ${lang.misc.tokenCap}`)

       if (currentGame.misc.afkStreak[1] > 2) {
         end.field("\u200b", `🥈 **${board[1].user}** - ${lang.minigames.quiz.afk}`)
       } else end.field("\u200b", `🥈 **${board[1].user}** - +50 ${lang.misc.tokenCap}`)

       if (currentGame.misc.afkStreak[2] > 2) {
         end.field("\u200b", `🥉 **${board[2].user}** - ${lang.minigames.quiz.afk}`)
       } else end.field("\u200b", `🥉 **${board[2].user}** - +30 ${lang.misc.tokenCap}`)
       if (currentGame.misc.afkStreak[3] > 2) {
         end.field("\u200b", `💢 **${board[2].user}** - ${lang.minigames.quiz.afk}`)
       } else end.field("\u200b", `💢 **${board[2].user}** - +10 ${lang.misc.tokenCap}`)
     }

     message.channel.createEmbed(end)
     board.forEach((plr, i) => {
         require('../../models/user.js').findOne({id: plr.id}, (err, res) => {
           let wins = 0
           let tokens = 0
           if (i === 0) {
             wins = 1
             if (currentGame.lobby.currentMembers === 2 && currentGame.misc.afkStreak[0] <= 2) tokens = 50
             if (currentGame.lobby.currentMembers === 3 && currentGame.misc.afkStreak[0] <= 2) tokens = 70
             if (currentGame.lobby.currentMembers === 4 && currentGame.misc.afkStreak[0] <= 2) tokens = 70
           }
           if (i === 1)  {
             if (currentGame.lobby.currentMembers === 2 && currentGame.misc.afkStreak[1] <= 2) tokens = 30
             if (currentGame.lobby.currentMembers === 3 && currentGame.misc.afkStreak[1] <= 2) tokens = 50
             if (currentGame.lobby.currentMembers === 4 && currentGame.misc.afkStreak[1] <= 2) tokens = 50
           }
           if (i === 2)  {
             if (currentGame.lobby.currentMembers === 3 && currentGame.misc.afkStreak[2] <= 2) tokens = 30
             if (currentGame.lobby.currentMembers === 4 && currentGame.misc.afkStreak[2] <= 2) tokens = 30
           }
           if (i === 3 && currentGame.lobby.currentMembers === 4 && currentGame.misc.afkStreak[3] <= 2) tokens = 10

           let points = []
           if (currentGame.lobby.currentMembers === 2) points = [board[0].points, board[1].points]
           else if (currentGame.lobby.currentMembers === 2) points = [board[0].points, board[1].points, board[2].points]
           else if (currentGame.lobby.currentMembers === 2) points = [board[0].points, board[1].points, board[2].points, board[3].points]
           if (!res) require('../createProfile.js')(bot, plr.id, message.author.username, tokens, {connect4: 0, quiz: wins, rps: 0, ttt: 0, uno: 0}, {connect4: 0, hangman: 0, matchup: 0, quiz: 1, rps: 0, ttt: 0, uno: 0}, [{players: currentGame.lobby.memberUsername, points: points, game: "Quiz"}], "Quiz")
      else if (res) require('../addTokens.js')(plr.id, res, tokens, wins, {players: currentGame.lobby.memberUsername, points: points, game: "Quiz"}, "quiz")
         })
       });
       if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
       else delete games.get(message.guild.id)[message.author.id]
   }
       return;
     })
   });
 }

 function checkPermissions(permission, type) {
  if (type.toLowerCase() === "message") message.channel.createMessage(lang.minigames.quiz.noPerm.replace("[PERM]", `\`${permission}\``))
  else if (type.toLowerCase() === "embed") message.channel.createMessage({embed: {color: 0x7289DA, description: lang.minigames.quiz.noPerm.replace("[PERM]", "`Add Reactions`")}})

   if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
   else delete games.get(message.guild.id)[message.author.id]
 }
};
