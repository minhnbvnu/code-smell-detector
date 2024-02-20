function vlog(level, message) {
	if (flags.logging >= level)
		console.log(message);
}