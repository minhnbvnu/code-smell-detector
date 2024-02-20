function loadViewEngine(app, config) {
	app.express.engine('html', hbs.express4({
		extname: '.html',
		contentHelperName: 'content',
		layoutsDir: `${__dirname}/view/layout`,
		partialsDir: `${__dirname}/view/partial`,
		defaultLayout: `${__dirname}/view/layout/default`
	}));
	app.express.set('views', `${__dirname}/view`);
	app.express.set('view engine', 'html');

	// View helpers
	require('./view/helper/date')(hbs);
	require('./view/helper/string')(hbs);
	require('./view/helper/url')(hbs);
	require('./view/helper/conditionals')(hbs);

	// Populate view locals
	app.express.locals = {
		lang: 'en',
		year: (new Date()).getFullYear(),
		version: pkg.version,
		repo: pkg.homepage,
		bugtracker: pkg.bugs,
		noindex: config.noindex,
		readonly: config.readonly,
		siteMessage: config.siteMessage,
		settings: {}
	};

	app.express.use((request, response, next) => {
		response.locals.isHomePage = (request.path === '/');
		response.locals.host = request.hostname;
		next();
	});
}