function mergeFilteredToArray(array, filter) {
	/** @type {Array<string | string[]>} */
	const result = [];
	const set = new Set(array);

	for (const item of set) {
		if (filter(item)) {
			const lastElement =
				result.length > 0 ? result[result.length - 1] : undefined;
			if (Array.isArray(lastElement)) {
				lastElement.push(item);
			} else {
				result.push([item]);
			}
		} else {
			result.push(item);
		}
	}

	return result;
}