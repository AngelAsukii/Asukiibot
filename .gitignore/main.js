const Discord = require('discord.js');

const fs = require("fs");

var bot = new Discord.Client();
var prefix = ("/");


bot.on('ready', () => {
    bot.user.setActivity("/help");
    bot.user.setStatus("dnd");
    console.log("Bot Ready !");
});

bot.login('NDQ3NDc1MzY5MDMzOTkwMTQ1.DmS8qQ.sHtwIYx8t65W3yjKwZ2SRDkeAZ8');

bot.on("guildMemberAdd", member =>{
    member.guild.channels.find("name", "général").send(` ${member.user} Bienvenue sur le serveur `)
})

bot.on("guildMemberRemove", member =>{
    member.guild.channels.find("name", "général").send(` ${member.user} Au revoir merci d'être venu`)
})

bot.on('message', message => {
    
    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
            .setColor('#5D0000')
            .setTitle("Mes Commandes")
            .setThumbnail("https://i.imgur.com/2Pg7sEY.jpg")
            .addField("/help", "Pour afficher mes commandes !")
            .addField("/kick", "Pour kick un membre")
            .addField("/ban", "Pour ban un membre")
            .addField("/warn", "Permet de warn une personne")
            .addField("/seewarns", "Permet de warns le nombre de warns d'une personne")
            .addField("/deletewarns", "Permet de supprimer un warn")
            .addField("/delete", "Permet de supprimer un nombre choisi de messages")
            .addField("/invite", "Pour pouvoir inviter le bot sur son serveur")
            .addField("/8ball", "Permet de me poser une question")
            .setFooter("Crée par @『 Λ η ɢ ε ł ~ S α м α 』/ エンジェルサマ#0002")    
        
            message.channel.sendEmbed(help_embed);
        console.log("On a demandé mes commandes !");
    }

    if(message.content.startsWith(prefix + "kick")) {
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))
        return message.channel.send("Vous n'avez pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner un utilisateur")
        }

        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.channel.send("Je ne sais pas si l'utilisateur existe ^^'")
        }

        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission pour kick")
        }

        kick.kick().then(member => {
            message.channel.send(`${member.user} à était kick par ${message.author}`)
        });
    }

    if(message.content.startsWith(prefix + "ban")) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))
        return message.channel.send("Vous n'avez pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner un utilisateur")
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.send("Je ne sais pas si l'utilisateur existe ^^'")
        }

        if(!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission pour ban")
        }

        ban.ban().then(member => {
            message.channel.send(`${member.user} à était ban par ${message.author}`)
        });
    }

    if(message.content.startsWith(prefix + "delete")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES"))
            return message.channel.send("Vous n'avez pas la permission");

        let args = message.content.split(" ").slice(1);
        
        if(!args[0])
            return message.channel.send("Tu dois préciser un nombre de messages à supprimer ^^'")
            message.channel.bulkDelete(args[0]).then(() => {
                message.channel.send(`${args[0]} messages ont été supprimés ^^`)
            }) 
    }

    var fs = require('fs');
 
let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
 
if (message.content.startsWith(prefix + "warn")){
 
if (message.channel.type === "dm") return;
 
var mentionned = message.mentions.users.first();
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
if(message.mentions.users.size === 0) {
 
  return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");
 
}else{
 
    const args = message.content.split(' ').slice(1);
 
    const mentioned = message.mentions.users.first();
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          if (args.slice(1).length != 0) {
 
            const date = new Date().toUTCString();
 
            if (warns[message.guild.id] === undefined)
 
              warns[message.guild.id] = {};
 
            if (warns[message.guild.id][mentioned.id] === undefined)
 
              warns[message.guild.id][mentioned.id] = {};
 
            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
 
            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
 
              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
 
            } else {
 
              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
 
                time: date,
 
                user: message.author.id};
 
            }
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
message.delete();
 
            message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');
 
message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
}
 
 
 
  if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
    const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size !== 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          try {
 
            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
              return;
 
            }
 
          } catch (err) {
 
            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
            return;
 
          }
 
          let arr = [];
 
          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");
 
          for (var warn in warns[message.guild.id][mentioned.id]) {
 
            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
 
            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
 
          }
 
          message.channel.send(arr.join('\n'));
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
 
          console.log(args);
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
 
 
 
 
  if (message.content.startsWith(prefix+"deletewarns")||message.content===prefix+"deletewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
   const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    const arg2 = Number(args[1]);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
 
          if (!isNaN(arg2)) {
 
            if (warns[message.guild.id][mentioned.id] === undefined) {
 
              message.channel.send(mentioned.tag+" n'a aucun warn");
 
              return;
 
            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
 
              message.channel.send("**:x: Ce warn n'existe pas**");
 
              return;
 
            }
 
            delete warns[message.guild.id][mentioned.id][arg2];
 
            var i = 1;
 
            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
 
              var val=warns[message.guild.id][mentioned.id][key];
 
              delete warns[message.guild.id][mentioned.id][key];
 
              key = i;
 
              warns[message.guild.id][mentioned.id][key]=val;
 
              i++;
 
            });
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              delete warns[message.guild.id][mentioned.id];
 
            }
 
            message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);
 
            return;
 
          } if (args[1] === "tout") {
 
            delete warns[message.guild.id][mentioned.id];
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);
 
            return;
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
 
        }
 
      } else {
 
       message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }

    if (message.content === prefix + "invite"){
        message.reply('https://discordapp.com/api/oauth2/authorize?client_id=447475369033990145&permissions=8&scope=bot')
        console.log("Quelqu'un ma inviter")
    }

//--------------------------------------------------------FUN--------------------------------------------------

    if (message.content === prefix + "membres"){
        random();
        

        if (randnum == 0){
            message.reply("Nel s'amuse à baiser Shoto @everyone")
            console.log(randnum);
        }

        if (randnum == 1){
            message.reply("Kiki pleure et ce branle sur les images de son ex (Azliquouille)");
            console.log(randnum);
        }
        
        if (randnum == 2){
            message.reply("Fox adore sodomisé Zankuro")
            console.log(randnum);
        }

        if (randnum == 3){
            message.reply("Angel (Mon maître :3) C'est le meilleur de toute la team et il se porte bien")
            console.log(randnum);    
        }

        if (randnum == 4){
            message.reply("Yugo c'est un gros pd wallah il mérite de mourir wallah")
            console.log(randnum);
        }

    }    
    
});

function random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(4);
    randnum = Math.floor(Math.random() * (max - min +1)+ min);
}

bot.on("message", async message => {

  const reponse = JSON.parse(fs.readFileSync('./reponse.json', "utf8"));

  if (message.content.startsWith(prefix + "8ball")) {

  var args = message.content.split(' ').join(' ').slice(7);
  
  if(!args) return message.channel.send("Tu dois me poser une question ^^'")

  var ball_embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle(':8ball: 8Ball')
  .addField('Question :', `${args}`)
  .addField('Réponse :', reponse[Math.round(Math.random() * reponse.length)])
  .setFooter('Je suis une voyante')
  message.channel.send(ball_embed);

}});
