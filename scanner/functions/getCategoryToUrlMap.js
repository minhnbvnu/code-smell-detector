async function getCategoryToUrlMap() {
	let categories = await fastglob("./_data/sites/*.js", {
		caseSensitiveMatch: false
	});

	let map = {};
	for(let file of categories) {
		let categoryName = file.split("/").pop().replace(/\.js$/, "");
		map[categoryName] = [];

		let categoryData = require(`./sites/${categoryName}.js`);
		if(typeof categoryData === "function") {
			categoryData = await categoryData();
		}
		// TODO lowercase just the origin?
		map[categoryName] = categoryData.urls.map(url => url.toLowerCase());
	}

	return map;
}