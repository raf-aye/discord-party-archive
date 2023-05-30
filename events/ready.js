
require('dotenv').config()
const mongoose = require('mongoose')

const DBL = require('dblapi.js');
const express = require('express');
const http = require('http');



module.exports = (bot, games, ready) => {
const app = express();
var server = require('http').createServer(app);

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

const dbl = new DBL(process.env.DBL_TOKEN, { webhookServer: listener, webhookAuth: "DiscordPartyTest"})

dbl.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});
dbl.webhook.on('vote', async vote => {
  const user = await bot.getDMChannel(vote.user)
  if (!user) return;
  const date = new Date();

  require('../models/misc.js').updateOne({}, {$push: {voters: {id: vote.user, expires: date.setHours(date.getHours() + 12)} }}, function (err, res) {if (err) console.log(err) })
  user.createMessage("Hello!")
});
  
  bot.options.defaultImageFormat = "png"
  bot.options.defaultImageSize = 256

  
  process.stdout.write(require('chalk').green(`Ready for launch! Partying with ${bot.guilds.size} servers!\n\nStarted on ${require('dateformat')(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT")}\n`))
  bot.editStatus("online", {name: `Partying with ${bot.guilds.size} servers! | dp!`})
  mongoose.connect(process.env.CON_STR, {useNewUrlParser: true, useUnifiedTopology: true});

  setInterval(() => {
  bot.editStatus("online", {name: `Partying with ${bot.guilds.size} servers! | dp!`})
  }, 600000)
}
