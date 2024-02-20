function getExportAllMessage(count, total, noun) {
	let s = total === 1 ? '' : 's';
	if (total === 0) { return `No ${noun}s found to export`; }
	if (count === total) { return `Exported ${count} ${noun}${s}`; }
	if (count > 0) { return `Exported ${count} of ${total} ${noun}${s}`; }
	return `Failed to export ${total} ${noun}${s}`;
}