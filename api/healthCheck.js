// 健康检查和状态接口
module.exports = async (req, res) => {
  try {
    return res.status(200).json({
      status: 'ok',
      message: 'Telegram消息转发机器人正在运行',
      timestamp: new Date().toISOString(),
      version: require('../package.json').version,
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    console.error('健康检查出错:', error);
    return res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
}; 