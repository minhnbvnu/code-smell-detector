function choose_interpretation(interpretations) {
		let best_interpretation = interpretations[0];
		if (!interpretations.length) {
			return;
		}
		for (const interpretation of interpretations) {
			if (
				interpretation.match_text.length > best_interpretation.match_text.length ||
				interpretation.prioritize
			) {
				best_interpretation = interpretation;
			}
		}
		return best_interpretation;
	}