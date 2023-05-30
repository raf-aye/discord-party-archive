const Eris = require('eris');
const user = require('../../models/user.js');

exports.run = (bot, message, args, prefix, games, lang) => {
const members = message.guild.members.map(m => m.user.id)
console.log(message.guild.members.size)
user.find({}, (err, docs) => {
 docs = docs.filter(r => members.includes(r.id))
 if (docs.length === 0) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1").description(lang.commands.leaderboard.noPlayers))

 docs.sort(function(a, b){return b.tokens-a.tokens});
 const indexFinder = docs.map(u => u.id)

 const embed = new Eris.Embed()
 .color(0x7289DA)
 .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
 .title(lang.commands.leaderboard.title.replace("[SERVER]", message.guild.name))
 
 let users = []
 docs.forEach((res, i) => {
  if (i > 4) return;
  let emoji = '<:ThumbsUp:722272300078071898>'
  switch (i) {
    case 0:
    emoji = "🏆"
    break;

    case 1:
    emoji = "🥈"
    break;

    case 2:
    emoji = "🥉"
    break
  }
  const member = message.guild.members.get(res.id)
  users.push({str: `${emoji} ${member.user.username}#${member.user.discriminator} - **${res.tokens.toLocaleString()}** ${lang.misc.tokens}`, id: member.user.id})
 })
 embed.description = users.map(u => u.str).join("\n")
 const userIndex = users.filter(u => u.id === message.author.id)
 if (userIndex.length >= 1 || docs.filter(r => r.id === message.author.id).length === 0) return message.channel.createEmbed(embed)
 
 embed.description = `${users.map(u => u.str).join('\n')}\n...\n\`${indexFinder.indexOf(message.author.id) + 1}.\` ${message.author.tag} - **${docs.filter(r => r.id === message.author.id)[0].tokens}** ${lang.misc.tokens}`
 message.channel.createEmbed(embed)
})
}

exports.help = {
    name: "leaderboard",
    description: "Shows the top 5 people in the server",
    usage: "leaderboard",
    category: "Profile and Shop",
    emoji: "🔰"
}

exports.aliases = []