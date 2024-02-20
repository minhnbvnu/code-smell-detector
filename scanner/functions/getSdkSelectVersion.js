function getSdkSelectVersion() {
	var homeDir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'],
		file = path.join(homeDir, '.titanium', 'config.json');
	if (!fs.existsSync(file)) {
		U.die('Titanium configuration file does not exist at "' + file + '"');
	}
	var ticonfig = JSON.parse(fs.readFileSync(file, {encoding: 'utf8'}));
	return ticonfig.sdk.selected;
}