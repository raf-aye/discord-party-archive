const Eris = require("eris");
const ReactionHandler = require('eris-reactions');
const winston = require('winston')



require('dotenv').config()
const bot = new Eris(process.env.BOT_TOKEN); 
require("eris-additions")(Eris) 

bot.commands = new Map()
bot.aliases = new Map()
bot.allowedToPlay = true

const games = new Map() 

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'log' }),
	],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});





require("fs").readdir("./events/", (err, files) => {
  if (err) return console.error(err);

  logger.log("info", `Loading ${files.length} Events!\n`);
  files.forEach((f, i) => {
    if (!f.endsWith(".js")) return;

    const event = require(`./events/${f}`);

    logger.log("info", `${i + 1}: ${f} loaded!\n`);

    let eventName = f.split(".")[0];

    bot.on(eventName, event.bind(null, bot, games));
    delete require.cache[require.resolve(`./events/${f}`)];
  });
});

const recursive = require("recursive-readdir");

recursive("./commands/", function (err, files) {
  if (err) console.error(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) {
    process.stdout.write("No Commands Listed\n".red);
    return;
  }

  logger.log("info", `\nLoading ${jsfiles.length} commands!`);

  jsfiles.forEach((f, i) => {
    delete require.cache[require.resolve(`./${f}`)];
    let props = require(`./${f}`);
    logger.log("info", `${i + 1}: ${f} loaded!`);
    bot.commands.set(props.help.name, props);
    props.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name);
    });
});
});

bot.on('messageCreate', message =>{
    if (message.author.bot) return;

 

  require('./models/guild.js').findOne({ id: message.channel.guild.id}, (err, res) => {

   let prefix = "dp?"
   let locale = "en_US"
   if (res && res.lang) locale = res.lang.replace(/\s+/g, '')

   const lang = require(`./lang/${locale}.json`)

    function hasPermission(permission) { 
      if (permission === "embed") return message.channel.createMessage(lang.errors.embed)
      if (permission === "reaction") return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(lang.errors.reaction))
      if (permission === "emojis") return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(lang.errors.emoji))
    }

   if (!message.guild.me.hasPermission("readMessages") || !message.guild.me.hasPermission("sendMessages") || !message.guild.me.hasPermission("readMessageHistory")) return
   if (!message.guild.me.hasPermission("embedLinks")) return hasPermission("embed")
   if (!message.guild.me.hasPermission("addReactions")) return hasPermission('reaction')
   if (!message.guild.me.hasPermission("externalEmojis")) return hasPermission('emojis')
  

  let messageArray = message.content.split(/\s+/g);
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if (!command.startsWith(prefix)) return;
  if (!message.guild.me.permission.has("embedLinks")) return message.channel.createMessage(lang.errors.embedLink)

  let cmd = bot.commands.get(command.slice(prefix.length).toLowerCase());
  let alias = bot.aliases.get(command.slice(prefix.length).toLowerCase());
  if (cmd) {
    message.guild = message.channel.guild
    message.author.tag = `${message.author.username}#${message.author.discriminator}`
    
    if (bot.allowedToPlay === false && cmd.help.category === "Minigames") return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(lang.misc.minigamesDown))
    const currentGame = games.get(message.guild.id)
    if (!currentGame) cmd.run(bot, message, args, prefix, games, lang)
    else if (Object.keys(currentGame).filter(u => currentGame[u].lobby.members.includes(message.author.id)).size > 0 && cmd.help.name !== "eval") return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.misc.inGame))
    else cmd.run(bot, message, args, prefix, games, lang)
  }

      if (alias) {
        message.guild = message.channel.guild
        message.author.tag = `${message.author.username}#${message.author.discriminator}`
        if (bot.allowedToPlay === false && cmd.help.category === "Minigames") return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(lang.misc.minigamesDown))

        const currentGame = games.get(message.guild.id)
        if (!currentGame) bot.commands.get(alias).run(bot, message, args, prefix, games, lang)
        else if (Object.keys(currentGame).filter(u => currentGame[u].lobby.members.includes(message.author.id)).size > 0 && cmd.help.name !== "eval") return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.misc.inGame))

        else bot.commands.get(alias).run(bot, message, args, prefix, games, lang)
    }
})
});

process.on('uncaughtException', error => logger.log('error', error));



bot.connect()
