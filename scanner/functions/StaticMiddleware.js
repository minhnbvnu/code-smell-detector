function StaticMiddleware(app) {
            var dirPath = path.join(__dirname, '/../../data')
            app.use(express.static(dirPath));
        }