function showUsage() {
	var levels = 'admin|user';

	if (app.modules.permissions) {
		levels = Object.keys(GLOBAL.CFG.modules.permissions.config.plans).join('|')
	}

	console.log('Usage - token_get {account uuid|user_name|email address} (' + levels + ')');
	process.exit(0);
}