function loadArtists(next){
		if (artists.length) {
			if (next) next(artists);
		}else{
			loadFromApi("artists",function(result){
				if (result){
					result.forEach(function(artist){
						console.log(artist);
						var item = {title: artist.handle, info:  artist.count + " >", url : "artist/" + artist.id ,children : []};
						artists.push(item);
					});
				}
				if (next) next(artists);
			})
		}
	}