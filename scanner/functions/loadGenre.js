function loadGenre(id,page,next){
		var url = "genre/" + id;
		if (page) {
			page = parseInt(page);
			url += "/" + page;
		}
		loadFromApi(url,function(data){
			next(parseModList(data));
		})
	}