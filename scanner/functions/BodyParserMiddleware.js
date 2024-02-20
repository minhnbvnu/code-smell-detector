function BodyParserMiddleware(app) {
            // Load body parser first
            app.use(bodyParser.json());

            return this;
        }