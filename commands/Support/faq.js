const Eris = require('eris')
const allowedToRun = new Set()

exports.run = (bot, message, args, prefix) => {
  const embed = new Eris.Embed()
  .color(0x7289DA)
  .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
  .title("FAQ")
  .description(`Do ${prefix}faq [number] to show the answer\n
**1. What is Party Games? (${prefix}faq 1)**

**2. How do I start a game/How do I run a command? (${prefix}faq 2)**

**3. Can I give tokens to other people? (${prefix}faq 3)**

**4. I found a bug! Where do I report it? (${prefix}faq 4)**

**5. Where can I suggest features? (${prefix}faq 5)**`)
 
 if (args[0] === "1") {
   const one = new Eris.Embed()
   .color(0x7289DA)
   .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
   .title("What is Party Games?")
   .description("Party Games is a Discord bot that lets you play minigames, ranging from simple school games like Rock Paper Scissors and Tic Tac Toe, to more complex games like Uno, right in Discord!\n\nYou can compete with friends to get the most tokens, and use those tokens to buy icons in the shop to use in the minigames!")
   message.channel.createEmbed(one)
 } else if (args[0] === "2") {
   const two = new Eris.Embed()
   .color(0x7289DA)
   .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
   .title("How do I start a game/How do I run a command?")
   .description(`To start a game, first look at the "help" command \`${prefix}help\`, there will list the games you can play, and how to run them.\n\nFor example, if you want to play Rock Paper Scissors, you will run \`${prefix}rps [1 | 2]\`, \`[1 | 2]\` being how many players you want, one player, or two players.\n\nThe same goes for any other command, if you react with ➡️ in the help menu, then you will see more commands, with their usage`)
   message.channel.createEmbed(two)
 } else if (args[0] === "3") {
   const three = new Eris.Embed()
   .color(0x7289DA)
   .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
   .title("Can I give tokens to other people?")
   .description(`No, you cannot give tokens to other people, and that is not a planned feature. However, there will be a future "Server Tokens" feature which you can give to other players`)
   message.channel.createEmbed(three)
 } else if (args[0] === "4") {
   const four = new Eris.Embed()
   .color(0x7289DA)
   .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
   .title("I found a bug! Where do I report it?")
   .description(`If you found a bug, please report it [in the official server](https://discord.gg/NpnMFCs) in the "bug-reports" channel\n\nPlease provide a screenshot and context of the issue as well, so that the issue can be fixed faster!`)
   message.channel.createEmbed(four)
 } else if (args[0] === "5") {
   const five = new Eris.Embed()
   .color(0x7289DA)
   .thumbnail("https://cdn.discordapp.com/emojis/715385885222240277.png?v=1")
   .title("Where can I suggest features?")
   .description(`Similar to reporting a bug, you can suggest a feature [in the official server](https://discord.gg/NpnMFCs) in the "suggestions" channel\n\nPlease let the suggestion be reasonable, and not something too over the top or unrelated to Party Games (ex: Moderation commands)`)
   message.channel.createEmbed(five)
 } else message.channel.createEmbed(embed)
  

}


exports.help = {
  name: "faq",
  description: "Lists the most frequently asked questions about the bot",
  usage: "faq",
  category: "Support",
  emoji: "❓"
}

exports.aliases = []