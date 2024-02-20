function jsPrintf() {
	var args = Array.prototype.slice.call(arguments);
	args.unshift(process.stdout);
	jsFprintf.apply(null, args);
}