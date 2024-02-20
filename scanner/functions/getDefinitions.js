function getDefinitions(env, width = 100, height = 100) {
	return new webpack.DefinePlugin({
		PRODUCTION: JSON.stringify(Boolean(env.production)),
		// ANIMATE : JSON.stringify(Boolean(env.animate)),
		ANIMATE: JSON.stringify(false),
		INDEX_FILE: JSON.stringify('index.html'),
		ABOUT_FILE: JSON.stringify('about.html'),
		WIDTH: JSON.stringify(width),
		HEIGHT: JSON.stringify(height),
		VERSION: JSON.stringify(require("./package.json").version),
	})
}