const Eris = require('eris')
const { ReactionCollector, MessageCollector } = require("eris-collector");
const allowedToRun = new Set()

exports.run = async (bot, message, args, prefix, games, lang) => {
  if (allowedToRun.has(message.author.id)) return
  const embed = new Eris.Embed()
  .color(0x7289DA)
  .title(lang.commands.shop.title)
  .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
  .description(lang.commands.shop.info.replace("[PREFIX]", prefix))
  .footer(lang.commands.shop.page.replace("[PAGE]", "1"))
  .field(`🟦 ${lang.icons.square}\n(${prefix}buy Square)\n100 ${lang.misc.tokenCap}`, `🟦 ${lang.players.p1}\n🟥 ${lang.players.p2}\n🟩 ${lang.players.p3}\n🟨 ${lang.players.p4}`, true)
  .field(`💙 ${lang.icons.heart}\n(${prefix}buy Heart)\n150 ${lang.misc.tokenCap}`, `💙 ${lang.players.p1}\n❤️ ${lang.players.p2}\n💚 ${lang.players.p3}\n💛 ${lang.players.p4}`, true)
  .field(`<:P1Reverse:705065414413123675> ${lang.icons.reverse}\n(${prefix}buy Reverse)\n250 ${lang.misc.tokenCap}`, `<:P1Reverse:705065414413123675> ${lang.players.p1}\n<:P2Reverse:705065767472857220> ${lang.players.p2}\n<:P3Reverse:705065767690960958> ${lang.players.p3}\n<:P4Reverse:705065768173436960> ${lang.players.p4}`, true)
  .field(`<:P1PartyPopper:705020918086369311> ${lang.icons.partypop}\n(${prefix}buy Popper)\n350 ${lang.misc.tokenCap}`, `<:P1PartyPopper:705020918086369311> ${lang.players.p1}\n<:P2PartyPopper:705020918208135168> ${lang.players.p2}\n<:P3PartyPopper:705021568564068373> ${lang.players.p3}\n<:P4PartyPopper:705021938183045171> ${lang.players.p4}`, true)
  .field(`<:P1PartyFace:705014373726289921> ${lang.icons.partyface}\n(${prefix}buy PartyFace)\n400 ${lang.misc.tokenCap}`, `<:P1PartyFace:705014373726289921> ${lang.players.p1}\n<:P2PartyFace:705017317918244903> ${lang.players.p2}\n<:P3PartyFace:705016151272456193> ${lang.players.p3}\n<:P4PartyFace:705017949248815174> ${lang.players.p4}`, true)
  .field(`<:P1Cheems:704935355958296616> ${lang.icons.cheems}\n(${prefix}buy Cheems)\n600 ${lang.misc.tokenCap}`, `<:P1Cheems:704935355958296616> ${lang.players.p1}\n<:P2Cheems:704935721412198451> ${lang.players.p2}\n<:P3Cheems:704935954636472390> ${lang.players.p3}\n<:P4Cheems:704936146223890482> ${lang.players.p4}`, true)
  .field(`<:P1Moyai:705206642861539378> Moyai\n(${prefix}buy Moyai)\n700 ${lang.misc.tokenCap}`, `<:P1Moyai:705206642861539378> ${lang.players.p1}\n<:P2Moyai:705207046529876008> ${lang.players.p2}\n<:P3Moyai:705207653017583676> ${lang.players.p3}\n<:P4Moyai:705210214781157406> ${lang.players.p4}`, true)
  .field(`<:P1Kappa:738093263168471203> ${lang.icons.kappa}\n(${prefix}buy Kappa)\n800 ${lang.misc.tokenCap}`, `<:P1Kappa:738093263168471203> ${lang.players.p1}\n<:P2Kappa:738093252632117249> ${lang.players.p2}\n<:P3Kappa:738093265777066005> ${lang.players.p3}\n<:P4Kappa:738093253424971886> ${lang.players.p4}`, true)
  .field(`<:P1Pog:704927337749282846> ${lang.icons.pog}\n(${prefix}buy Pog)\n1,000 ${lang.misc.tokenCap}`, `<:P1Pog:704927337749282846> ${lang.players.p1}\n<:P2Pog:704927635133956127> ${lang.players.p2}\n<:P3Pog:704927919222292500> ${lang.players.p3}\n<:P4Pog:704928175561375744> ${lang.players.p4}`, true)
  const msg = await message.channel.createEmbed(embed)

  await msg.addReaction("⬅️")
  await msg.addReaction("⏹️")
  await msg.addReaction("➡️")
  allowedToRun.add(message.author.id)

  const embed2 = new Eris.Embed()
  .color(0x7289DA)
  .title(lang.commands.shop.title)
  .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
  .description(lang.commands.shop.info.replace("[PREFIX]", prefix))
  .footer(lang.commands.shop.page.replace("[PAGE]", "2"))
  .field(`<:P1Star:821594403646210068> Star\n(${prefix}buy Star)\n100 ${lang.misc.tokenCap}`, `<:P1Star:821594403646210068> ${lang.players.p1}\n<:P2Star:821594403604267020> ${lang.players.p2}\n<:P3Star:821594403381837837> ${lang.players.p3}\n<:P4Star:821594403768500225> ${lang.players.p4}`, true)
  .field(`<:P1Note:821597026852536320> Music Note\n(${prefix}buy Note)\n150 ${lang.misc.tokenCap}`, `<:P1Note:821597026852536320> ${lang.players.p1}\n<:P2Note:821597026466398221> ${lang.players.p2}\n<:P3Note:821597026877046840> ${lang.players.p3}\n<:P4Note:821597026932359228> ${lang.players.p4}`, true)
  .field(`<:P1Cog:821597003963957258> Cog\n(${prefix}buy Cog)\n300 ${lang.misc.tokenCap}`, `<:P1Cog:821597003963957258> ${lang.players.p1}\n<:P2Cog:821597003707711499> ${lang.players.p2}\n<:P3Cog:821597004006031370> ${lang.players.p3}\n<:P4Cog:821597004017827840> ${lang.players.p4}`, true)
  .field(`<:P1Leaf:821777518993473626> Leaf\n(${prefix}buy Leaf)\n400 ${lang.misc.tokenCap}`, `<:P1Leaf:821777518993473626> ${lang.players.p1}\n<:P2Leaf:821777518998585374> ${lang.players.p2}\n<:P3Leaf:821777574454886462> ${lang.players.p3}\n<:P4Leaf:821777574812188724> ${lang.players.p4}`, true)
  .field(`<:P1Menacing:821782153556656188> Menacing\n(${prefix}buy Menacing)\n600 ${lang.misc.tokenCap}`, `<:P1Menacing:821782153556656188> ${lang.players.p1}\n<:P2Menacing:821782153611968562> ${lang.players.p2}\n<:P3Menacing:821782153774759938> ${lang.players.p3}\n<:P4Menacing:821782153997844490> ${lang.players.p4}`, true)
  .field(`<:P1Gift:821795446053535794> Gift\n(${prefix}buy Gift)\n700 ${lang.misc.tokenCap}`, `<:P1Gift:821795446053535794> ${lang.players.p1}\n<:P2Gift:821795445717467136> ${lang.players.p2}\n<:P3Gift:821795445478129695> ${lang.players.p3}\n<:P4Gift:821795445452963911> ${lang.players.p4}`, true)
  .field(`<:P1Crab:821593499606188092> Crab\n(${prefix}buy Crab)\n900 ${lang.misc.tokenCap}`, `<:P1Crab:821593499606188092> ${lang.players.p1}\n<:P2Crab:821593500105048095> ${lang.players.p2}\n<:P3Crab:821593499967291392> ${lang.players.p3}\n<:P4Crab:821593499840938014> ${lang.players.p4}`, true)
  .field(`<:P1Cake:821791149773422603> Cake\n(${prefix}buy Cake)\n1,200 ${lang.misc.tokenCap}`, `<:P1Cake:821791149773422603> ${lang.players.p1}\n<:P2Cake:821792084729790504> ${lang.players.p2}\n<:P3Cake:821792402821873694> ${lang.players.p3}\n<:P4Cake:821792671844532234> ${lang.players.p4}`, true)
  .field(`<:P1Sus:821776614446202892> Sus\n(${prefix}buy Sus)\n1,500 ${lang.misc.tokenCap}`, `<:P1Sus:821776614446202892> ${lang.players.p1}\n<:P2Sus:821776614714245202> ${lang.players.p2}\n<:P3Sus:821776615288995900> ${lang.players.p3}\n<:P4Sus:821776615188463646> ${lang.players.p4}`, true)
  
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
  msg.edit({embed: new Eris.Embed().color(0x7289DA).description("Timed Out")})
})
}

exports.help = {
  name: "shop",
  description: "A shop where you can buy icons that display in game and in the lobby",
  usage: "shop",
  category: "Profile and Shop",
  emoji: "🏧"
}

exports.aliases = []