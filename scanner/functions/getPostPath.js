function getPostPath(post, config) {
	const dt = luxon.DateTime.fromISO(post.frontmatter.date);

	// start with base output dir
	const pathSegments = [config.output];

	// create segment for post type if we're dealing with more than just "post"
	if (config.includeOtherTypes) {
		pathSegments.push(post.meta.type);
	}

	if (config.yearFolders) {
		pathSegments.push(dt.toFormat('yyyy'));
	}

	if (config.monthFolders) {
		pathSegments.push(dt.toFormat('LL'));
	}

	// create slug fragment, possibly date prefixed
	let slugFragment = post.meta.slug;
	if (config.prefixDate) {
		slugFragment = dt.toFormat('yyyy-LL-dd') + '-' + slugFragment;
	}

	// use slug fragment as folder or filename as specified
	if (config.postFolders) {
		pathSegments.push(slugFragment, 'index.md');
	} else {
		pathSegments.push(slugFragment + '.md');
	}

	return path.join(...pathSegments);
}