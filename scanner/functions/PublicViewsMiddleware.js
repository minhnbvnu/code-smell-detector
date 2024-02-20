function PublicViewsMiddleware(app) {
            var viewsDir = path.join(__dirname, '/../../data/views');

            app.set('views', viewsDir);

            app.engine('.hbs', exphbs({
                defaultLayout: 'main',
                extname: '.hbs',
                layoutsDir: path.join(viewsDir, 'layouts'),
                compilerOptions: undefined,
            }));

            // set views engine
            app.set('view engine', '.hbs');

            return this;
        }