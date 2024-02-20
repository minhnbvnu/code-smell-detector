function RouteStatistics(app) {
            /**
             * Display a message if the webhooks are operational.
             */
            app.get('/statistics', function (req, res) {
                var data = {
                    os: {
                        hostname: os.hostname(),
                        type: os.type(),
                        release: os.release(),
                        uptime: os.uptime()
                    }
                }
                res.render('statistics', data);
            });
        }