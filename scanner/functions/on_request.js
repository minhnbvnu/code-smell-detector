function on_request(bounce) {
            return function(req, res) {
                var args = [].slice.call(arguments);
                if (is_control_req(req)) {
                    args.push({ target: local_url(control_port) });
                    bounce.apply(proxy, args);
                    return;
                }

                args.push({ target: local_url(support_port) }, on_support_server_proxy_done);
                bounce.apply(proxy, args);
            };
        }