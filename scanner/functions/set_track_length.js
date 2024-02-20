function set_track_length(args){
	var track = new LiveAPI()
	track.id = args.id
	var currentSlots = track.get('clip_slots').length/2
	while (currentSlots < args.length){
		//duplicate
		track.call('duplicate_clip_slot', currentSlots-1)
		currentSlots++
	}
}