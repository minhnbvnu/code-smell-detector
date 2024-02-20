function logNotice(notice) {
	console.error(`${bold(yellow(notice.severity))}: ${notice.message}`);
}