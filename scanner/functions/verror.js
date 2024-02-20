function verror(level, message) {
	if (flags.logging >= level)
		console.error(message);
}