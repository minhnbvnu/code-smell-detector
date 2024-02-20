function myExecCommand(commandArg, showUiArg, valueArg, range) {
		// "All of these methods must treat their command argument ASCII
		// case-insensitively."
		var command = commandArg.toLowerCase();
		var showUi = showUiArg;
		var value = valueArg;

		// "If only one argument was provided, let show UI be false."
		//
		// If range was passed, I can't actually detect how many args were passed
		// . . .
		if (arguments.length == 1 || (arguments.length >= 4 && typeof showUi == "undefined")) {
			showUi = false;
		}

		// "If only one or two arguments were provided, let value be the empty
		// string."
		if (arguments.length <= 2 || (arguments.length >= 4 && typeof value == "undefined")) {
			value = "";
		}

		// "If command is not supported, raise a NOT_SUPPORTED_ERR exception."
		//
		// "If command has no action, raise an INVALID_ACCESS_ERR exception."
		return editCommandMethod(command, "action", range, (function (command, showUi, value) {
			return function () {
				// "If command is not enabled, return false."
				if (!myQueryCommandEnabled(command)) {
					return false;
				}

				// "Take the action for command, passing value to the instructions as an
				// argument."
				commands[command].action(value, range);

				// always fix the range after the command is complete
				setActiveRange(range);

				// "Return true."
				return true;
			};
		}(command, showUi, value)));
	}