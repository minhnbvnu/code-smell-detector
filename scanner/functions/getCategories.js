function getCategories(post) {
	const categories = processCategoryTags(post, 'category');
	return categories.filter(category => !settings.filter_categories.includes(category));
}