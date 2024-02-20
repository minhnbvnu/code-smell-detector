function on_support_server_proxy_done(err, req, res) {
            if (err.code === 'ECONNRESET' && res && res.socket && res.socket.destroyed === true) {
                debug('Request to support-server:%s was canceled by the client, ignoring the proxy error');
            }
        }