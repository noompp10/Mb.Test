const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/users",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7268',
        secure: false
    });

    app.use(appProxy);
};
