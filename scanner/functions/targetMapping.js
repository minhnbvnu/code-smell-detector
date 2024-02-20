function targetMapping(
	remainingRequest,
	isPattern,
	isSubpathMapping,
	mappingTarget,
	assert
) {
	if (remainingRequest === undefined) {
		assert(mappingTarget, false);

		return mappingTarget;
	}

	if (isSubpathMapping) {
		assert(mappingTarget, true);

		return mappingTarget + remainingRequest;
	}

	assert(mappingTarget, false);

	let result = mappingTarget;

	if (isPattern) {
		result = result.replace(
			patternRegEx,
			remainingRequest.replace(/\$/g, "$$")
		);
	}

	return result;
}