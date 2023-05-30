const Eris = require('eris');
const user = require('../../models/user.js')
const icons = {"Predeterminado": "Default", "Cuadrado": "Square", "Corazon": "Heart", "Reversa": "Reverse", "Cara Fiestera": "Party Face", "Popper del partido": "Party Popper", "Estrella": "Star", "Figura Musical": "Music Note", "Rueda Dentada": "Cog", "Hoja": "Leaf", "Amenazador": "Menacing", "Regalo": "Gift", "Cangrejo": "Crab", "Pastel": "Cake", "Quadrato": "Square", "Cuori": "Heart", "Inverti": "Reverse", Stella: 'Star', 'Nota Musicale': 'Music Note', Ingranaggio: 'Cog', Foglia: 'Leaf', Minaccioso: 'Menacing', Granchio: 'Crab',Torta: 'Cake',Sus: 'Sus', "Default": "Default", "Square": "Square", "Heart": "Heart", "Reverse": "Reverse", "Kappa": "Kappa", "Moyai": "Moyai", "Cheems": "Cheems", "Pog": "Pog", "Star": "Star", "Music Note": "Music Note", "Cog": "Cog", "Leaf": "Leaf", "Menacing": "Menacing", "Gift": "Gift", "Crab": "Crab", "Cake": "Cake", "Sus": "Sus"}

exports.run = (bot, message, args, prefix, games, lang) => {
  user.findOne({id: message.author.id}, (err, res) => {
  if (!res) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").description(lang.commands.buy.noAcc))
  if (!args[0]) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").description(lang.commands.buy.noIcon.replace("[PREFIX]", prefix)))
  if (!["square", "heart", "reverse", "popper", 'partypopper', "partyface", "cheems", "moyai", 'kappa', "pog", "star", "note", "cog", "leaf", "menacing", "gift", "crab", "cake", "sus"].includes(args[0].toLowerCase())) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").description(lang.commands.buy.invalidIcon.replace("[PREFIX]", prefix)))
  
  
  switch (args[0].toLowerCase()) {
    case "square":
    buyIcon(lang.icons.square, "🟦", 100)
    break;
    
    case "heart":
    buyIcon(lang.icons.heart, "💙", 150)
    break;
      
    case "reverse":
    buyIcon(lang.icons.reverse, "<:P1Reverse:705065414413123675>", 250)
    break;
      
    case "popper":
    buyIcon(lang.icons.partypop, '<:P1PartyPopper:705020918086369311>', 350)
    break;
      
    case "partyface":
    buyIcon(lang.icons.partyface, '<:P1PartyFace:705014373726289921>', 400)
    break;
      
    case "cheems":
    buyIcon(lang.icons.cheems, '<:P1Cheems:704935355958296616>', 600)
    break;
    
    case "moyai":
    buyIcon("Moyai", '<:P1Moyai:705206642861539378>', 700)
    break;

    case "kappa":
    buyIcon(lang.icons.kappa, "<:P1Kappa:738093263168471203>", 800)
    break;
      
    case "pog":
    buyIcon(lang.icons.pog, '<:P1Pog:704927337749282846>', 1000)
    break;

    case "star":
    buyIcon(lang.icons.star, "<:P1Star:821594403646210068>", 100)
    break;

    case "note":
    buyIcon(lang.icons.note, "<:P1Note:821597026852536320>", 150)
    break;

    case "cog":
    buyIcon(lang.icons.cog, "<:P1Cog:821597003963957258>", 300)
    break;

    case "leaf":
    buyIcon(lang.icons.leaf, "<:P1Leaf:821777518993473626>", 400)
    break;

    case "menacing":
    buyIcon(lang.icons.menacing, "<:P1Menacing:821782153556656188>", 600)
    break;

    case "gift":
    buyIcon(lang.icons.gift, "<:P1Gift:821795446053535794>", 700)
    break;

    case "crab":
    buyIcon(lang.icons.crab, "<:P1Crab:821593499606188092>", 900)
    break;

    case "cake":
    buyIcon(lang.icons.cake, "<:P1Cake:821791149773422603>", 1200)
    break;

    case "sus": 
    buyIcon(lang.icons.sus, "<:P1Sus:821776614446202892>", 1500)
  }
  
  function buyIcon(name, emoji, tokens) {
  if (res.ownedIcons.includes(icons[name])) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").description(lang.commands.buy.ownIcon))
  
  if (res.tokens < tokens) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").description(lang.commands.buy.notEnough.replace("[COST]", tokens).replace("[TOKENS]", res.tokens)))
  user.updateOne({id: message.author.id}, {$push: {ownedIcons: icons[name]}, $set: {tokens: res.tokens - tokens}}, function(err) { if (err) console.log(err) })
  message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").description(lang.commands.buy.success.replace(/\[ICON\]/g, name).replace("[PREFIX]", prefix)))
  }
    
  })
}

exports.help = {
  name: "buy",
  description: "Lets you buy an icon with your earned tokens",
  usage: "buy [icon name]",
  category: "Profile and Shop",
  emoji: "💸"
}

exports.aliases = []