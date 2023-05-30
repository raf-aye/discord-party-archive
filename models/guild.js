const mongoose = require('mongoose')

const guildSchema = new mongoose.Schema({
  id: String,
  prefix: String,
  settings: Object,
  lang: String
})

module.exports = mongoose.model('Servers', guildSchema);
