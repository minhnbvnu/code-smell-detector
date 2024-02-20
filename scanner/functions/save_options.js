function save_options() {
	var log_url = document.getElementById('log-url').value;
	chrome.storage.sync.set({
		log_url: log_url.length > 0?log_url:''
	}, function() {
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
			window.close();
		}, 750);
	});
}