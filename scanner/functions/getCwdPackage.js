function getCwdPackage() {
	try {
		return readPkg.sync({ cwd });
	} catch (e) {
		const [errorType] = Object.values(e);
		error(
			e,
			errorType === "JSONError"
				? "package.json contains malformed JSON"
				: "No package.json found"
		);
	}
}