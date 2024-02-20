async function getNotes(id) {
	const response = await CALL('get_notes', { id })
	response.notes = decode(response.notes)
	return response
}