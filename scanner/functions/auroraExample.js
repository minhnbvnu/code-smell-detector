async function auroraExample(request) {
	if (request.method === 'POST') {
		const jsonData = await request.json();
		return await auroraPostData(jsonData);
	} else {
		// We need to create a URL object so we can read the query parameters from the request
		const url = new URL(request.url);
		const ID = url.searchParams.get('ID');
		return await auroraGetData(ID);
	}
}