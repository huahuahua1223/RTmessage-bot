// 导入依赖
const { Telegraf } = require('telegraf');
require('dotenv').config();

// 获取Telegram Bot Token
const BOT_TOKEN = process.env.BOT_TOKEN;
const TARGET_CHAT_ID = process.env.TARGET_CHAT_ID;

// 初始化Telegraf
const bot = new Telegraf(BOT_TOKEN);

// 消息转发处理
bot.on('message', async (ctx) => {
  try {
    // 跳过私聊消息
    if (ctx.message.chat.type === 'private') {
      return ctx.reply('此机器人只能在群组中工作');
    }

    // 获取消息详情
    const { message } = ctx;
    const chatId = message.chat.id;
    const messageId = message.message_id;
    const sender = message.from;
    const senderName = sender.first_name + (sender.last_name ? ` ${sender.last_name}` : '');
    const chatTitle = message.chat.title;

    // 转发消息标题
    let forwardText = `💬 <b>消息来自群组:</b> ${chatTitle}\n`;
    forwardText += `👤 <b>发送者:</b> ${senderName} (${sender.username ? '@' + sender.username : 'ID:' + sender.id})\n`;
    forwardText += `⏰ <b>发送时间:</b> ${new Date(message.date * 1000).toLocaleString('zh-CN')}\n\n`;

    // 根据消息类型处理
    if (message.text) {
      forwardText += `<b>消息内容:</b>\n${message.text}`;
      await bot.telegram.sendMessage(TARGET_CHAT_ID, forwardText, { parse_mode: 'HTML' });
    } else if (message.photo) {
      // 如果是图片消息
      const photoId = message.photo[message.photo.length - 1].file_id;
      forwardText += '<b>图片消息</b>';
      if (message.caption) {
        forwardText += `\n${message.caption}`;
      }
      await bot.telegram.sendPhoto(TARGET_CHAT_ID, photoId, {
        caption: forwardText,
        parse_mode: 'HTML'
      });
    } else if (message.video) {
      // 如果是视频
      const videoId = message.video.file_id;
      forwardText += '<b>视频消息</b>';
      if (message.caption) {
        forwardText += `\n${message.caption}`;
      }
      await bot.telegram.sendVideo(TARGET_CHAT_ID, videoId, {
        caption: forwardText,
        parse_mode: 'HTML'
      });
    } else if (message.document) {
      // 如果是文件
      const docId = message.document.file_id;
      forwardText += `<b>文件消息:</b> ${message.document.file_name || '未知文件'}`;
      await bot.telegram.sendDocument(TARGET_CHAT_ID, docId, {
        caption: forwardText,
        parse_mode: 'HTML'
      });
    } else if (message.voice) {
      // 如果是语音
      const voiceId = message.voice.file_id;
      forwardText += '<b>语音消息</b>';
      await bot.telegram.sendVoice(TARGET_CHAT_ID, voiceId, {
        caption: forwardText,
        parse_mode: 'HTML'
      });
    } else {
      // 其他类型消息
      forwardText += '<b>其他类型消息</b>';
      await bot.telegram.sendMessage(TARGET_CHAT_ID, forwardText, { parse_mode: 'HTML' });
    }
  } catch (error) {
    console.error('转发消息出错:', error);
  }
});

// 设置命令
bot.command('start', (ctx) => {
  return ctx.reply('欢迎使用消息转发机器人! 请将我添加到群组中以转发消息。');
});

bot.command('help', (ctx) => {
  return ctx.reply('将此机器人添加到群组中，它会自动将所有消息转发到目标聊天。');
});

// 处理错误
bot.catch((err, ctx) => {
  console.error(`Telegraf错误: ${err}`);
});

// Webhook处理函数
module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const update = req.body;
      await bot.handleUpdate(update);
      res.status(200).send('OK');
    } catch (error) {
      console.error('处理Webhook时出错:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(200).send('Telegram Bot Webhook is working!');
  }
}; 