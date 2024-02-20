function getCategoryList(map, url) {
	let categories = new Set();
	for(let categoryName in map) {
		if(map[categoryName].indexOf(url.toLowerCase())) {
			categories.add(categoryName);
		}
	}
	return Array.from(categories);
}