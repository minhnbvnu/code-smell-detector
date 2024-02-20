function myQueryCommandEnabled(command, range) {
		// "All of these methods must treat their command argument ASCII
		// case-insensitively."
		command = command.toLowerCase();

		// "If command is not supported, raise a NOT_SUPPORTED_ERR exception."
		return editCommandMethod(command, "action", range, (function (command) {
			return function () {
				// "Among commands defined in this specification, those listed in
				// Miscellaneous commands are always enabled. The other commands defined
				// here are enabled if the active range is not null, and disabled
				// otherwise."
				return jQuery.inArray(command, ["copy", "cut", "paste", "selectall", "stylewithcss", "usecss"]) != -1 || range !== null;
			};
		}(command)));
	}