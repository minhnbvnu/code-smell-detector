function searchForBooks(e) {
	$.text.blur();

	// validate search data
	var value = encodeURIComponent($.text.value);
	if (!value) {
		alert('You need to enter search text');
		return;
	}

	// search Google Book API
	model.set('loading', true);
	var xhr = Ti.Network.createHTTPClient({
		onload: function(e) {
			if (handlers.success) {
				processBookData(this.responseText);
			}
			model.set('loading', false);
		},
		onerror: function(e) {
			if (handlers.error) {
				handlers.error(e);
			} else {
				alert('There was an error processing your search. Make sure you have a network connection and try again.');
				Ti.API.error('[ERROR] ' + (e.error || JSON.stringify(e)));
			}
			model.set('loading', false);
		},
		timeout: 5000
	});
	xhr.open('GET', API_URL + value);
	xhr.send();
}