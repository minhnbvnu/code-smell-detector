async function getRequestResource(url) {

		const { origin, pathname } = new URL(url);

		if ( origin !== local.origin )
			return null

		let body = files[pathname]

		if ( body === undefined ) {
			
			return {
				status: 404,
			}
		}

		if ( typeof body !== 'string' && !(body instanceof Buffer) )
			throw new Error('response body must be a string of a Buffer');

		if (processors[pathname]) {

			body = processors[pathname](body)
		}

		const contentType = mime.lookup(Path.extname(pathname)) || '';
		const charset = mime.charset(contentType);

		const res = {
			contentType: contentType + (charset ? '; charset=' + charset : ''),
			body,
		};

		return res;
	}