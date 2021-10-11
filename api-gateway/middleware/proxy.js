const { createProxyMiddleware } = require('http-proxy-middleware');

const setupProxies = (app, services) => {
    services.forEach(service => {
        const proxy = {
            target: service.servicePath,
            changeOrigin: true,
            pathRewrite: {
                [service.serviceUrl]: ''
            }
        }
        app.use(service.serviceUrl, createProxyMiddleware(proxy));
    })
}

exports.setupProxies = setupProxies