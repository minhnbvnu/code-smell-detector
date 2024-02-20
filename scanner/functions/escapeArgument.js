function escapeArgument(arg) {
		// handle multi-line string arguments.
		return arg.replace(/\r\n?|\n/g, "\\n");
	}