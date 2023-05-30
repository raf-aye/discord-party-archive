const Eris = require('eris')
const { ReactionCollector, MessageCollector } = require("eris-collector");
const guild = require('../../models/guild.js')


exports.run = (bot, message, args) => {
  require('../../models/guild.js').findOne({id: message.guild.id}, async (err, res) => {
  if (!res) {
    new guild({id: message.guild.id, prefix: "dp!", settings: {channels: {connect4: ["Play Anywhere"], hangman: ["Play Anywhere"], matchup: ["Play Anywhere"], quiz: ["Play Anywhere"], ttt: ["Play Anywhere"], uno: ["Play Anywhere"] }}}).save()
    message.channel.createMessage("Your server has been setup for this command, please run it again!")
    return
  }

    let num = 0
    const channels = res.settings.channels
    Object.keys(channels).forEach((channel, i) => {
      if (channels[channel][0] !== "Play Anywhere") {
       channels[channel].forEach((c, e) => {
         if (!message.guild.channels.get(c)) {
           let str = `settings.channels.${channel}`
           let obj = {$pull: {[str]: c}}
           if (channels[channel].length === 1) obj = {$set: {[str]: ["Play Anywhere"]}}
           guild.updateOne({id: message.guild.id}, obj, function (err, res) { if (err) console.log(err) })
           if (num === 1) return;
           num = 1
          message.channel.createMessage("An error occurred... Please try the command again!")
         }
       })
      channels[channel] = channels[channel].map(c => `<#${c}>`)
      }
    })
    if (num === 1) return;
    const embed = new Eris.Embed()
    .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
    .color(0x7289DA).title(`${message.guild.name}'s Game Channel Settings`)
    .field("🔴 Connect 4", channels.connect4.join("\n"), true)
    .field("\u200b", "\u200b", true)
    .field("📝 Hangman", channels.hangman.join("\n"), true)
    .field("<:Matchup:735152886073393175> Matchup", channels.matchup.join("\n"), true)
    .field("\u200b", "\u200b", true)
    .field("<:Quiz:735153182602297356> Quiz", channels.quiz.join("\n"), true)
    .field("<:TicTacToe_X:717504662412066909> Tic Tac Toe", channels.ttt.join("\n"), true)
    .field("\u200b", "\u200b", true)
    .field("<:W4:731183284305789049> Uno", channels.uno.join('\n'), true)
    
    const msg = await message.channel.createEmbed(embed)
    
    
    await msg.addReaction(":Gear:761334895850553346")
    let filter = (m, emoji, userID) => emoji.id === "761334895850553346" && userID === message.author.id

 let collector = new ReactionCollector(bot, msg, filter, { time: 120000 });
    
collector.on("collect", (m, emoji, userID) => {
  if (emoji.id === "761334895850553346") {
    msg.delete()
    collector.stop()
    changeChannel()
  }
});
    
 async function changeChannel() {
      const changeEmbed = new Eris.Embed()
      .color(0x7289DA)
      .title("Which game would you like to set channels for?")
      .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
      .description("<:One:715114278008389683> - Connect 4\n<:Two:714905971843006566> - Hangman\n<:Three:714905972178550784> - Matchup\n<:Four:714905971817971812> - Quiz\n<:Five:725110718331879515> - Tic Tac Toe\n<:Six:725110718419959889> - Uno\n<:Seven:725110718164369429> - All")
      const changeMsg = await message.channel.createEmbed(changeEmbed)
      
      await changeMsg.addReaction(":One:715114278008389683")
      await changeMsg.addReaction(":Two:714905971843006566")
      await changeMsg.addReaction(":Three:714905972178550784")
      await changeMsg.addReaction(":Four:714905971817971812")
      await changeMsg.addReaction(":Five:725110718331879515")
      await changeMsg.addReaction(":Six:725110718419959889")
      await changeMsg.addReaction(":Seven:725110718164369429")
      let filter = (m, emoji, userID) => ["715114278008389683", "714905971843006566", "714905972178550784", "714905971817971812", "725110718331879515", "725110718419959889", "725110718164369429"].includes(emoji.id) && userID === message.author.id

      let collector = new ReactionCollector(bot, changeMsg, filter, { time: 120000 });
   
      collector.on('collect', (m, emoji, userID) => {
        collector.stop()
        changeMsg.delete()

        switch(emoji.id) {
          case "715114278008389683":
            addOrRemove("Connect 4", "connect4", "🔴")
            break;
            
          case "714905971843006566":
            addOrRemove("Hangman", "hangman", "📝")
            break;
            
          case "714905972178550784":
            addOrRemove("Matchup", "matchup", "<:Matchup:735152886073393175>")
            break;
            
          case "714905971817971812":
            addOrRemove("Quiz", 'quiz', "<:Quiz:735153182602297356>")
            break;
            
          case "725110718331879515":
            addOrRemove("Tic Tac Toe", "ttt", "<:TicTacToe_X:717504662412066909>")
            break;
            
          case "725110718419959889":
            addOrRemove("Uno", "uno", "<:W4:731183284305789049>")
            break;
        }
      })
    }
    async function addOrRemove(name, id, emoji) {
      guild.findOne({id: message.guild.id}, async (err, res) => {
        const embed = new Eris.Embed()
        .color(0x7289DA)
        .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
        .description(`Would you like to add (<:Yes:712036483694854164>) or remove (<:No:712036483967483975>) a channel from ${emoji} **${name}**'s list?`)
        

        if (res.settings.channels[id][0] === "Play Anywhere") return pickChannel(name, id, emoji)
        else {
        const msg = await message.channel.createEmbed(embed)
        msg.addReaction(":Yes:712036483694854164")
        msg.addReaction(":No:712036483967483975")
        }
      });
    }
    
    async function removeChannel(name, id, emoji) {
      guild.findOne({id: message.guild.id}, async (err, res) => {
        if (res.settings.channels[id][0] === "Play Anywhere") return
        const embed = new Eris.Embed()
        .color(0x7289DA)
        .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
        .description(`Would you like to add or remove a channel from ${emoji} **${name}**'s list?`)
        message.channel.createEmbed(embed)
      })
    }
    
    async function pickChannel(name, id, emoji) {
      guild.findOne({id: message.guild.id}, async (err, res) => {
        if (res.settings.channels[id].length > 3) return message.channel.createEmbed(new Eris.Embed().thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").color(0x7289DA).description("You already have 3 channels for this minigame! You cannot add anymore"))
        
      const embed = new Eris.Embed()
      .color(0x7289DA)
      .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
      .title("Setting Change")
      .description(`Please mention the channel that you want to **add** to ${emoji} ${name}!\n(Ex: <#${message.channel.id}>)\n\n**Waiting for a response <a:Loading:712097176313921548>**`)
      .footer("You have 30 Seconds to respond")
      const msg = await message.channel.createEmbed(embed)
    
    let filter = (m) => m.author.id === message.author.id;

    let collector = new MessageCollector(bot, message.channel, filter, { time: 30000 });
      
    collector.on("collect", async (m) => {
      msg.delete()
    if (m.channelMentions.length === 0) {
      collector.stop()
      message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description("You did not mention a channel, cancelling setting change"))
    }
      
    if (res.settings.channels[id].includes(m.channelMentions[0])) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description("That channel is already in the list!"))
    collector.stop()
    const embed = new Eris.Embed()
    .color(0x7289DA)
    .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
    .title("Success!")
    .description(`Sucessfully added <#${m.channelMentions[0]}> to the list of ${emoji} **${name}**'s list!\n\nIf you would like to move back to channel selection, react with <:One:715114278008389683>\n\nIf you would like to add more channels to **${name}**'s list, react with <:Two:714905971843006566>`)
    const msg2 = await message.channel.createEmbed(embed)
    await msg2.addReaction(":One:715114278008389683")
    await msg2.addReaction(":Two:714905971843006566")
      
      let str = `settings.channels.${id}`
      let obj = {$push: {[str]: m.channelMentions[0]}}
      if (res.settings.channels[id][0] === "Play Anywhere") obj = {'$set': {[str]: [m.channelMentions[0]] }}
      guild.updateOne({id: message.guild.id}, obj, function (err, res) { if (err) console.log(err) })
      
      let filter = (m, emoji, userID) => ["715114278008389683", "714905971843006566"].includes(emoji.id) && userID === message.author.id

      let collector2 = new ReactionCollector(bot, msg2, filter, { time: 15000 });
   
      collector2.on('collect', (m, emoji2, userID) => {
        msg2.delete()
        collector2.stop()
        if (emoji2.id === "715114278008389683") return changeChannel()
        if (emoji2.id === "714905971843006566") return pickChannel(name, id, emoji)
      });
    });
      });
      return
    }
   });
}

exports.help = {
  name: "settings",
  description: "Change the server's settings",
  usage: "settings",
  category: "Utility"
}

exports.aliases = []