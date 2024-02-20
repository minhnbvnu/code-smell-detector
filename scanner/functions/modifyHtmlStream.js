async function modifyHtmlStream(readable, writable, request) {
	const reader = readable.getReader();
	const writer = writable.getWriter();
	const encoder = new TextEncoder();
	let decoder = new TextDecoder('utf-8', { fatal: true });

	let firstChunk = true;
	let unsupportedCharset = false;

	// build the list of url patterns we are going to look for.
	let patterns = [];
	for (let scriptUrl of SCRIPT_URLS) {
		let regex = new RegExp(SCRIPT_PRE + scriptUrl + PATTERN_POST, 'gi');
		patterns.push(regex);
	}

	let partial = '';
	let content = '';

	for (;;) {
		const { done, value } = await reader.read();
		if (done) {
			if (partial.length) {
				partial = await modifyHtmlChunk(partial, patterns, request);
				await writer.write(encoder.encode(partial));
			}
			partial = '';
			break;
		}

		let chunk = null;
		if (unsupportedCharset) {
			// Pass the data straight through
			await writer.write(value);
			continue;
		} else {
			try {
				chunk = decoder.decode(value, { stream: true });
			} catch (e) {
				// Decoding failed, switch to passthrough
				unsupportedCharset = true;
				if (partial.length) {
					await writer.write(encoder.encode(partial));
					partial = '';
				}
				await writer.write(value);
				continue;
			}
		}

		try {
			// Look inside of the first chunk for a HTML charset or content-type meta tag.
			if (firstChunk) {
				firstChunk = false;
				if (chunkContainsInvalidCharset(chunk)) {
					// switch to passthrough
					unsupportedCharset = true;
					if (partial.length) {
						await writer.write(encoder.encode(partial));
						partial = '';
					}
					await writer.write(value);
					continue;
				}
			}

			// TODO: Optimize this so we aren't continuously adding strings together
			content = partial + chunk;
			partial = '';

			// See if there is an unclosed script tag at the end (and if so, carve
			// it out to complete when the remainder comes in).
			// This isn't perfect (case sensitive and doesn't allow whitespace in the tag)
			// but it is good enough for our purpose and much faster than a regex.
			const scriptPos = content.lastIndexOf('<script');
			if (scriptPos >= 0) {
				const scriptClose = content.indexOf('>', scriptPos);
				if (scriptClose === -1) {
					partial = content.slice(scriptPos);
					content = content.slice(0, scriptPos);
				}
			}

			if (content.length) {
				content = await modifyHtmlChunk(content, patterns, request);
			}
		} catch (e) {
			// Ignore the exception
		}
		if (content.length) {
			await writer.write(encoder.encode(content));
			content = '';
		}
	}
	await writer.close();
}