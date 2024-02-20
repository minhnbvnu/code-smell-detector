function myQueryCommandState(command, range) {
		// "All of these methods must treat their command argument ASCII
		// case-insensitively."
		command = command.toLowerCase();

		// "If command is not supported, raise a NOT_SUPPORTED_ERR exception."
		//
		// "If command has no state, raise an INVALID_ACCESS_ERR exception."
		return editCommandMethod(command, "state", range, (function (command) {
			return function () {
				// "If command is not enabled, return false."
				if (!myQueryCommandEnabled(command, range)) {
					return false;
				}

				// "If the state override for command is set, return it."
				if (typeof getStateOverride(command, range) != "undefined") {
					return getStateOverride(command, range);
				}

				// "Return true if command's state is true, otherwise false."
				return commands[command].state(range);
			};
		}(command)));
	}