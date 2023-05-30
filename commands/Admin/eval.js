const Eris = require ("eris");
const hastebin = require('hastebin.js');
const haste = new hastebin({});

exports.run = async (bot, message, a, prefix, games, lang) => {

  let myGame;
  // if (games.get(message.guild.id)) {

  // }
    const clean = text => {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }
    const args = message.content.split(" ").slice(1);
    const args2 = message.content.split(' ').slice(1).join(' ');

      try {
           var authors = ["262410813254402048", "300331417634603010"];
      if(!authors.includes(message.author.id)) {
      return;
      }

      if (!args2) {
        message.channel.createMessage("What do you want me to evaluate?");
        return;
    }

          const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);


          if (clean(evaled).length > 1024 || code.length > 1024) {
              var embed = {embed: {
                  title: "Evaluation Overload!", // Title of the embed
                  description: "The Evaluation was over 1024 characters!\nI have logged it in console for you",
                  color: 0x4CEF8B
              }
            }

           message.channel.createMessage(embed)
           console.log(clean(evaled))
  } else {
    var embed2 = {embed: {
        title: "Evaled:",
        color: 0x4CEF8B,
        fields: [
            {
                name: "Evaled: :inbox_tray:",
                value: `\`\`\`js\n${code}\n\`\`\``,
                inline: false
            },
            {
              name: "Output: :outbox_tray:",
              value: `\`\`\`js\n${clean(evaled)}\n\`\`\``,
              inline: false
            }
        ]
    }
  }
          message.channel.createMessage(embed2);
  }
      } catch (err) {
          const code = args.join(" ");
          if (clean(err).length > 1024 || code.length > 1024) {
            var embed = {embed: {
                title: "Evaluation Overload! (Error!)", // Title of the embed
                description: "The Evaluation was over 1024 characters!\nI have logged it in the console for you",
                color: 0xf44242
            }
          }
            message.channel.createMessage(embed)
           console.log(clean(err).stack)
  };
  var embed3 = {embed: {
      title: "ERROR:",
      color: 0xf44242,
      fields: [
          {
              name: "Evaled: :inbox_tray:",
              value: `\`\`\`js\n${code}\n\`\`\``,
              inline: false
          },
          {
            name: "Output: :outbox_tray:",
            value: `\`\`\`js\n${clean(err)}\n\`\`\``,
            inline: false
          }
      ]
  }
  }
        message.channel.createMessage(embed3);
      }
    };

exports.help = {
    name: "eval",
    description: "Evaluates certain JS code. For Majestic ONLY",
    usage: "eval <Text-To-Evaluate>",
    category: "Administrator"
}

exports.aliases = ["ev", "exec"]
