function ErrorHandlerMiddleware(app) {
            // only use in development
            app.use(errorhandler({
                dumpExceptions: true,
                showStack: true
            }));

            return this;
        }