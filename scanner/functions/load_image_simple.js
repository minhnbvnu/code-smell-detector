function load_image_simple(src) {
		return new Promise((resolve, reject) => {
			const img = new Image();

			img.onload = () => { resolve(img); };
			img.onerror = () => { reject(new Error(`failed to load image from ${src}`)); };

			img.src = src;
		});
	}