function assertImportTarget(imp, expectFolder) {
	const isFolder = imp.charCodeAt(imp.length - 1) === slashCode;

	if (isFolder !== expectFolder) {
		throw new Error(
			expectFolder
				? `Expecting folder to folder mapping. ${JSON.stringify(
						imp
				  )} should end with "/"`
				: `Expecting file to file mapping. ${JSON.stringify(
						imp
				  )} should not end with "/"`
		);
	}
}