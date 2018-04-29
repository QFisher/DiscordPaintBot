//main entry point

//import libraries
const botconfig = require('./botconfig.json');
const Discord = require('discord.js');
const fs = require('fs');

//Other imports
const commandsList = (fs.readFileSync('./commandlist.txt', "utf8"));

//Create Discord client
const client = new Discord.Client();

//Startup procedure
client.on('ready', async () => {
    console.log(`Successfully logged in as ${client.user.tag}!`);
    client.user.setActivity("MS Paint Night");
});

//login and connect
client.login(botconfig.token);

//set prefix
const prefix = botconfig.prefix;

//Handles messages
client.on('message', message => {
    //ignore some messages
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    let command = message.content.toLowerCase().slice(prefix.length).split(' ');
    console.log("COMMAND: " + message.author.tag + ": " + message.content);
    
    if (command[0] === "help") {
        var embed = new Discord.RichEmbed()
            .setColor("ff0000")
            .setTitle("PaintBot Commands:")
            .setDescription(commandsList)
            .setFooter("This bot was created by Quinn Fisher and Cosmin Baciu")
            .setThumbnail(client.user.displayAvatarURL)
        message.channel.send(embed);
    }
});