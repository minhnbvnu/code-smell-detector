function restore_options() {
	chrome.storage.sync.get({
		log_url: ''
	}, function(items) {
		document.getElementById('log-url').value = items.log_url;
	});
}