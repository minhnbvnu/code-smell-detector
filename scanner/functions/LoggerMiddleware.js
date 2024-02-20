function LoggerMiddleware(app) {
            // create a write stream
            var logPath = path.join(__dirname, '/../../tmp/access.log');
            var accessLogStream = fs.createWriteStream(logPath, {
                flags: 'w'
            });

            app.use(logger('combined', {
                stream: accessLogStream
            }));

            return this;
        }