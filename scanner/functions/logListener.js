function logListener(data) {
	chrome.storage.sync.get({
		log_url: ''
	}, function(items) {
		log_url = items.log_url;
		if(!log_url.length) return;
		data = JSON.stringify(data);
		try {
			fetch(log_url, {
				method: 'post',
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				},
				body: data
			});
		} catch(e) { }
	});
}