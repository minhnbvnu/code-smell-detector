function RouteStats(app) {
            app.get('/stats', function (req, res) {
                var tmpldata = {
                    layout: 'stats'
                }
                res.render('stats', tmpldata);
            });
        }