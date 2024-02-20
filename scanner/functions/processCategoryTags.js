function processCategoryTags(post, domain) {
	if (!post.category) {
		return [];
	}

	return post.category
		.filter(category => category.$.domain === domain)
		.map(({ $: attributes }) => decodeURIComponent(attributes.nicename));
}