function readError(error) {
	if (error) {
		let prefix = "There was an issue accessing your data: ";
		return console.log(prefix + error);
	}
}