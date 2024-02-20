function set_notes(args){
	var clip = new LiveAPI()
	clip.id = args.id
	if (clip.get('has_clip')[0]){
		clip.call('delete_clip')
	}
	//set it to the clip
	clip.call('create_clip', args.duration)
	//get the clip that was just created
	post(clip.get('clip')[1])
	clip.id = parseInt(clip.get('clip')[1])
	clip.set('name', args.name)
	clip.set('color', args.color)
	// clip.set('loop_length', args.duration)
	clip.call('set_notes')
	var notes = args.notes
	for (var i = 0; i < notes.length; i++){
		var note = notes[i]
		clip.call.apply(clip, note)
	}
	return {
		id : clip.id
	}
}