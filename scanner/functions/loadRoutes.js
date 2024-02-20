function loadRoutes(app, config) {
	// Because there's some overlap between the different routes,
	//  they have to be loaded in a specific order in order to avoid
	//  passing mongo the wrong id which would result in
	//  "ObjectID generation failed." errors (e.g. #277)
	require('./route/index')(app);
	require('./route/result/download')(app);

	if (!config.readonly) {
		require('./route/new')(app);
		require('./route/task/delete')(app);
		require('./route/task/run')(app);
		require('./route/task/edit')(app);
		require('./route/task/ignore')(app);
		require('./route/task/unignore')(app);
	}

	// Needs to be loaded after `/route/new`
	require('./route/task/index')(app);
	// Needs to be loaded after `/route/task/edit`
	require('./route/result/index')(app);
}