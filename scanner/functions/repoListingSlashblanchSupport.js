async function repoListingSlashblanchSupport(ref, dir, repoListingConfig) {
	let files;
	const dirParts = decodeURIComponent(dir).split('/');
	while (dirParts.length >= 0) {
		try {
			files = await listContent.viaTreesApi(repoListingConfig); // eslint-disable-line no-await-in-loop
			break;
		} catch (error) {
			if (error.message === 'Not Found') {
				ref += '/' + dirParts.shift();
				repoListingConfig.directory = dirParts.join('/');
				repoListingConfig.ref = ref;
			} else {
				throw error;
			}
		}
	}

	if (files.length === 0 && files.truncated) {
		updateStatus('Warning: It’s a large repo and this it take a long while just to download the list of files. You might want to use "git sparse checkout" instead.');
		files = await listContent.viaContentsApi(repoListingConfig);
	}

	return [files, ref];
}