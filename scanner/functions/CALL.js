async function CALL(method, args) {
	const response = await fetch(`/call`, {
		method: 'POST',
		body: JSON.stringify({ method, args }),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	})
	return await response.json()
}