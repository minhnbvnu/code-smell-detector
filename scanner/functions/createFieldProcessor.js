function createFieldProcessor(
	field,
	normalizeRequest,
	assertRequest,
	assertTarget
) {
	return function fieldProcessor(request, conditionNames) {
		request = assertRequest(request);

		const match = findMatch(normalizeRequest(request), field);

		if (match === null) return [];

		const [mapping, remainingRequest, isSubpathMapping, isPattern] = match;

		/** @type {DirectMapping|null} */
		let direct = null;

		if (isConditionalMapping(mapping)) {
			direct = conditionalMapping(
				/** @type {ConditionalMapping} */ (mapping),
				conditionNames
			);

			// matching not found
			if (direct === null) return [];
		} else {
			direct = /** @type {DirectMapping} */ (mapping);
		}

		return directMapping(
			remainingRequest,
			isPattern,
			isSubpathMapping,
			direct,
			conditionNames,
			assertTarget
		);
	};
}