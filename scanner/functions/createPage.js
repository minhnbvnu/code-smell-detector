async function createPage({ files, processors= {}}) {

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

	const page = await browser.newPage();
	page.setDefaultTimeout(3000);

	await page.setRequestInterception(true);
	page.on('request', async interceptedRequest => {
		try {
			const response = await getRequestResource(interceptedRequest.url());
			if (response)
				return void interceptedRequest.respond(response);

			interceptedRequest.continue();
		} catch (ex) {
			page.emit('pageerror', ex)
		}
	});

	const output = [];

	page.on('console', async msg => {

		const entry = { type: msg.type(), text: msg.text(), content: await Promise.all( msg.args().map(e => e.jsonValue()) ) };
		if ( isDev )
			console.log(expect.getState().currentTestName, entry);
		output.push(entry);
	} );

	page.on('pageerror', error => {

		// Emitted when an uncaught exception happens within the page.

		const entry = { type: 'pageerror', text: error.message, content: error };
		console.log(expect.getState().currentTestName, entry);
		output.push(entry);
	} );

	page.on('error', msg => {

		// Emitted when the page crashes.

		console.log(expect.getState().currentTestName, 'error', msg);
	});

	
	await page.goto(new URL('/index.html', local));

	await Promise.race([
		page.waitForTimeout(350),
		//page.waitForSelector('#done'),
		//new Promise(resolve => page.exposeFunction('_done', resolve)),
	]);

	pendingPages.push(page);

	// in some situations, `page.on('console', async msg => {...` has not finished to run, so take a 100ms pause.
	await new Promise(resolve => setTimeout(resolve, 100))

	return { page, output };
}