function encodeNote(note){
	const { pitch, startTime, endTime, velocity=100, muted=0 } = note
	return ['note', pitch, startTime.toFixed(2), (endTime - startTime).toFixed(2), velocity, muted]
}