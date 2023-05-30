const Eris = require('eris');
const user = require('../../models/user.js')

exports.run = (bot, message, args, prefix, games, lang) => {
  user.findOne({id: message.author.id}, (err, res) => {
    if (!res) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").description(lang.commands.logs.noAcc))
    const embed = new Eris.Embed()
    .color(0x7289DA)
    .title(`${message.author.username}'s Logs`)
    .thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1")
    
    res.logs.forEach((log, l) => {
      if (typeof log.players === "string") embed.field(`${l + 1}. ${lang.gameTypes[log.game]}`, `<:Player1:714906015912689685> ${message.author.username}`, true)
      else {
      let emoji, players = []
      
      log.players.forEach((member, i) => {
      if (i === 0) emoji = "<:Player1:714906015912689685>"
      if (i === 1) emoji = "<:Player2:714906015694585877>"
      if (i === 2) emoji = "<:Player3:714906015971278919>"
      if (i === 3) emoji = "<:Player4:714906015966953552>"
      players.push(`${emoji} ${member}`)
      })
      if (players.length === 1 && !["Matchup", "Hangman"].includes(log.game)) players[0] = `<:Player1:714906015912689685> ${message.author.username}\n<:CPU:723452091376467968> CPU`
      embed.field(`${l + 1}. ${lang.gameTypes[log.game]}`, `${players.join("\n")}`, true)
      }
    })
    message.channel.createEmbed(embed)
  })
}

exports.help = {
  name: "logs",
  description: "Shows the past 10 games you have played",
  usage: "logs",
  category: "Profile and Shop",
  emoji: "📜"
}

exports.aliases = ['log']