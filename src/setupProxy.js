const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      // target: 'http://127.0.0.1:8080',
      target: 'http://ec2-13-125-255-143.ap-northeast-2.compute.amazonaws.com:8080',

      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // URL ^/api -> 공백 변경
      },
    }),
  );
};
