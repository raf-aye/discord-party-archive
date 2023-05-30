const Eris = require('eris');

exports.run = (bot, message, args, prefix, games, lang) => {
  const currentGames = games.get(message.guild.id)
  if (!currentGames) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.commands.listGames.noGames).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png"))
  const embed = new Eris.Embed()
  .color(0x7289DA)
  .title(lang.commands.listGames.currentGames.replace("[SERVER]", message.guild.name))
  .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png")

  Object.keys(currentGames).forEach((g, i) => {
    let game = currentGames[g]
    let players = []

    let lobbyCheck
    if (game.misc.inLobby === true) lobbyCheck = lang.commands.listGames.inLobby
    else lobbyCheck = lang.commands.listGames.inGame

    game.lobby.memberUsername.forEach((player, i) => {
      if (player === "Waiting...") return;
      players.push(`${game.lobby.emojis[i]} **${player}**`)
    })

    embed.field(`${i + 1}. **${lang.gameTypes[game.gameType]}** ${lobbyCheck}`, `${players.join("\n") || lang.commands.listGames.noPlayers}`, true)
  })
  message.channel.createEmbed(embed)
}

exports.help = {
  name: "listgames",
  description: "Lists all the games running in this server",
  usage: "listgames",
  category: "Utility",
  emoji: "📜"
}

exports.aliases = []
