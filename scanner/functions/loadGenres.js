function loadGenres(next){
		if (genres.length) {
			if (next) next(genres);
		}else{
			loadFromApi("genres",function(result){
				if (result){
					result.forEach(function(genre){
						var item = {title: genre.name, url : "genre/" + genre.name ,children : [],info:genre.count + " >"};
						genres.push(item);
					});
				}
				if (next) next(genres);
			})
		}
	}