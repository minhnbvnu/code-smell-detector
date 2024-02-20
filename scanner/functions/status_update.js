function status_update(text = "") {
	process.stdout.clearLine();
	process.stdout.write(text);
	process.stdout.cursorTo(0);
}