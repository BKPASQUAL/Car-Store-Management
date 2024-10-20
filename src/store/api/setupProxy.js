const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://3.104.75.209:4002',  // HTTP backend URL
      changeOrigin: true,
      secure: false,
    })
  );
};
