function buildExportsField(field) {
	// handle syntax sugar, if exports field is direct mapping for "."
	if (typeof field === "string" || Array.isArray(field)) {
		return { ".": field };
	}

	const keys = Object.keys(field);

	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];

		if (key.charCodeAt(0) !== dotCode) {
			// handle syntax sugar, if exports field is conditional mapping for "."
			if (i === 0) {
				while (i < keys.length) {
					const charCode = keys[i].charCodeAt(0);
					if (charCode === dotCode || charCode === slashCode) {
						throw new Error(
							`Exports field key should be relative path and start with "." (key: ${JSON.stringify(
								key
							)})`
						);
					}
					i++;
				}

				return { ".": field };
			}

			throw new Error(
				`Exports field key should be relative path and start with "." (key: ${JSON.stringify(
					key
				)})`
			);
		}

		if (key.length === 1) {
			continue;
		}

		if (key.charCodeAt(1) !== slashCode) {
			throw new Error(
				`Exports field key should be relative path and start with "./" (key: ${JSON.stringify(
					key
				)})`
			);
		}
	}

	return field;
}