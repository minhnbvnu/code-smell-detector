function require_mini (m) {
	let scope = {
    exports: {}
  };
	Services.scriptloader.loadSubScript('chrome://' + m + '.js', scope);
	return scope.exports;
}