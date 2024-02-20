function assetUrl(url){
			url = baseUrl + url;
			if (useVersion) url += ("?v=" + App.buildNumber);
			return url;
		}