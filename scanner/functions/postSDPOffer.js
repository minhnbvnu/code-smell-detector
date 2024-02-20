async function postSDPOffer(endpoint, data) {
	return await fetch(endpoint, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'content-type': 'application/sdp',
		},
		body: data,
	});
}