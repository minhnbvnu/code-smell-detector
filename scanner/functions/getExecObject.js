function getExecObject(args) {
	args = Array.prototype.slice.call(args, 0);
	return {
		error: args[0],
		stdout: args[1],
		stderr: args[2]
	};
}