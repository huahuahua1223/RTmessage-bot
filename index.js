// 本地测试入口文件
require('dotenv').config();
const { Telegraf } = require('telegraf');

// 检查环境变量
if (!process.env.BOT_TOKEN) {
  console.error('错误: 未设置BOT_TOKEN环境变量');
  process.exit(1);
}

if (!process.env.TARGET_CHAT_ID) {
  console.error('错误: 未设置TARGET_CHAT_ID环境变量');
  process.exit(1);
}

// 初始化机器人
const bot = new Telegraf(process.env.BOT_TOKEN);

// 导入消息处理逻辑
const webhookHandler = require('./api/webhook');
const mockReqRes = {
  method: 'POST',
  body: {},
  status: (code) => ({ 
    send: (message) => console.log(`[Status ${code}]`, message),
    json: (data) => console.log(`[Status ${code}]`, JSON.stringify(data, null, 2))
  })
};

// 消息处理逻辑
bot.on('message', (ctx) => {
  // 模拟Webhook调用处理函数
  mockReqRes.body = ctx.update;
  webhookHandler(mockReqRes, mockReqRes);
});

// 命令处理
bot.command('start', (ctx) => {
  return ctx.reply('欢迎使用消息转发机器人! 这是本地开发模式。');
});

// 启动机器人（轮询模式）
console.log('正在启动机器人 (轮询模式)...');
bot.launch()
  .then(() => {
    console.log('机器人已启动! 按Ctrl+C停止。');
    console.log(`目标转发ID: ${process.env.TARGET_CHAT_ID}`);
  })
  .catch(err => {
    console.error('启动机器人出错:', err);
    process.exit(1);
  });

// 优雅关闭
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM')); 