function banner() {
	if (!program.dump) {
		var m = 'Alloy ' + module.exports.version + ' by TiDev. The MVC app framework for Titanium.\n'.white;
		console.log(logger.stripColors ? colors.stripColors(m) : m);
	}
}