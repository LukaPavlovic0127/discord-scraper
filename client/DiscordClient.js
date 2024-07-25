const config = require('../config.json')
const Discord = require('discord.js');
const { BroadcastTGMessages } = require('./bot');

class DiscordClient {
  constructor() {
    this.token = config.client.token;
    this.discordClient = new Discord.Client();
    // this.bot = bot;
    this.chat_ids = config.telegrambot.chat_ids;

    this.discordClient.on('message', this.handleMessage);

    this.discordClient.on("error", function (error) {
      console.error(`Client's WebSocket encountered a connection error: ${error.message}`);
      BroadcastTGMessages(`Client's WebSocket encountered a connection error: ${error.message}`)
    });

    this.discordClient.on("reconnecting", function () {
      console.log(`Client tries to reconnect to the WebSocket`);
    });

    this.discordClient.on("resume", function (replayed) {
      console.log(`Client a WebSocket resumes, ${replayed} replays`);
    });

    this.discordClient.on("warn", function (info) {
      console.log(`Client warn: ${info}`);
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

      // console.log("Guild name: " + msg.guild.name);
      console.log("Author ID: " + msg.author.id);
      // console.log("Author Name: " + msg.author.username);
      // console.log("Channel name: " + msg.channel.name);
      console.log("Msg Content: " + msg.content);

      if (!users.includes(msg.author.id)) {
        return;
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
*👁 Author ID*: \`${msg.author.id}\`
*🧔 Author Name*: \`${msg.author.username}\`
*💌 Content*: ${msg.content}

*📫 URL*: ${msg.url}
*📌 Attachments*: ${attachments.length > 0 ? "\nThere are attachments in this message, check discord" : "⛔ None"}
`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  login() {
    this.discordClient.login(this.token)
      .then(() => {
        console.log(`Client - Logged in as ${this.discordClient.user.tag}`);
      })
      .catch((error) => {
        console.log("Failed to login client ("
          + this.token + "): ", error.message);
        this.chat_ids.forEach(chatId => {
          // this.bot.telegram.sendMessage(chatId, "Failed to login client: " + error.message)
          //     .then(() => console.log('Message sent successfully'))
          //     .catch((error) => console.error('Error:', error)); 
        });
      });
  }
}

module.exports = DiscordClient;
