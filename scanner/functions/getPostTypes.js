function getPostTypes(data, config) {
	if (config.includeOtherTypes) {
		// search export file for all post types minus some default types we don't want
		// effectively this will be 'post', 'page', and custom post types
		const types = data.rss.channel[0].item
			.map(item => item.post_type[0])
			.filter(type => !['attachment', 'revision', 'nav_menu_item', 'custom_css', 'customize_changeset'].includes(type));
		return [...new Set(types)]; // remove duplicates
	} else {
		// just plain old vanilla "post" posts
		return ['post'];
	}
}