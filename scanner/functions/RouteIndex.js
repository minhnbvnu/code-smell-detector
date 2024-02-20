function RouteIndex(app) {
            app.get('/', function (req, res) {
                var data = {
                    name : GenerateName()
                };
                res.render('index', data);
            });
        }