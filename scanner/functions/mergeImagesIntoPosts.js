function mergeImagesIntoPosts(images, posts) {
	images.forEach(image => {
		posts.forEach(post => {
			let shouldAttach = false;

			// this image was uploaded as an attachment to this post
			if (image.postId === post.meta.id) {
				shouldAttach = true;
			}

			// this image was set as the featured image for this post
			if (image.id === post.meta.coverImageId) {
				shouldAttach = true;
				post.frontmatter.coverImage = shared.getFilenameFromUrl(image.url);
			}

			if (shouldAttach && !post.meta.imageUrls.includes(image.url)) {
				post.meta.imageUrls.push(image.url);
			}
		});
	});
}