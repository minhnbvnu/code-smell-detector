function clips(args){
	var track = new LiveAPI()
	track.id = args.id
	var clips = track.get('clip_slots')
	var retClips = []
	for (var j = 0; j < clips.length; j++){
		if (clips[j] !== 'id'){
			var clipSlot = new LiveAPI()
			clipSlot.id = clips[j]
			var hasClip = Boolean(clipSlot.get('has_clip')[0])
			var clipName = ''
			if (hasClip){
				var innerClip = new LiveAPI()
				innerClip.id = clipSlot.get('clip')[1]
				clipName = innerClip.get('name')[0]
			}
			retClips.push({
				id : clips[j],
				empty : !hasClip,
				name : clipName
			})
		}
	}
	return retClips
}