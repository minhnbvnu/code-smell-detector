function myQueryCommandSupported(command) {
		// "All of these methods must treat their command argument ASCII
		// case-insensitively."
		command = command.toLowerCase();

		return commands.hasOwnProperty(command);
	}