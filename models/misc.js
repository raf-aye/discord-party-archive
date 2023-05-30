const mongoose = require('mongoose')

const guildSchema = new mongoose.Schema({
  voters: Array
})

module.exports = mongoose.model('Miscs', guildSchema);
