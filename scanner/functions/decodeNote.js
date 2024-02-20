function decodeNote(noteDesc){
	const [note, pitch, time, duration, velocity=100, muted=0] = noteDesc
	return {
		pitch, time, 
		startTime : time, 
		endTime : time+duration, 
		duration, velocity, muted
	}
}