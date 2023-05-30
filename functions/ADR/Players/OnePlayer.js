const Eris = require('eris')
const { ReactionCollector, MessageCollector } = require("eris-collector");

module.exports = (bot, dmUser, currentGame, msg, games, prefix, message) => {
  redoRound(1, 1)
  function redoRound(round, turn) {
  const filter2 = (m, emoji2, userID2) => ['752604922826194984', '752604436685258822', '752604436437663795'].includes(emoji2.id) && userID2 !== bot.user.id

  const collector = new ReactionCollector(bot, msg, filter2, {
              time: 20000
  })
  
  collector.on('collect', async (m, emoji, userID) => {
    if (emoji.id === "752604922826194984") endGame(0, round, turn)
    if (emoji.id === "752604436685258822") endGame(1, round, turn)
    if (emoji.id === "752604436437663795") endGame(2, round, turn)
  });
  }
function endGame(type, round, turn) {
  let botPlay = ["Attack", "Defend", "Reflect"]
  let played = Math.floor(Math.random() * botPlay.length)
  if (turn === 1) played = 0
  if (currentGame.stats[1].def === 1 || currentGame.stats[1].ref > 0) played = 0

  let actionStr = "hi"
  
  // I KNOW THAT THIS IS A VERY POOR WAY OF DOING THIS, I JUST DONT KNOW HOW TO DO IT BETTER :/
  
  // If both Attack
  if (type === 0 && played === 0) {
    
    // P1 and P2 Load
    if (currentGame.stats[0].gun === 0 && currentGame.stats[1].gun === 0) {
      actionStr = `**${currentGame.lobby.memberUsername[0]}** loaded up their gun\n**${currentGame.lobby.members[1]}** loaded up their gun` 
      currentGame.stats[0].gun = 1
      currentGame.stats[1].gun = 1
      nextTurn(actionStr)
    }
    
    // P1 Shoot, P2 Load
    else if (currentGame.stats[0].gun === 1 && currentGame.stats[1].gun === 0) {
      actionStr = `**${currentGame.lobby.memberUsername[0]}** shot their gun\n**${currentGame.lobby.members[1]}** loaded up their gun\n\n**${currentGame.lobby.memberUsername[0]}** Won!`
      resetStats()
      currentGame.wins[0]++
    }
    
    // P1 Load, P2 Shoot
    else if (currentGame.stats[0].gun === 0 && currentGame.stats[1].gun === 1) {
      actionStr = `**${currentGame.lobby.memberUsername[0]}** loaded up their gun\n**${currentGame.lobby.members[1]}** shot their gun\n\n**${currentGame.lobby.members[1]}** won!`
      resetStats()
      
      currentGame.wins[1]++
    }
    
    // P1 and P2 Shoot
    else if (currentGame.stats[0].gun === 1 && currentGame.stats[1].gun === 1) {
      resetStats()
      actionStr = `**${currentGame.lobby.memberUsername[0]}** shot their gun\n**${currentGame.lobby.members[1]}** shot their gun\n\n**Tie!**`
    }
  }
  
  // P1 Attack, P2 Defend
  if (type === 0 && played === 1) {
    
    // P1 Load
    if (currentGame.stats[0].gun === 0) {
      actionStr = `**${currentGame.lobby.memberUsername[0]}** loaded up their gun\n**${currentGame.lobby.members[1]}** defended`
      currentGame.stats[0].gun = 1
    }
    
    // P1 Shoot
    else if (currentGame.stats[0].gun === 1) {
      actionStr = `**${currentGame.lobby.memberUsername[0]}** shot their gun\n**${currentGame.lobby.members[1]}** defended their attack`
      currentGame.stats[0].gun = 0
    }
    // Set cooldown on Defend
    currentGame.stats[1].def = 1
    nextTurn(actionStr)
  }
  
  // P1 Attacks, P2 Reflects
  if (type === 0 && played === 2) {
    // P1 Load Gun
    if (currentGame.stats[0].gun === 0) {
      actionStr = `**${currentGame.lobby.memberUsername[0]}** loaded up their gun\n**${currentGame.lobby.members[1]}** reflected`
      currentGame.stats[0].gun = 1
      currentGame.stats[1].ref = 2
      nextTurn(actionStr)
    }
    
    // P1 Shoot Gun
    else if (currentGame.stats[0].gun === 1) {
      actionStr = `**${currentGame.lobby.memberUsername[0]}** shot their gun\n**${currentGame.lobby.members[1]}** reflected their attack\n**${currentGame.lobby.members[1]}** won!`
      currentGame.wins[1]++
      resetStats()
    }
  }
  
  // P1 Defends, P2 Shoots
  if (type === 1 && played === 0) {
    
    // P2 Loads Gun
    if (currentGame.stats[1].gun === 0) {
      actionStr = `**${currentGame.lobby.members[1]}** loaded up their gun\n**${currentGame.lobby.memberUsername[0]}** defended`
      currentGame.stats[1].gun = 1
      nextTurn(actionStr)
    }
    
    // P2 Shoots Gun
    else if (currentGame.stats[1].gun === 1) {
      actionStr = `**${currentGame.lobby.members[1]}** shot their gun\n**${currentGame.lobby.memberUsername[0]}** defended their attack`
      currentGame.stats[1].gun = 0
      nextTurn(actionStr)
    }
  }
  
  // Both Defend
  if (type === 1 && played === 1) {
    actionStr = `**${currentGame.lobby.memberUsername[0]}** defended\n**${currentGame.lobby.members[1]}** defended`
    currentGame.stats[0].def = 0
    currentGame.stats[1].def = 0
    nextTurn(actionStr)
  }
  
  // P1 Defends, P2 Reflects
  if (type === 1 && played === 2) {
    actionStr = `**${currentGame.lobby.memberUsername[0]}** defended\n**${currentGame.lobby.members[1]}** reflected`
    currentGame.stats[0].def = 1
    currentGame.stats[1].ref = 2
    nextTurn(actionStr)
  }
  
  // P1 Reflects, P2 Shoots
  if (type === 2 && played === 0) {
    
    // P2 Loads Gun
    if (currentGame.stats[1].gun === 0) {
      actionStr = `**${currentGame.lobby.members[1]}** loaded up their gun\n**${currentGame.lobby.memberUsername[0]}** reflected`
      currentGame.stats[0].ref = 2
      currentGame.stats[1].gun = 1
      nextTurn(actionStr)
    }
    
    // P2 Shoots Gun
    else if (currentGame.stats[1].gun === 1) {
      actionStr = `**${currentGame.lobby.members[1]}** shot their gun\n**${currentGame.lobby.memberUsername[0]}** reflected their attack\n**${currentGame.lobby.memberUsername[0]}** won!`
      currentGame.wins[1]++
      resetStats()
    }
  }
  
  // P1 Reflects, P2 Defends
  if (type === 2 && played === 1) {
    actionStr = `**${currentGame.lobby.memberUsername[0]}** reflected\n**${currentGame.lobby.members[1]}** defended`
    currentGame.stats[0].ref = 2
    currentGame.stats[1].def = 1
    nextTurn(actionStr)
  }
  
  // Both Reflect
  if (type === 2 && played === 2) {
    actionStr = `**${currentGame.lobby.memberUsername[0]}** reflected\n**${currentGame.lobby.members[1]}** reflected`
    currentGame.stats[0].ref = 2
    currentGame.stats[1].ref = 2
    nextTurn(actionStr)
  }
  // dmUser.createMessage(actionStr)
}
  
  function resetStats() {
    currentGame.stats[0].gun = 0
    currentGame.stats[1].gun = 0
    currentGame.stats[0].def = 0
    currentGame.stats[1].def = 0
    currentGame.stats[0].ref = 0
    currentGame.stats[1].ref = 0
  }
  
  function nextTurn(actionStr) {
    msg.edit({embed: new Eris.Embed().color(0x7289DA).title("Attack Defend Reflect").description(`${actionStr}\n\nChoose whether to Attack your opponent, Defend the attack from your opponent, or to Reflect the attack from your opponent\n\n<:Attack:752604922826194984> - Attack\n<:Defend:752604436685258822> - Defend\n<:Reflect:752604436437663795> - Reflect\n\n${currentGame.lobby.emojis[0]} **${message.author.username}** - Waiting... <a:Loading:712097176313921548>\n<:CPU:723452091376467968> **${currentGame.lobby.members[1]} (CPU)** - Waiting for you! <a:Loading:712097176313921548>`).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png")})
  }
  
  function roundEnd() {
    
  }
}