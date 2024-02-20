function resetAllFetchTimer(){

		for(url in fetchTimer){
			clearInterval(fetchTimer[url]);
		}

	}