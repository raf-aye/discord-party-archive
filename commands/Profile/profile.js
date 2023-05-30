const Eris = require('eris')
const { ReactionCollector, MessageCollector } = require("eris-collector");
const allowedToRun = new Set()

exports.run = async (bot, message, args, prefix, games, lang) => {
  if (allowedToRun.has(message.author.id)) return
  let user = message.mentions[0] 
  if (args.join(" ")) user = message.mentions[0] || message.guild.members.find(u => u.user.username === args.join(" ").toLowerCase()) || message.guild.members.get(args[0]) || message.guild.members.find(u => `${u.user.username}#${u.user.discriminator}` === args.join(" ").toLowerCase())
  if (!user) user = message.author
  require('../../models/user.js').findOne({id: user.id}, async (err, res) => {
  if (!res) {
  if (user.id === message.author.id) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").description(lang.commands.profile.noAcc))
  else return  message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").description(lang.commands.profile.noMentionAcc))
  }
  const plays = res.plays
  const wins = res.wins
  let ownedIcons = []
  res.ownedIcons.forEach(icon => {
    if (icon === "Pog") ownedIcons.push({emoji: `<:P1Pog:704927337749282846>`, name: `${lang.icons.pog}`})
    if (icon === "Moyai") ownedIcons.push({emoji: `<:P1Moyai:705206642861539378>`, name: `Moyai`})
    if (icon === "Cheems") ownedIcons.push({emoji: `<:P1Cheems:704935355958296616>`, name: `${lang.icons.cheems}`})
    if (icon === "Party Face") ownedIcons.push({emoji: `<:P1PartyFace:705014373726289921>`, name: `${lang.icons.partyface}`})
    if (icon === "Party Popper") ownedIcons.push({emoji: `<:P1PartyPopper:705020918086369311>`, name: `${lang.icons.partypop}`})
    if (icon === "Reverse") ownedIcons.push({emoji: `<:P1Reverse:705065414413123675>`, name: `${lang.icons.reverse}`})
    if (icon === "Kappa") ownedIcons.push({emoji: `<:P1Kappa:738093263168471203>`, name: `${lang.icons.kappa}`})
    if (icon === "Heart") ownedIcons.push({emoji: `💙`, name: `${lang.icons.heart}`})
    if (icon === "Square") ownedIcons.push({emoji: `🟦`, name: `${lang.icons.square}`})
    if (icon === "Star") ownedIcons.push({emoji: '<:P1Star:821594403646210068>', name: lang.icons.star})
    if (icon === "Music Note") ownedIcons.push({emoji: '<:P1Note:821597026852536320>', name: lang.icons.note})
    if (icon === "Cog") ownedIcons.push({emoji: '<:P1Cog:821597003963957258>', name: lang.icons.cog})
    if (icon === "Leaf") ownedIcons.push({emoji: '<:P1Leaf:821777518993473626>', name: lang.icons.leaf})
    if (icon === "Crab") ownedIcons.push({emoji: '<:P1Crab:821593499606188092>', name: lang.icons.crab})
    if (icon === "Menacing") ownedIcons.push({emoji: '<:P1Menacing:821782153556656188>', name: lang.icons.menacing})
    if (icon === "Gift") ownedIcons.push({emoji: "<:P1Gift:821795446053535794>", name: lang.icons.gift})
    if (icon === "Cake") ownedIcons.push({emoji: "<:P1Cake:821791149773422603>", name: lang.icons.cake})
    if (icon === "Sus") ownedIcons.push({emoji: "<:P1Sus:821776614446202892>", name: lang.icons.sus})
  
  
  })
  ownedIcons.push({emoji: `<:Player1:714906015912689685>`, name: `${lang.icons.default}`})
    
  let icon = res.emoji.P1
  
  if (icon === "<:Player1:714906015912689685>") icon = `<:Player1:714906015912689685> ${lang.icons.default}`
  if (icon === "<:P1Pog:704927337749282846>") icon = `<:P1Pog:704927337749282846> ${lang.icons.pog}`
  if (icon === "<:P1Moyai:705206642861539378>") icon = "<:P1Moyai:705206642861539378> Moyai"
  if (icon === "<:P1Cheems:704935355958296616>") icon = `<:P1Cheems:704935355958296616> ${lang.icons.cheems}`
  if (icon === "<:P1PartyFace:705014373726289921>") icon = `<:P1PartyFace:705014373726289921> ${lang.icons.partyface}`
  if (icon === "<:P1PartyPopper:705020918086369311>") icon = `<:P1PartyPopper:705020918086369311> ${lang.icons.partypop}`
  if (icon === "<:P1Reverse:705065414413123675>") icon = `<:P1Reverse:705065414413123675> ${lang.icons.reverse}`
  if (icon === "<:P1Kappa:738093263168471203>") icon = `<:P1Kappa:738093263168471203> ${lang.icons.kappa}`
  if (icon === "💙") icon = `💙 ${lang.icons.heart}`
  if (icon === "🟦") icon = `🟦 ${lang.icons.square}`
  if (icon === "<:P1Star:821594403646210068>") icon = `<:P1Star:821594403646210068> ${lang.icons.star}`
  if (icon === "<:P1Note:821597026852536320>") icon = `<:P1Note:821597026852536320> ${lang.icons.note}`
  if (icon === "<:P1Cog:821597003963957258>") icon = `<:P1Cog:821597003963957258> ${lang.icons.cog}`
  if (icon === "<:P1Leaf:821777518993473626>") icon = `<:P1Leaf:821777518993473626> ${lang.icons.leaf}`
  if (icon === "<:P1Crab:821593499606188092>") icon = `<:P1Crab:821593499606188092> ${lang.icons.crab}`
  if (icon === "<:P1Menacing:821782153556656188>") icon = `<:P1Menacing:821782153556656188> ${lang.icons.menacing}`
  if (icon === "<:P1Gift:821795446053535794>") icon = `<:P1Gift:821795446053535794> ${lang.icons.gift}`
  if (icon === "<:P1Cake:821791149773422603>") icon = `<:P1Cake:821791149773422603> ${lang.icons.cake}`
  if (icon === "<:P1Sus:821776614446202892>") icon = `<:P1Sus:821776614446202892> ${lang.icons.sus}`

    
  const playTotal = plays.connect4 + plays.hangman + plays.matchup + plays.quiz + plays.rps + plays.ttt + plays.uno
  const winTotal = wins.connect4 + wins.quiz + wins.rps + wins.ttt + wins.uno
  
  const embed = new Eris.Embed()
  .title(lang.commands.profile.profile.replace("[USER]", user.username))
  .color(0x7289DA)
  .footer(lang.commands.profile.note)
  .thumbnail(user.avatarURL)
  .field(lang.commands.profile.plays.replace("[TOTAL]", playTotal), `**${lang.gameTypes.connect4}**: ${plays.connect4}\n**${lang.gameTypes.hangman}**: ${plays.hangman}\n**${lang.gameTypes.matchup}**: ${plays.matchup}\n**${lang.gameTypes.quiz}**: ${plays.quiz}\n**${lang.gameTypes.rps}**: ${plays.rps}\n**${lang.gameTypes.ttt}**: ${plays.ttt}\n**${lang.gameTypes.uno}**: ${plays.uno}`, true)
  .field("\u200b", "\u200b", true)
  .field(lang.commands.profile.wins.replace("[TOTAL]", winTotal), `**${lang.gameTypes.connect4}**: ${wins.connect4}\n**${lang.gameTypes.quiz}**: ${wins.quiz}\n**${lang.gameTypes.rps}**: ${wins.rps}\n**${lang.gameTypes.ttt}**: ${wins.ttt}\n**${lang.gameTypes.uno}**: ${wins.uno}`, true)
  .field(lang.commands.profile.current, icon, true)
  .field("\u200b", "\u200b", true)
  .field(lang.misc.tokenCap, `**${res.tokens}** ${lang.misc.tokenCap}`, true)
  const msg = await message.channel.createEmbed(embed)
  
  await msg.addReaction("⬅️")
  await msg.addReaction("⏹️")
  await msg.addReaction("➡️")
  allowedToRun.add(message.author.id)

  const embed2 = new Eris.Embed()
  .title(lang.commands.profile.profile.replace("[USER]", user.username))
  .color(0x7289DA)
  .thumbnail(user.avatarURL)

  ownedIcons.forEach(i => {
    embed2.field(`${i.emoji} ${i.name}`, `\u200b`, true)
  })

  let page = 1
  let filter = (m, emoji, userID) => ['⬅️', '➡️', '⏹️'].includes(emoji.name) && userID === message.author.id;

  const collector = new ReactionCollector(bot, msg, filter, {
                time: 180000
  })

collector.on('collect', async (m, emoji, userID) => {
  if (emoji.name === "⬅️") {
    if (message.guild.me.hasPermission("manageMessages")) msg.removeReaction("⬅️", message.author.id)
    if (page === 1) return
    page = 1
    msg.edit({embed: embed})
  }
  if (emoji.name === "➡️") {
    if (message.guild.me.hasPermission("manageMessages")) msg.removeReaction("➡️", message.author.id)
    if (page === 2) return
    page = 2
    msg.edit({embed: embed2})
  }
  if (emoji.name === "⏹️") {
    page = "Finished"
    msg.delete()
    collector.stop()
  }
});

collector.on("end", () => {
  allowedToRun.delete(message.author.id)
  if (page === "Finished") return
  msg.edit({embed: new Eris.Embed().color(0x7289DA).description(lang.misc.timeOut)})
})
  })
}

exports.help = {
  name: "profile",
  description: "Lets you see your or another person's stats",
  usage: "profile <user>",
  category: "Profile and Shop",
  emoji: "🔰"
}

exports.aliases = [] 