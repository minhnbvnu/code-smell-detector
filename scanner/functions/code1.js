function code1(open, close) {
	return {
		open: `\x1b[${open.join(';')}m`,
		close: `\x1b[${close}m`,
		regexp: new RegExp(`\\x1b\\[${close}m`, 'g'),
	};
}