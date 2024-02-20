function myQueryCommandValue(command, range) {
		// "All of these methods must treat their command argument ASCII
		// case-insensitively."
		command = command.toLowerCase();

		return editCommandMethod(command, "value", range, function () {
			// "If command is not supported or has no value, return the empty string."
			if (!commands.hasOwnProperty(command) || !commands[command].hasOwnProperty("value")) {
				return "";
			}

			// "If command is "fontSize" and its value override is set, convert the
			// value override to an integer number of pixels and return the legacy
			// font size for the result."
			if (command == "fontsize" && getValueOverride("fontsize", range) !== undefined) {
				return getLegacyFontSize(getValueOverride("fontsize", range));
			}

			// "If the value override for command is set, return it."
			if (typeof getValueOverride(command, range) != "undefined") {
				return getValueOverride(command, range);
			}

			// "Return command's value."
			return commands[command].value(range);
		});
	}