const config = require('./config.json')
const DiscordClient = require("./client/DiscordClient.js");
const { writeLog } = require('./client/helper.js');

// const axios = require("axios");
// const stream = require('stream');

// const {Telegraf} = require("telegraf")

// const telegram_admin = config.telegrambot.owner_username;

// const bot = new Telegraf(config.telegrambot.token)

// bot.command('sendhere', (ctx) => {
//     const from = ctx.update.message.from.username;

//     if (from != telegram_admin) return;

//     if (!config.telegrambot.chat_ids) {
//         config.telegrambot.chat_ids = [];
//     }

//     if (!config.telegrambot.chat_ids.includes(ctx.update.message.chat.id)) {
//         config.telegrambot.chat_ids.push(ctx.update.message.chat.id);
//         ctx.reply("Bot will now send notifications here.")
//     } else {
//         const index = config.telegrambot.chat_ids.indexOf(ctx.update.message.chat.id);
//         config.telegrambot.chat_ids.splice(index, 1);

//         ctx.reply("Bot will no longer send notifications here.")
//     }

//     saveConfiguration();
// });

// bot.launch();

const client = new DiscordClient(config.client.token, config.telegrambot.chat_ids);
client.login();
  
writeLog(`Server running and Services running`)
writeLog(`Discord Services up and running`);

// async function urlToBuffer(url) {
//     try {
//         const response = await axios.get(url, { responseType: 'arraybuffer' });

//         let fileType;
//         if (response.headers['content-type'].includes('image')) {
//             fileType = 'image';
//         } else if (response.headers['content-type'].includes('video')) {
//             fileType = 'video';
//         } else {
//             fileType = 'other';
//         }

//         let buffer;
//         if (fileType === 'image' || fileType === 'video') {
//             buffer = Buffer.from(response.data, 'binary');
//         } else {
//             const bufferStream = new stream.PassThrough();
//             bufferStream.end(response.data);
//             buffer = bufferStream.read();
//         }

//         return { buffer, fileType };
//     } catch (error) {
//         console.error('Error converting URL to buffer:', error.message);
//         throw error;
//     }
// }

// Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))
