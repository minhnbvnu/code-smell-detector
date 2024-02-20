function collectPosts(data, postTypes, config) {
	// this is passed into getPostContent() for the markdown conversion
	const turndownService = translator.initTurndownService();

	let allPosts = [];
	postTypes.forEach(postType => {
		const postsForType = getItemsOfType(data, postType)
			.filter(post => post.status[0] !== 'trash' && post.status[0] !== 'draft')
			.map(post => ({
				// meta data isn't written to file, but is used to help with other things
				meta: {
					id: getPostId(post),
					slug: getPostSlug(post),
					coverImageId: getPostCoverImageId(post),
					type: postType,
					imageUrls: []
				},
				frontmatter: {
					title: getPostTitle(post),
					date: getPostDate(post),
					categories: getCategories(post),
					tags: getTags(post)
				},
				content: translator.getPostContent(post, turndownService, config)
			}));

		if (postTypes.length > 1) {
			console.log(`${postsForType.length} "${postType}" posts found.`);
		}

		allPosts.push(...postsForType);
	});

	if (postTypes.length === 1) {
		console.log(allPosts.length + ' posts found.');
	}
	return allPosts;
}