const Eris = require('eris');
const allowedToRun = new Set()
const guild = require('../../models/guild.js')
const { ReactionCollector, MessageCollector } = require("eris-collector");

exports.run = async (bot, message, args, prefix, games, lang) => {
    if (!message.member.hasPermission("manageGuild")) return 
    if (allowedToRun.has(message.author.id)) return
    
    if (games.get(message.guild.id) && Object.keys(games.get(message.guild.id)).length > 0) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(lang.commands.setlang.game))
    
    const embed = new Eris.Embed()
    .color(0x7289DA)
    .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
    .title(lang.commands.setlang.select)
    .description(`:flag_us: - English\n\n:flag_es: - Español (${lang.commands.setlang.translationBy} Lopa100#9762)\n\n:flag_it: - Italiano (${lang.commands.setlang.translationBy} Giuliopime#4965)`)
    const msg = await message.channel.createEmbed(embed)

    await msg.addReaction("🇺🇸")
    await msg.addReaction("🇪🇸")
    await msg.addReaction("🇮🇹")

    allowedToRun.add(message.author.id)
    let filter = (m, emoji, userID) => ['🇺🇸', '🇪🇸', '🇮🇹'].includes(emoji.name) && userID === message.author.id;

    const collector = new ReactionCollector(bot, msg, filter, {
                time: 120000
            })

collector.on('collect', async (m, emoji, userID) => {
  if (m.id !== msg.id) return;
  collector.stop()
  if (msg) msg.delete()

  let confirm = new Eris.Embed()
  .color(0x7289DA)
  .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
  .description("temp")
  guild.findOne({ id: message.guild.id}, (err, res) => {

  if (emoji.name === "🇺🇸") {
      if (res.lang.startsWith("en_US")) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.commands.setlang.alreadyChosen))
      confirm.description = "Sucessfully changed the language to English"
      guild.updateOne({id: message.guild.id}, {$set: {lang: "en_US"}}, function(err) { if (err) console.log(err) })
  }

  if (emoji.name === "🇪🇸") {
    if (res.lang.startsWith("es_EU")) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.commands.setlang.alreadyChosen))
      confirm.description = "Se ha cambiado el idioma a Español"
      guild.updateOne({id: message.guild.id}, {$set: {lang: "es_EU"}}, function(err) { if (err) console.log(err) })
  }
  
  if (emoji.name === "🇮🇹") {
      if (res.lang.startsWith("ita_IT")) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.commands.setlang.alreadyChosen))
      confirm.description = "Lingua impostata con successo ad Italiano"
      guild.updateOne({id: message.guild.id}, {$set: {lang: "ita_IT"}}, function(err) { if (err) console.log(err) })
  }

  message.channel.createEmbed(confirm)
});
});


collector.on('end', () => {
    allowedToRun.delete(message.author.id)
})

}

exports.help = {
    name: "setlang",
    description: "Sets the language for the bot in the server (Moderator Only)",
    usage: "setlang",
    category: "Utility",
    emoji: "📝"
}

exports.aliases = ["setlanguage"]