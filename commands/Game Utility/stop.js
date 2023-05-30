const Eris = require('eris');

exports.run = async (bot, message, args, prefix, games, lang) => {
const currentGames = games.get(message.guild.id)
if (!currentGames) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.commands.stop.noGames).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png"))
if (!message.member.hasPermission("manageGuild") && Object.keys(currentGames).filter(u => currentGames[u].lobby.host === message.author.id).length === 0) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png").description(lang.commands.stop.noPerm))

if (!Number(args[0])) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail('https://cdn.discordapp.com/emojis/715385885222240277.png').description(lang.commands.stop.provideNum))

let game = Object.keys(currentGames)[Number(args[0]) - 1]
if (!game) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png").description(lang.commands.stop.invalidNum.replace("[PREFIX]", prefix)))
game = currentGames[game]
console.log(game)
if (game.lobby.host !== message.author.id && !message.member.hasPermission("manageGuild")) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png").description(lang.commands.stop.stopOther))
if (game.gameType === "Rock Paper Scissors" && game.misc.inLobby === false) {

    game.msgID.forEach(async (m, i) => {
    const user = game.lobby.members[i]
    if (user === "Waiting...") return;

    const dmUser = await bot.getDMChannel(user)
    const msg = await dmUser.getMessage(m)
    if (msg) msg.delete()
    dmUser.createMessage({embed: new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png").description(`${message.author.tag} ` + lang.commands.stop.cancelDMGame)})
  });
} else if (game.gameType === "Uno" && game.misc.inLobby === false) {
  game.lobby.members.forEach(async member => {
    if (member === "Waiting...") return;
    const dmUser = await bot.getDMChannel(member)
    dmUser.createMessage({embed: new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png").description(`${message.author.tag} ` + lang.commands.stop.cancelDMGame)})
  })
} else {
  const channel = message.guild.channels.get(game.channel)
  if (!channel) return
  const msg = await channel.getMessage(game.msgID)

  if (!msg) console.log("No Message")
  else {
    msg.delete()
    msg.channel.createMessage({embed: new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png").description(`${message.author.tag} ` + lang.commands.stop.cancelGame.replace("[GAME]", game.gameType))})
}}

message.channel.createMessage({embed: new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png").description(lang.commands.stop.success.replace("[HOST]", game.lobby.memberUsername[0]).replace("[GAME]", game.gameType))})
if (Object.keys(games.get(message.guild.id)).length === 1) games.delete(message.guild.id)
else delete games.get(message.guild.id)[game.lobby.host]

}

exports.help = {
  name: "stop",
  description: "Stops a game that is running (Moderator and Game Hosts Only)",
  usage: "stop [Game ID]",
  category: "Utility",
  emoji: "🛑"
}

exports.aliases = []
