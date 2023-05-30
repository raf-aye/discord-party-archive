const Eris = require('eris');
const user = require('../../models/user.js')
const icons = {"Predeterminado": "Default", "Cuadrado": "Square", "Corazon": "Heart", "Reversa": "Reverse", "Cara Fiestera": "Party Face", "Popper del partido": "Party Popper", "Estrella": "Star", "Figura Musical": "Music Note", "Rueda Dentada": "Cog", "Hoja": "Leaf", "Amenazador": "Menacing", "Regalo": "Gift", "Cangrejo": "Crab", "Pastel": "Cake", "Quadrato": "Square", "Cuori": "Heart", "Inverti": "Reverse", Stella: 'Star', 'Nota Musicale': 'Note', Ingranaggio: 'Cog', Foglia: 'Leaf', Minaccioso: 'Menacing', Granchio: 'Crab',Torta: 'Cake', "Default": "Default", "Square": "Square", "Heart": "Heart", "Reverse": "Reverse", "Kappa": "Kappa", "Moyai": "Moyai", "Cheems": "Cheems", "Pog": "Pog", "Star": "Star", "Music Note": "Music Note", "Cog": "Cog", "Leaf": "Leaf", "Menacing": "Menacing", "Gift": "Gift", "Crab": "Crab", "Cake": "Cake", "Sus": "Sus"}

exports.run = (bot, message, args, prefix, games, lang) => {
  user.findOne({id: message.author.id}, (err, res) => {
  if (!res) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").description(lang.commands.changeicon.noAcc))
  if (res.ownedIcons.length === 1) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").description(lang.commands.changeicon.noIcons.replace(/\[PREFIX\]/g, prefix)))
  if (!args[0]) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").description(lang.commands.changeicon.noArgs))
  if (!['square', 'heart', 'reverse', 'popper', 'party popper', 'partypopper', 'party face', 'partyface', 'cheems', 'moyai', 'kappa', 'pog', 'default', "star", "note", "cog", "leaf", "menacing", "gift", "crab", "cake", "sus"].includes(args.join(" ").toLowerCase())) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").description(lang.commands.changeicon.invalidIcon))
  
  switch (args.join(" ").toLowerCase()) {
    case "square":
    changeIcon(lang.icons.square, "🟦", "🟥", "🟩", "🟨")
    break;
    
    case "heart":
    changeIcon(lang.icons.heart, "💙", "❤️", "💚", "💛")
    break;
    
    case "reverse":
    changeIcon(lang.icons.reverse, "<:P1Reverse:705065414413123675>", "<:P2Reverse:705065767472857220>", "<:P3Reverse:705065767690960958>", "<:P4Reverse:705065768173436960>")
    break;
    
    case "popper":
    case "party popper":
    case "partypopper":
    changeIcon(lang.icons.partypop, "<:P1PartyPopper:705020918086369311>", "<:P2PartyPopper:705020918208135168>", "<:P3PartyPopper:705021568564068373>", "<:P4PartyPopper:705021938183045171>")
    break;
      
    case "partyface":
    case "party face":
    changeIcon(lang.icons.partyface, "<:P1PartyFace:705014373726289921>", "<:P2PartyFace:705017317918244903>", "<:P3PartyFace:705016151272456193>", "<:P4PartyFace:705017949248815174>")
    break;
      
    case "cheems":
    changeIcon(lang.icons.cheems, '<:P1Cheems:704935355958296616>','<:P2Cheems:704935721412198451>','<:P3Cheems:704935954636472390>','<:P4Cheems:704936146223890482>')
    break;
    
    case "moyai":
    changeIcon("Moyai", '<:P1Moyai:705206642861539378>','<:P2Moyai:705207046529876008>','<:P3Moyai:705207653017583676>','<:P4Moyai:705210214781157406>')
    break;

    case "kappa":
    changeIcon(lang.icons.kappa, "<:P1Kappa:738093263168471203>", "<:P2Kappa:738093252632117249>", "<:P3Kappa:738093265777066005>", "<:P4Kappa:738093253424971886>")
    break;
    
    case "pog":
    changeIcon(lang.icons.pog, '<:P1Pog:704927337749282846>','<:P2Pog:704927635133956127>','<:P3Pog:704927919222292500>','<:P4Pog:704928175561375744>')
    break;
      
    case "default":
    changeIcon(lang.icons.default, "<:Player1:714906015912689685>", "<:Player2:714906015694585877>", "<:Player3:714906015971278919>", "<:Player4:714906015966953552>")
    break;

    case "star": 
    changeIcon(lang.icons.star, '<:P1Star:821594403646210068>', '<:P2Star:821594403604267020>','<:P3Star:821594403381837837>', '<:P4Star:821594403768500225>')
    break;

    case "note":
    changeIcon(lang.icons.note, '<:P1Note:821597026852536320>', '<:P2Note:821597026466398221>', '<:P3Note:821597026877046840>','<:P4Note:821597026932359228>')
    break;

    case "cog":
    changeIcon(lang.icons.cog, '<:P1Cog:821597003963957258>', '<:P2Cog:821597003707711499>', '<:P3Cog:821597004006031370>', '<:P4Cog:821597004017827840>')
    break;

    case "leaf":
    changeIcon(lang.icons.leaf, '<:P1Leaf:821777518993473626>', '<:P2Leaf:821777518998585374>', '<:P3Leaf:821777574454886462>', '<:P4Leaf:821777574812188724>')
    break;

    case "menacing":
    changeIcon(lang.icons.menacing, '<:P1Menacing:821782153556656188>', '<:P2Menacing:821782153611968562>', '<:P3Menacing:821782153774759938>', '<:P4Menacing:821782153997844490>')
    break;

    case "gift": 
    changeIcon(lang.icons.gift, '<:P1Gift:821795446053535794>', '<:P2Gift:821795445717467136>', '<:P3Gift:821795445478129695>', '<:P4Gift:821795445452963911>')
    break;

    case "crab":
    changeIcon(lang.icons.crab, '<:P1Crab:821593499606188092>', '<:P2Crab:821593500105048095>', '<:P3Crab:821593499967291392>', '<:P4Crab:821593499840938014>')
    break;

    case "cake":
    changeIcon(lang.icons.cake, '<:P1Cake:821791149773422603>', '<:P2Cake:821792084729790504>', '<:P3Cake:821792402821873694>', '<:P4Cake:821792671844532234>')
    break;

    case "sus":
    changeIcon(lang.icons.sus, '<:P1Sus:821776614446202892>', '<:P2Sus:821776614714245202>', '<:P3Sus:821776615288995900>', '<:P4Sus:821776615188463646>')
    break;
  }
    
  function changeIcon(name, P1, P2, P3, P4) {
    if (!res.ownedIcons.includes(icons[name])) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").description(lang.commands.changeicon.unownedIcon))
    if (res.emoji.P1 === P1) return message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").description(lang.commands.changeicon.alreadySelected))
    user.updateOne({id: message.author.id}, {$set: {emoji: {P1: P1, P2: P2, P3: P3, P4: P4}}}, function(err) { if (err) console.log(err) })
    message.channel.createEmbed(new Eris.Embed().color(0x7289DA).thumbnail("https://cdn.discordapp.com/emojis/718331720398798899.png?v=1").description(`${P1} ${lang.commands.changeicon.success.replace("[ICON]", name)}`))
  }
});
}

exports.help = {
  name: "changeicon",
  description: "Lets you change to whatever icon you own",
  usage: "changeicon [icon name]",
  category: "Profile and Shop",
  emoji: "🔄"
}

exports.aliases = ['seticon']