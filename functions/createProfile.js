
const Eris = require('eris')

module.exports = (bot, id, username, tokens, wins, plays, logs, gameType) => {
    new require('../models/user.js')({
        id: id,
        emoji: {P1: "<:Player1:714906015912689685>", P2: "<:Player2:714906015694585877>", P3: "<:Player3:714906015971278919>", P4: "<:Player4:714906015966953552>"},
        tokens: tokens,
        wins: wins,
        plays: plays,
        logs: logs,
        ownedIcons: ["Default"]
        }).save()

    bot.executeWebhook("737839011925590087", "m-8MaqrceIQQOjD3eAVuDQdYlD65Fr8iAE-4C6xAiNCtYDVcYgC6vv3YxtWgIVa_r-UO", {embeds: [new Eris.Embed().color(0x7289DA).title("New Profile Created!").thumbnail().description(`**User** - ${username}\n**Game Created On** - ${gameType}`)]})
}