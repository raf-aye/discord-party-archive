const Eris = require('eris')
const lang = require('../lang/ita_IT.json')

module.exports = async (bot, games, guild, member) => {
  if (!games.get(guild.id)) return
 let game = Object.keys(games.get(guild.id)).filter(c => games.get(guild.id)[c].lobby.members.includes(member.user.id))
 if (game.length > 0) game = games.get(guild.id)[game]
 else return
 if (game.gameType === "Rock Paper Scissors" && game.misc.inLobby === false) {

    game.msgID.forEach(async (m, i) => {
    const user = game.lobby.members[i]
    if (user === "Waiting...") return;

    const dmUser = await bot.getDMChannel(user)
    const msg = await dmUser.getMessage(m)
    if (msg) msg.delete()
    dmUser.createMessage({embed: new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png").description(`${member.user.tag} ${lang.misc.membertLeftDM}`)})
  });
} else if (game.gameType === "Uno" && game.misc.inLobby === false) {
  game.lobby.members.forEach(async member => {
    if (member === "Waiting...") return;
    const dmUser = await bot.getDMChannel(member)
    dmUser.createMessage({embed: new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png").description(`${member.user.tag} ${lang.misc.memberLeftDM}`)})
  })
} else {
  const channel = guild.channels.get(game.channel)
  if (!channel) return
  const msg = await channel.getMessage(game.msgID)

  if (!msg) console.log("No Message")
  else {
    msg.delete()
    msg.channel.createMessage({embed: new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png").description(`${member.user.tag} ${lang.misc.memberLeft}`)})
}}
  if (Object.keys(games.get(guild.id)).length === 1) games.delete(guild.id)
  else delete games.get(guild.id)[game.lobby.host]
}