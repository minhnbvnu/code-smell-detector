function notPlatform(platform) {
	return _.reject(CONST.PLATFORMS, function(p) { return p === platform; } );
}