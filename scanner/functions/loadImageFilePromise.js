async function loadImageFilePromise(imageUrl) {
	// only encode the URL if it doesn't already have encoded characters
	const url = (/%[\da-f]{2}/i).test(imageUrl) ? imageUrl : encodeURI(imageUrl);

	let buffer;
	try {
		buffer = await requestPromiseNative.get({
			url,
			encoding: null, // preserves binary encoding
			headers: {
				'User-Agent': 'wordpress-export-to-markdown'
			}
		});
	} catch (ex) {
		if (ex.name === 'StatusCodeError') {
			// these errors contain a lot of noise, simplify to just the status code
			ex.message = ex.statusCode;
		}
		throw ex;
	}
	return buffer;
}