async function setNotes(args) {
	args.notes = encode(args.notes)
	const response = await CALL('set_notes', args)
	return response
}