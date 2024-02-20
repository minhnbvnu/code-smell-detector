function chunkContainsInvalidCharset(chunk) {
	let invalid = false;

	// meta charset
	const charsetRegex = /<\s*meta[^>]+charset\s*=\s*['"]([^'"]*)['"][^>]*>/gim;
	const charsetMatch = charsetRegex.exec(chunk);
	if (charsetMatch) {
		const docCharset = charsetMatch[1].toLowerCase();
		if (!VALID_CHARSETS.includes(docCharset)) {
			invalid = true;
		}
	}
	// content-type
	const contentTypeRegex = /<\s*meta[^>]+http-equiv\s*=\s*['"]\s*content-type[^>]*>/gim;
	const contentTypeMatch = contentTypeRegex.exec(chunk);
	if (contentTypeMatch) {
		const metaTag = contentTypeMatch[0];
		const metaRegex = /charset\s*=\s*([^\s"]*)/gim;
		const metaMatch = metaRegex.exec(metaTag);
		if (metaMatch) {
			const charset = metaMatch[1].toLowerCase();
			if (!VALID_CHARSETS.includes(charset)) {
				invalid = true;
			}
		}
	}
	return invalid;
}