function directMapping(
	remainingRequest,
	isPattern,
	isSubpathMapping,
	mappingTarget,
	conditionNames,
	assert
) {
	if (mappingTarget === null) return [];

	if (typeof mappingTarget === "string") {
		return [
			targetMapping(
				remainingRequest,
				isPattern,
				isSubpathMapping,
				mappingTarget,
				assert
			)
		];
	}

	/** @type {string[]} */
	const targets = [];

	for (const exp of mappingTarget) {
		if (typeof exp === "string") {
			targets.push(
				targetMapping(
					remainingRequest,
					isPattern,
					isSubpathMapping,
					exp,
					assert
				)
			);
			continue;
		}

		const mapping = conditionalMapping(exp, conditionNames);
		if (!mapping) continue;
		const innerExports = directMapping(
			remainingRequest,
			isPattern,
			isSubpathMapping,
			mapping,
			conditionNames,
			assert
		);
		for (const innerExport of innerExports) {
			targets.push(innerExport);
		}
	}

	return targets;
}