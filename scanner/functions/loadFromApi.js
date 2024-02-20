function loadFromApi(url,next){
		console.log("load from api " + apiUrl + url);
		FetchService.json(apiUrl + url,function(data){
			next(data);
		})
	}