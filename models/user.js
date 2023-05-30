const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  id: String,
  emoji: Object,
  tokens: Number,
  wins: Object,
  plays: Object,
  earnedAchievements: Array,
  achievements: Array,
  logs: Array,
  ownedIcons: Array
})

const user = mongoose.model('Users', guildSchema);
module.exports = user;


module.exportUser = function(id) {
  guild.findOne({id: id}, (err, res) => {
    if (err) return console.log(err);
    if (!res) return createUser();
  })
}

module.createUser = function(id) {
  new require('../models/user.js')({
    id: id,
    emoji: {P1: "<:Player1:714906015912689685>", P2: "<:Player2:714906015694585877>", P3: "<:Player3:714906015971278919>", P4: "<:Player4:714906015966953552>"},
    tokens: 0,
    wins: 0,
    plays: {},
    logs: [],
    ownedIcons: ["Default"]
    }).save()

bot.executeWebhook("737839011925590087", "m-8MaqrceIQQOjD3eAVuDQdYlD65Fr8iAE-4C6xAiNCtYDVcYgC6vv3YxtWgIVa_r-UO", {embeds: [new Eris.Embed().color(0x7289DA).title("New Profile Created!").thumbnail().description(`**User** - ${username}\n**Game Created On** - ${gameType}`)]})
}



