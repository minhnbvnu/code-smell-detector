function fix_up_speech_recognition(command) {
	command = command.toLowerCase();
	if (!command.match(/^draw /i) && !(document.activeElement && document.activeElement.matches("input, textarea, [contenteditable]"))) {
		for (const [bad, good] of recognitionFixes) {
			if (bad instanceof RegExp) {
				if (bad.flags.indexOf("i") === -1) {
					console.warn("A speech recognition fix was introduced using a regexp that is not case insensitive. Add the /i flag or make this message more nuanced.");
				}
				command = command.replace(bad, good);
			} else if (bad.match(/^\W|\W$/)) {
				command = command.replace(new RegExp(escapeRegExp(bad), "ig"), good);
			} else {
				command = command.replace(new RegExp(`\\b${escapeRegExp(bad)}\\b`, "ig"), good);
			}
		}
	}
	return command;
}