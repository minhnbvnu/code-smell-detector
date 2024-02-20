function get_notes(args){
	var clip = new LiveAPI()
	clip.id = args.id
	if (clip.type === 'ClipSlot'){
		clip.id = clip.get('clip')[1]
	}
	return {
		id : clip.id,
		notes : clip.call('get_notes', 0, 0, 10000, 127),
		duration : clip.get('end_time')[0]
	}
}