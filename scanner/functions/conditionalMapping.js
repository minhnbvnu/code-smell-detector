function conditionalMapping(conditionalMapping_, conditionNames) {
	/** @type {[ConditionalMapping, string[], number][]} */
	let lookup = [[conditionalMapping_, Object.keys(conditionalMapping_), 0]];

	loop: while (lookup.length > 0) {
		const [mapping, conditions, j] = lookup[lookup.length - 1];
		const last = conditions.length - 1;

		for (let i = j; i < conditions.length; i++) {
			const condition = conditions[i];

			// assert default. Could be last only
			if (i !== last) {
				if (condition === "default") {
					throw new Error("Default condition should be last one");
				}
			} else if (condition === "default") {
				const innerMapping = mapping[condition];
				// is nested
				if (isConditionalMapping(innerMapping)) {
					const conditionalMapping = /** @type {ConditionalMapping} */ (
						innerMapping
					);
					lookup[lookup.length - 1][2] = i + 1;
					lookup.push([conditionalMapping, Object.keys(conditionalMapping), 0]);
					continue loop;
				}

				return /** @type {DirectMapping} */ (innerMapping);
			}

			if (conditionNames.has(condition)) {
				const innerMapping = mapping[condition];
				// is nested
				if (isConditionalMapping(innerMapping)) {
					const conditionalMapping = /** @type {ConditionalMapping} */ (
						innerMapping
					);
					lookup[lookup.length - 1][2] = i + 1;
					lookup.push([conditionalMapping, Object.keys(conditionalMapping), 0]);
					continue loop;
				}

				return /** @type {DirectMapping} */ (innerMapping);
			}
		}

		lookup.pop();
	}

	return null;
}