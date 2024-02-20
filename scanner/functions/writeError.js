function writeError(error) {
	if (error) {
		let prefix = "There was an issue saving your data: ";
		return console.log(prefix + error);
	}
}