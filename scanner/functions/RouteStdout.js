function RouteStdout(app) {
            app.get('/stdout', function (req, res) {
                fs.readFile(path.join(__dirname, '/../../tmp/access.log'), function (err, access) {
                  if (err) {
                    Logger.error(err);
                    Logger.error(err.stack);
                  }
                  var data = {
                      messages: stdoutLog,
                      access: access,
                  };
                  res.render('stdout', data);
                });
            });
        }