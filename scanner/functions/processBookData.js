function processBookData(data) {
	var books = [];

	// make sure the returned data is valid
	var items;
	try {
		items = JSON.parse(data).items;
	} catch (e) {
		alert('Invalid response from server. Try again.');
		return;
	}

	// process each book, turning it into a table row
	for (var i = 0; i < Math.min(items.length, MAX_BOOKS); i++) {
		var info = items[i].volumeInfo;
		if (!info) { continue; }
		var links = info.imageLinks || {};
		var authors = (info.authors || []).join(', ');
		books.push({
			title: info.title || '',
			authors: authors,
			image: links.smallThumbnail || links.thumbnail || 'none'
		});
	}

	// fire success handler with list of books
	handlers.success(books);
}