function existsSync(filePath) {
	try {
		Deno.lstatSync(filePath);
		return true;
	} catch (err) {
		if (err instanceof Deno.errors.NotFound) {
			return false;
		}
		throw err;
	}
}