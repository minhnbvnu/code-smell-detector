function whatsAt(long,lat) {
		return $http.get('https://api.foursquare.com/v2/venues/search?ll='+lat+','+long+'&intent=browse&radius=30&client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET+'&v=20151201');		
	}