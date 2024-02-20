function on_proxy_req(proxyReq, req, res, options) {
            if (is_control_req(req) ||
                (req.headers.connection && req.headers.connection.toLowerCase().indexOf('upgrade') === -1)) {
                proxyReq.setHeader('connection', 'close');
            }
        }