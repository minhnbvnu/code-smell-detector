function assertExportTarget(exp, expectFolder) {
	if (
		exp.charCodeAt(0) === slashCode ||
		(exp.charCodeAt(0) === dotCode && exp.charCodeAt(1) !== slashCode)
	) {
		throw new Error(
			`Export should be relative path and start with "./", got ${JSON.stringify(
				exp
			)}.`
		);
	}

	const isFolder = exp.charCodeAt(exp.length - 1) === slashCode;

	if (isFolder !== expectFolder) {
		throw new Error(
			expectFolder
				? `Expecting folder to folder mapping. ${JSON.stringify(
						exp
				  )} should end with "/"`
				: `Expecting file to file mapping. ${JSON.stringify(
						exp
				  )} should not end with "/"`
		);
	}
}