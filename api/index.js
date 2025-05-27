// API索引入口
module.exports = async (req, res) => {
  // 重定向到健康检查API
  return res.status(200).json({
    status: 'ok',
    message: 'Telegram消息转发机器人API正在运行',
    timestamp: new Date().toISOString(),
    endpoints: {
      healthCheck: '/api/healthCheck',
      webhook: '/api/webhook',
      setWebhook: '/api/setWebhook'
    }
  });
}; 