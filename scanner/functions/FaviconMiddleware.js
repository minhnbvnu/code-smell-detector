function FaviconMiddleware(app) {
            app.use(favicon(__dirname + '/../../data/favicon.ico'));

            return this;
        }