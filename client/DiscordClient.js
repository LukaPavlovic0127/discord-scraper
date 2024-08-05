const config = require('../config.json')
const Discord = require('discord.js');
const { BroadcastTGMessages } = require('./bot');
const { writeLog } = require('./helper');

class DiscordClient {
  constructor() {
    this.token = config.client.token;
    this.discordClient = new Discord.Client();
    // this.bot = bot;
    this.chat_ids = config.telegrambot.chat_ids;

    this.discordClient.on('message', this.handleMessage);

    this.discordClient.on("error", function (error) {
      writeLog(`Client's WebSocket encountered a connection error: ${error.message}`);
      BroadcastTGMessages(`Client's WebSocket encountered a connection error: ${error.message}`, true)
    });

    this.discordClient.on("reconnecting", function () {
      writeLog(`Client tries to reconnect to the WebSocket`);
    });

    this.discordClient.on("resume", function (replayed) {
      writeLog(`Client a WebSocket resumes, ${replayed} replays`);
    });

    this.discordClient.on("warn", function (info) {
      writeLog(`Client warn: ${info}`);
    });
  }

  async handleMessage(msg) {
    try {
      const channels = config.client.channels;

      if (channels.length > 0) {
        if (!channels.includes(msg.channel.id)) {
          return;
        }
      }

      const users = config.client.users;
      const filters = config.client.userfilters;
      
      if (!users.includes(msg.author.id)) {
        return;
      }

      // writeLog("Guild name: " + msg.guild.name);
      writeLog("\nAuthor ID: " + msg.author.id);
      // writeLog("Author Name: " + msg.author.username);
      writeLog("Channel id: " + msg.channel.id);
      writeLog("Channel Name: " + msg.channel.name);
      writeLog("Msg Content: " + msg.content);
      
      if (filters[msg.author.id] && !filters[msg.author.id].includes(msg.channel.id)) {
        return
      }
      
      let attachments = new Array();

      if (msg.attachments instanceof Discord.Collection) {
        attachments = Array.from(msg.attachments.values());
      } else if (Array.isArray(msg.attachments)) {
        attachments = msg.attachments;
      } else {
        attachments = [];
      }

      if (msg.content.length > 0) {
        BroadcastTGMessages(`*💦 Server Name*: ${msg.guild.name}
*💠 Channel Name*: ${msg.channel.name}
*🧔 Author Name*: \`${msg.author.username}\`
*👁 Author ID*: \`${msg.author.id}\`

*💌 Content 💌*
${(!!msg.content) ? msg.content : "No Content ⛔"}

*📫 URL*: [Click here](${msg.url})
*📌 Attachments*: ${attachments.length > 0 ? "\nThere are attachments in this message, check discord" : "⛔ None"}
`)
      }
    } catch (err) {
      writeLog("Error: " + err)
    }
  }

  login() {
    this.discordClient.login(this.token)
      .then(() => {
        writeLog(`Client - Logged in as ${this.discordClient.user.tag}`);
      })
      .catch((error) => {
        writeLog("Failed to login client ("
          + this.token + "): ", error.message);
        this.chat_ids.forEach(chatId => {
          // this.bot.telegram.sendMessage(chatId, "Failed to login client: " + error.message)
          //     .then(() => writeLog('Message sent successfully'))
          //     .catch((error) => console.error('Error:', error)); 
        });
      });
  }
}

module.exports = DiscordClient;
