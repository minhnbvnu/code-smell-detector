function inblacklist(x, blacklist) {
	var black = false;
	x.toLowerCase().replace(/[-_.,!?'"]/g, " ").split(" ").forEach((word) => {
		word = word
			.replace(/^[^a-z]*/, "")
			.replace(/[^a-z]*$/, "");
		if (blacklist.indexOf(word) >= 0) {
			black = true;
			return;
		}
	});

	return black;
}