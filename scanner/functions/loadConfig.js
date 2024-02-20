function loadConfig() {
	try {
		fs.statSync("config.json"); // test existence
		return JSON.parse(fs.readFileSync("config.json", "utf-8"));
	} catch(e) {
		var config = { // default config
		};
		fs.writeFileSync("config.json", JSON.stringify(config), "utf-8");
		return config;
	}
}