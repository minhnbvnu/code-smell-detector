function canonicalSpaceSequence(n, nonBreakingStart, nonBreakingEnd) {
		// "If n is zero, return the empty string."
		if (n == 0) {
			return "";
		}

		// "If n is one and both non-breaking start and non-breaking end are false,
		// return a single space (U+0020)."
		if (n == 1 && !nonBreakingStart && !nonBreakingEnd) {
			return " ";
		}

		// "If n is one, return a single non-breaking space (U+00A0)."
		if (n == 1) {
			return "\xa0";
		}

		// "Let buffer be the empty string."
		var buffer = "";

		// "If non-breaking start is true, let repeated pair be U+00A0 U+0020.
		// Otherwise, let it be U+0020 U+00A0."
		var repeatedPair;
		if (nonBreakingStart) {
			repeatedPair = "\xa0 ";
		} else {
			repeatedPair = " \xa0";
		}

		// "While n is greater than three, append repeated pair to buffer and
		// subtract two from n."
		while (n > 3) {
			buffer += repeatedPair;
			n -= 2;
		}

		// "If n is three, append a three-element string to buffer depending on
		// non-breaking start and non-breaking end:"
		if (n == 3) {
			buffer += !nonBreakingStart && !nonBreakingEnd ? " \xa0 " : nonBreakingStart && !nonBreakingEnd ? "\xa0\xa0 " : !nonBreakingStart && nonBreakingEnd ? " \xa0\xa0" : nonBreakingStart && nonBreakingEnd ? "\xa0 \xa0" : "impossible";

			// "Otherwise, append a two-element string to buffer depending on
			// non-breaking start and non-breaking end:"
		} else {
			buffer += !nonBreakingStart && !nonBreakingEnd ? "\xa0 " : nonBreakingStart && !nonBreakingEnd ? "\xa0 " : !nonBreakingStart && nonBreakingEnd ? " \xa0" : nonBreakingStart && nonBreakingEnd ? "\xa0\xa0" : "impossible";
		}

		// "Return buffer."
		return buffer;
	}