function bouncer_active() {
            var app_port = bouncer.address().port;
            debug('bouncer active on port %d', app_port);

            if (!tunnel) {
                return cb(null, local_url(app_port, '/__zuul'));
            }

            tunnel.connect(app_port, cb);
        }