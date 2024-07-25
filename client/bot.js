const TelegramBot = require('node-telegram-bot-api')
const config = require('../config.json')
const { writeLog } = require('./helper')

const CHAT_IDS = config.telegrambot.chat_ids
const TG_BOT = new TelegramBot(config.telegrambot.token, { polling: true })

TG_BOT.on('message', (msg) => {
  writeLog(msg.chat.id)
})

const BroadcastTGMessages = async (message) => {
  try {
    CHAT_IDS.map(chatId => {
      TG_BOT.sendMessage(chatId, message, {
        parse_mode: "Markdown",
        disable_web_page_preview: true
      })
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  CHAT_IDS,
  TG_BOT,
  BroadcastTGMessages
}