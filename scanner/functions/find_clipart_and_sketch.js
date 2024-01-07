function find_clipart_and_sketch(subject_matter) {
		find_clipart(subject_matter).then((results) => {

			// @TODO: select less complex images (less file size to width, say?) maybe, and/or better semantic matches by looking for the search terms in the title?
			// detect gradients / spread out histogram at least, and reject based on that
			let image_url = results[~~(Math.random() * results.length)].image_url;
			console.log("Using source image:", image_url);
			if (!image_url.match(/^data:/)) {
				image_url = `https://jspaint-cors-proxy.herokuapp.com/${image_url}`;
			}
			const img = new Image();
			img.crossOrigin = "Anonymous";
			img.onerror = () => {
				$status_text.text("Failed to load clipart.");
			};
			img.onload = () => {
				// @TODO: find an empty spot on the canvas for the sketch, smaller if need be
				const max_sketch_width = 500;
				const max_sketch_height = 500;
				let aspect_ratio = img.width / img.height;
				let width = Math.min(img.width, max_sketch_width);
				let height = Math.min(img.height, max_sketch_height);
				if (width / height < aspect_ratio) {
					height = width / aspect_ratio;
				}
				if (width / height > aspect_ratio) {
					width = height * aspect_ratio;
				}
				const img_canvas = make_canvas(width, height);
				img_canvas.ctx.drawImage(img, 0, 0, width, height);
				const image_data = img_canvas.ctx.getImageData(0, 0, img_canvas.width, img_canvas.height);
				resize_canvas_without_saving_dimensions(Math.max(main_canvas.width, image_data.width), Math.max(main_canvas.height, image_data.height));
				trace_and_sketch(image_data);
			};
			img.src = image_url;
		}, (error) => {
			if (error.code === "no-results") {
				$status_text.text(`No clipart found for '${subject_matter}'`);
			} else {
				show_error_message("Failed to find clipart.", error);
			}
		});
	}