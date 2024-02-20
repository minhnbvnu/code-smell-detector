function filterResultsToUrls(obj, urls = [], skipKeys = []) {
		let arr = [];
		for(let key in obj) {
			if(skipKeys.indexOf(key) > -1) {
				continue;
			}

			let result;
			let newestFilename = Object.keys(obj[key]).sort().pop();
			result = obj[key][newestFilename];
			// urls comes from sites[vertical].urls, all requestedUrls (may not include trailing slash)
			if(urls === true || result && hasUrl(urls, result.requestedUrl)) {
				arr.push(obj[key]);
			}
		}
		return arr;
	}