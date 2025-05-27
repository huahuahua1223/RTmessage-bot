# RTmessage-bot - Telegram消息转发机器人

这是一个基于Vercel Serverless函数的Telegram消息转发机器人，无需自己维护服务器。

## 功能特点

- 自动转发群组消息到指定目标（个人或群组）
- 支持多种消息类型：文本、图片、视频、文件、语音等
- 转发的消息包含原始信息（发送者、时间、群组来源等）
- 部署在Vercel上，无需维护自己的服务器
- 使用Webhook方式接收消息，反应迅速

## 使用前准备

1. 创建一个Telegram机器人
   - 在Telegram中搜索 [@BotFather](https://t.me/BotFather)
   - 发送 `/newbot` 命令创建新机器人
   - 按照提示设置机器人名称和用户名
   - 保存获得的API令牌（BOT_TOKEN）

2. 获取目标聊天ID
   - 如果转发到个人聊天，可以使用 [@userinfobot](https://t.me/userinfobot) 获取自己的ID
   - 如果转发到群组，可以将机器人添加到群组，然后发送一条消息，访问 `https://api.telegram.org/bot<BOT_TOKEN>/getUpdates` 获取群组ID

## 部署步骤

1. Fork或Clone此仓库到你的GitHub账户

2. 在Vercel上部署
   - 注册/登录 [Vercel](https://vercel.com/)
   - 导入GitHub仓库
   - 设置环境变量:
     - `BOT_TOKEN`: 你的Telegram机器人API令牌
     - `TARGET_CHAT_ID`: 目标转发聊天的ID
   - 完成部署

3. 设置Webhook
   - 部署完成后，访问 `https://your-app-name.vercel.app/api/setWebhook` 来设置Webhook
   - 如果看到成功消息，则表示机器人已准备就绪

## 本地开发

```bash
# 克隆仓库
git clone https://github.com/huahuahua1223/RTmessage-bot.git
cd RTmessage-bot

# 安装依赖
pnpm install

# 创建环境变量文件
cp sample.env .env
# 编辑.env文件，填入必要信息

# 启动开发服务器
pnpm dev
```

## 环境变量说明

项目使用以下环境变量：

- `BOT_TOKEN`: Telegram机器人的API令牌（从@BotFather获取）
- `TARGET_CHAT_ID`: 转发消息的目标聊天ID（个人或群组）
- `VERCEL_URL`: Vercel部署后的URL（用于设置Webhook）

本地开发时，复制`sample.env`并重命名为`.env`，填入相应值后使用。
部署到Vercel时，在Vercel项目设置中添加这些环境变量。

## 机器人使用方法

1. 将机器人添加到你想监控的群组中
2. 确保机器人有读取消息的权限
3. 所有群组消息将自动转发到你设置的目标聊天ID

## 注意事项

- Telegram机器人需要在群组中被设置为管理员才能读取所有消息
- 确保目标聊天允许机器人发送消息
- 如果修改了环境变量，需要重新部署项目

## 贡献

欢迎提交问题和拉取请求！

## 许可

MIT 