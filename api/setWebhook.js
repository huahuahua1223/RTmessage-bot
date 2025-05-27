// 导入依赖
const { Telegraf } = require('telegraf');
require('dotenv').config();

// 获取配置
const BOT_TOKEN = process.env.BOT_TOKEN;
// const VERCEL_URL = process.env.VERCEL_URL || '';
const VERCEL_URL = 'https://rt-message-bot-tau.vercel.app';

module.exports = async (req, res) => {
  try {
    if (!BOT_TOKEN) {
      return res.status(400).json({ error: '缺少BOT_TOKEN环境变量' });
    }

    if (!VERCEL_URL) {
      return res.status(400).json({ error: '缺少VERCEL_URL环境变量' });
    }

    const bot = new Telegraf(BOT_TOKEN);
    
    // 设置webhook URL
    const webhookUrl = `${VERCEL_URL}/api/webhook`;
    const result = await bot.telegram.setWebhook(webhookUrl);

    return res.status(200).json({ 
      success: true, 
      message: `Webhook已设置到: ${webhookUrl}`,
      result 
    });
  } catch (error) {
    console.error('设置Webhook出错:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}; 