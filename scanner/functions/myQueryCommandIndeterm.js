function myQueryCommandIndeterm(command, range) {
		// "All of these methods must treat their command argument ASCII
		// case-insensitively."
		command = command.toLowerCase();

		// "If command is not supported, raise a NOT_SUPPORTED_ERR exception."
		//
		// "If command has no indeterminacy, raise an INVALID_ACCESS_ERR
		// exception."
		return editCommandMethod(command, "indeterm", range, (function (command) {
			return function () {
				// "If command is not enabled, return false."
				if (!myQueryCommandEnabled(command, range)) {
					return false;
				}

				// "Return true if command is indeterminate, otherwise false."
				return commands[command].indeterm(range);
			};
		}(command)));
	}