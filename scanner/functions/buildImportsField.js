function buildImportsField(field) {
	const keys = Object.keys(field);

	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];

		if (key.charCodeAt(0) !== hashCode) {
			throw new Error(
				`Imports field key should start with "#" (key: ${JSON.stringify(key)})`
			);
		}

		if (key.length === 1) {
			throw new Error(
				`Imports field key should have at least 2 characters (key: ${JSON.stringify(
					key
				)})`
			);
		}

		if (key.charCodeAt(1) === slashCode) {
			throw new Error(
				`Imports field key should not start with "#/" (key: ${JSON.stringify(
					key
				)})`
			);
		}
	}

	return field;
}