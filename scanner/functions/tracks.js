function tracks(){
	var api = new LiveAPI()
	api.path = 'live_set'
	var tracks = api.get('tracks')
	var retTracks = []
	for (var i = 0; i < tracks.length; i++){
		if (tracks[i] !== 'id'){
			var track = new LiveAPI()
			track.id = parseInt(tracks[i])
			if (parseInt(track.get('has_midi_input'))){
				retTracks.push({
					name : track.get('name')[0],
					id : parseInt(track.id),
				})
			}
		}
	}
	return retTracks
}