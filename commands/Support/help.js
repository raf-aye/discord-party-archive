
const recursive = require("recursive-readdir");
const Eris = require('eris')
const allowedToRun = new Set()

const { ReactionCollector, MessageCollector } = require("eris-collector");

exports.run = async (bot, message, args, prefix, games, lang) => {
  if (allowedToRun.has(message.author.id)) return
 args = args[0]
   let utility = []
   let support = []
   let profile = []
  if (!args) {

recursive("./commands/", async function (err, files) {

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  jsfile.forEach((f, i) => {
    let props = require(`../../${f}`);
    if (f.startsWith("commands\\Utility") || f.startsWith("commands/Utility") || f.startsWith("commands\\Game Utility") || f.startsWith("commands/Game Utility")) utility.push(`${props.help.emoji} \`${props.help.name}\` - ${lang.commands[props.help.name].description}`)
    if (f.startsWith("commands\\Support") || f.startsWith("commands/Support")) support.push(`${props.help.emoji} \`${props.help.name}\` - ${lang.commands[props.help.name].description}`)
    if (f.startsWith("commands\\Profile") || f.startsWith("commands/Profile")) profile.push(`${props.help.emoji} \`${props.help.name}\` - ${lang.commands[props.help.name].description}`)
})

/*
const embed = {embed: { description: `Command List\n\n**Do ${prefix}help [command name] to see more info on a command**`, color: 0x7289DA, thumbnail: {url: bot.user.avatarURL}, fields: [
        {name: "Minigames", value: minigames.join("\n"), inline: false},
        {name: "Support", value: support.join("\n"), inline: false},
        {name: "Profile and Shop", value: profile.join('\n'), inline: false},
        {name: "Utility", value: utility.join("\n"), inline: false},
      ],  footer: {text: `Developed by ThatMajesticGuy | ${bot.commands.size - 1} Commands`}
}
}
*/
const embed = new Eris.Embed()
.color(0x7289DA)
.title("Command List - Minigames")
.thumbnail(bot.user.avatarURL)
.footer(lang.commands.help.note.replace("[PAGE]", "1"))
.description(`**Do ${prefix}help [command name] to see more info on a command**\n
🔴 \`${lang.minigames.connect.gameName}\` - ${lang.minigames.connect.description}\n(${prefix}${lang.minigames.connect.usage})\n
📝 \`${lang.minigames.hangman.gameName}\` - ${lang.minigames.hangman.description}\n(${prefix}${lang.minigames.hangman.usage})\n
<:Matchup:735152886073393175> \`${lang.minigames.matchup.gameName}\` - ${lang.minigames.matchup.description}\n(${prefix}${lang.minigames.matchup.usage})\n
<:Quiz:735153182602297356> \`${lang.minigames.quiz.gameName}\` - ${lang.minigames.quiz.description}\n(${prefix}${lang.minigames.quiz.usage})\n
<:Rock:721973835804573697> \`${lang.minigames.rps.gameName}\` - ${lang.minigames.rps.description}\n(${prefix}${lang.minigames.rps.usage})\n
<:TicTacToe_X:717504662412066909> \`${lang.minigames.ttt.gameName}\` - ${lang.minigames.ttt.description}\n(${prefix}${lang.minigames.ttt.usage})\n
<:W4:731183284305789049> \`${lang.minigames.uno.gameName}\` - ${lang.minigames.uno.description}\n(${prefix}${lang.minigames.uno.usage})
`)

let pages = [{category: "Minigames", commands: [`🔴 \`${lang.minigames.connect.gameName}\` - ${lang.minigames.connect.description}\n(${prefix}${lang.minigames.connect.usage})`, `📝 \`${lang.minigames.hangman.gameName}\` - ${lang.minigames.hangman.description}\n(${prefix}${lang.minigames.hangman.usage})`, `<:Matchup:735152886073393175> \`${lang.minigames.matchup.gameName}\` - ${lang.minigames.matchup.description}\n(${prefix}${lang.minigames.matchup.usage})`, `<:Quiz:735153182602297356> \`${lang.minigames.quiz.gameName}\` - ${lang.minigames.quiz.description}\n(${prefix}${lang.minigames.quiz.usage})`, `<:Rock:721973835804573697> \`${lang.minigames.rps.gameName}\` - ${lang.minigames.rps.description}\n(${prefix}${lang.minigames.rps.usage})`, `<:TicTacToe_X:717504662412066909> \`${lang.minigames.ttt.gameName}\` - ${lang.minigames.ttt.description}\n(${prefix}${lang.minigames.ttt.usage})`, `<:W4:731183284305789049> \`${lang.minigames.uno.gameName}\` - ${lang.minigames.uno.description}\n(${prefix}${lang.minigames.uno.usage})`]}, {category: "Profile and Shop", commands: profile}, {category: "Utility", commands: utility}, {category: "Support", commands: support}]
let page = 0

  const msg = await message.channel.createEmbed(embed)
  await msg.addReaction("◀️")
  await msg.addReaction("▶️")
  await msg.addReaction("⏹️")
  await msg.addReaction("1️⃣")
  await msg.addReaction("2️⃣")
  await msg.addReaction("3️⃣")
  await msg.addReaction("4️⃣")

  let filter = (m, emoji, userID) => ["◀️", "▶️", "⏹️", "1️⃣", "2️⃣", "3️⃣", "4️⃣"].includes(emoji.name) && userID === message.author.id;

 let collector = new ReactionCollector(bot, msg, filter, {
    time: 120000
});

allowedToRun.add(message.author.id)

collector.on("collect", (m, emoji, userID) => {
  if (emoji.name === "◀️") {
    if (message.guild.me.hasPermission("manageMessages")) msg.removeReaction("◀️", message.author.id)
    if (page === 0) return;
    page--

    msg.edit({embed: new Eris.Embed()
    .color(0x7289DA)
    .title(`Command List - ${pages[page].category}`)
    .thumbnail(bot.user.avatarURL)
    .footer(lang.commands.help.note.replace("[PAGE]", page + 1))
    .description(pages[page].commands.join("\n\n"))
  })
  }
  if (emoji.name === "▶️") {
    if (message.guild.me.hasPermission("manageMessages")) msg.removeReaction("▶️", message.author.id)
    if (page === 3) return;
    page++

    msg.edit({embed: new Eris.Embed()
      .color(0x7289DA)
      .title(`Command List - ${pages[page].category}`)
      .thumbnail(bot.user.avatarURL)
      .footer(lang.commands.help.note.replace("[PAGE]", page + 1))
      .description(pages[page].commands.join("\n\n"))
    })
  }

  if (emoji.name === "1️⃣") {
    if (message.guild.me.hasPermission("manageMessages")) msg.removeReaction("1️⃣", message.author.id)
    if (page === 0) return;
    page = 0

    msg.edit({embed: new Eris.Embed()
      .color(0x7289DA)
      .title(`Command List - ${pages[page].category}`)
      .thumbnail(bot.user.avatarURL)
      .footer(lang.commands.help.note.replace("[PAGE]", page + 1))
      .description(pages[page].commands.join("\n\n"))
    });
  }

  if (emoji.name === "2️⃣") {
    if (message.guild.me.hasPermission("manageMessages")) msg.removeReaction("2️⃣", message.author.id)
    if (page === 1) return;
    page = 1

    msg.edit({embed: new Eris.Embed()
      .color(0x7289DA)
      .title(`Command List - ${pages[page].category}`)
      .thumbnail(bot.user.avatarURL)
      .footer(lang.commands.help.note.replace("[PAGE]", page + 1))
      .description(pages[page].commands.join("\n\n"))
    });
  }


  if (emoji.name === "3️⃣") {
    if (message.guild.me.hasPermission("manageMessages")) msg.removeReaction("3️⃣", message.author.id)
    if (page === 2) return;
    page = 2

    msg.edit({embed: new Eris.Embed()
      .color(0x7289DA)
      .title(`Command List - ${pages[page].category}`)
      .thumbnail(bot.user.avatarURL)
      .footer(lang.commands.help.note.replace("[PAGE]", page + 1))
      .description(pages[page].commands.join("\n\n"))
    });
  }


  if (emoji.name === "4️⃣") {
    if (message.guild.me.hasPermission("manageMessages")) msg.removeReaction("4️⃣", message.author.id)
    if (page === 3) return;
    page = 3

    msg.edit({embed: new Eris.Embed()
      .color(0x7289DA)
      .title(`Command List - ${pages[page].category}`)
      .thumbnail(bot.user.avatarURL)
      .footer(lang.commands.help.note.replace("[PAGE]", page + 1))
      .description(pages[page].commands.join("\n\n"))
    });
  }


  if (emoji.name === "⏹️") {
    msg.delete()
    message.channel.createEmbed(new Eris.Embed().color(0x7289DA).description(lang.commands.help.cancel))
    collector.stop()
  }
});

collector.on('end', () => {
  allowedToRun.delete(message.author.id)
})

  });
  } else {
    let cmd = bot.commands.get(args.toLowerCase())
    if (!cmd) return message.channel.createMessage({embed: {color: 0x7289DA, description: lang.commands.help.invalidCmd}})
    if (cmd.help.category === "Administrator") return message.channel.createMessage({embed: {color: 0x7289DA, description: lang.commands.help.invalidCmd}})

    let emoji = ""

    let aliases;
    if (cmd.aliases.length > 0) aliases = cmd.aliases.join("\n")
    else aliases = "None"
    
    const info = lang.commands[cmd.help.name]
    const embed2 = {embed: {description: `${emoji} ${lang.commands.help.info.replace("[COMMAND]", `**${cmd.help.name}**`)}\n\n**[${lang.commands.help.required}]**\n**<${lang.commands.help.optional}>**\n\u200b`, color: 0x7289DA, thumbnail: {url: bot.user.avatarURL}, fields: [
      {name: lang.commands.help.category, value: `**${cmd.help.category}**`, inline: true},
      {name: "\u200b", value: '\u200b', inline: true},
      {name: lang.commands.help.desc, value: `**${info.description}**`, inline: true},
      {name: lang.commands.help.us, value: `**${prefix}${info.usage}**`, inline: true},
      {name: "\u200b", value: '\u200b', inline: true},
      {name: lang.commands.help.alias, value: `**${aliases}**`, inline: true},
    ]}}

    message.channel.createMessage(embed2)
  }
}

exports.help = {
  name: "help",
  description: "Lists all the available commands",
  usage: "help <command name>",
  category: "Support",
  emoji: "📰"
}



exports.aliases = ["cmds", "commands"]
