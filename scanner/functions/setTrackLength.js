async function setTrackLength(id, length) {
	return await CALL('set_track_length', { length, id })
}