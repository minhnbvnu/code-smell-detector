async function writeImageFilesPromise(posts, config) {
	// collect image data from all posts into a single flattened array of payloads
	let skipCount = 0;
	let delay = 0;
	const payloads = posts.flatMap(post => {
		const postPath = getPostPath(post, config);
		const imagesDir = path.join(path.dirname(postPath), 'images');
		return post.meta.imageUrls.flatMap(imageUrl => {
			const filename = shared.getFilenameFromUrl(imageUrl);
			const destinationPath = path.join(imagesDir, filename);
			if (checkFile(destinationPath)) {
				// already exists, don't need to save again
				skipCount++;
				return [];
			} else {
				const payload = {
					item: imageUrl,
					name: filename,
					destinationPath,
					delay
				};
				delay += settings.image_file_request_delay;
				return [payload];
			}
		});
	});

	const remainingCount = payloads.length;
	if (remainingCount + skipCount === 0) {
		console.log('\nNo images to download and save...');
	} else {
		console.log(`\nDownloading and saving ${remainingCount} images (${skipCount} already exist)...`);
		await processPayloadsPromise(payloads, loadImageFilePromise);
	}
}