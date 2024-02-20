function findMatch(request, field) {
	if (
		Object.prototype.hasOwnProperty.call(field, request) &&
		!request.includes("*") &&
		!request.endsWith("/")
	) {
		const target = /** @type {{[k: string]: MappingValue}} */ (field)[request];

		return [target, "", false, false];
	}

	/** @type {string} */
	let bestMatch = "";
	/** @type {string|undefined} */
	let bestMatchSubpath;

	const keys = Object.getOwnPropertyNames(field);

	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const patternIndex = key.indexOf("*");

		if (patternIndex !== -1 && request.startsWith(key.slice(0, patternIndex))) {
			const patternTrailer = key.slice(patternIndex + 1);

			if (
				request.length >= key.length &&
				request.endsWith(patternTrailer) &&
				patternKeyCompare(bestMatch, key) === 1 &&
				key.lastIndexOf("*") === patternIndex
			) {
				bestMatch = key;
				bestMatchSubpath = request.slice(
					patternIndex,
					request.length - patternTrailer.length
				);
			}
		}
		// For legacy `./foo/`
		else if (
			key[key.length - 1] === "/" &&
			request.startsWith(key) &&
			patternKeyCompare(bestMatch, key) === 1
		) {
			bestMatch = key;
			bestMatchSubpath = request.slice(key.length);
		}
	}

	if (bestMatch === "") return null;

	const target = /** @type {{[k: string]: MappingValue}} */ (field)[bestMatch];
	const isSubpathMapping = bestMatch.endsWith("/");
	const isPattern = bestMatch.includes("*");

	return [
		target,
		/** @type {string} */ (bestMatchSubpath),
		isSubpathMapping,
		isPattern
	];
}