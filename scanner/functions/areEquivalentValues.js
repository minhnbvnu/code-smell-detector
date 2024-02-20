function areEquivalentValues(command, val1, val2) {
		if (val1 === null && val2 === null) {
			return true;
		}

		if (typeof val1 == "string" && typeof val2 == "string" && val1 == val2 && !(commands[command].hasOwnProperty("equivalentValues"))) {
			return true;
		}

		if (typeof val1 == "string" && typeof val2 == "string" && commands[command].hasOwnProperty("equivalentValues") && commands[command].equivalentValues(val1, val2)) {
			return true;
		}

		return false;
	}