const Eris = require('eris')
const guild = require('../../models/guild.js')

exports.run = (bot, message, args, prefix, games, lang) => {
  if (!message.member.hasPermission("manageGuild")) return 
  

  guild.findOne({id: message.guild.id}, (err, res) => {
    if (!res) return message.channel.createEmbed(new Eris.Embed().thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").color(0x7289DA).description(lang.commands.setprefix.error))
    if (!args[0]) return message.channel.createEmbed(new Eris.Embed().thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").color(0x7289DA).description(lang.commands.setprefix.noPrefix))
    if (args.join(" ").length > 5) return message.channel.createEmbed(new Eris.Embed().thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").color(0x7289DA).description(lang.commands.setprefix.tooLong))
    if (/^[\x00-\x7F]*$/.test(args.join(" ")) === false) return message.channel.createEmbed(new Eris.Embed().thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").color(0x7289DA).description(lang.commands.setprefix.invalidChars))
    
    guild.updateOne({id: message.guild.id}, {$set: {prefix: args.join(" ")}}, function(err) {if (err) console.log(err)})
    message.channel.createEmbed(new Eris.Embed().thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").color(0x7289DA).description(lang.commands.setprefix.success.replace("[SERVER]", message.guild.name).replace("[PREFIX]", args.join(" "))))
  })
}

exports.help = {
  name: "setprefix",
  description: "Sets the prefix for the server (Moderator Only)",
  usage: "setprefix [prefix]",
  category: "Utility",
  emoji: "🤖"
}

exports.aliases = []