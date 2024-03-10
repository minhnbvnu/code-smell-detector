	blob.arrayBuffer().then((arrayBuffer)=> {
		// Helpers:
		// "GIF".split("").map(c=>"0x"+c.charCodeAt(0).toString("16")).join(", ")
		// [0x47, 0x49, 0x46].map(c=>String.fromCharCode(c)).join("")
		const magics = {
			png: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
			bmp: [0x42, 0x4D], // "BM" in ASCII
			jpeg: [0xFF, 0xD8, 0xFF],
			gif: [0x47, 0x49, 0x46, 0x38], // "GIF8" in ASCII, fully either "GIF87a" or "GIF89a"
			webp: [0x57, 0x45, 0x42, 0x50], // "WEBP" in ASCII
			tiff_be: [0x4D, 0x4D, 0x0, 0x2A],
			tiff_le: [0x49, 0x49, 0x2A, 0x0],
			ico: [0x00, 0x00, 0x01, 0x00],
			cur: [0x00, 0x00, 0x02, 0x00],
			icns: [0x69, 0x63, 0x6e, 0x73], // "icns" in ASCII
		};
		const file_bytes = new Uint8Array(arrayBuffer);
		let detected_type_id;
		for (const [type_id, magic_bytes] of Object.entries(magics)) {
			const magic_found = magic_bytes.every((byte, index)=> byte === file_bytes[index]);
			if (magic_found) {
				detected_type_id = type_id;
			}
		}
		if (!detected_type_id) {
			if (String.fromCharCode(...file_bytes.slice(0, 1024)).includes("%PDF")) {
				detected_type_id = "pdf";
			}
		}
		if (detected_type_id === "bmp") {
			const {colorTable, bitsPerPixel, imageData} = decodeBMP(arrayBuffer);
			file_format = bitsPerPixel === 24 ? "image/bmp" : `image/bmp;bpp=${bitsPerPixel}`;
			if (colorTable.length >= 2) {
				if (colorTable.length === 2) {
					palette = make_monochrome_palette(...colorTable.map((color)=> [color.r, color.g, color.b, 255]));
					monochrome = true;
				} else {
					palette = colorTable.map((color)=> `rgb(${color.r}, ${color.g}, ${color.b})`);
					monochrome = false;
				}
			}
			// if (bitsPerPixel !== 32 && bitsPerPixel !== 16) {
			// 	for (let i = 3; i < imageData.data.length; i += 4) {
			// 		imageData.data[i] = 255;
			// 	}
			// }
			callback(null, {file_format, monochrome, palette, image_data: imageData, source_blob: blob});
		} else if (detected_type_id === "png") {
			const decoded  = UPNG.decode(arrayBuffer);
			const rgba = UPNG.toRGBA8(decoded)[0];
			const { width, height, tabs, ctype } = decoded;
			// If it's a palettized PNG, load the palette for the Colors box.
			// Note: PLTE (palette) chunk must be present for palettized PNGs,
			// but can also be present as a recommended set of colors in true-color mode.
			// tRNs (transparency) chunk can provide alpha data associated with each color in the PLTE chunk.
			// It may contain as many transparency entries as there are palette entries, or as few as one.
			// tRNS chunk can also be used to specify a single color to be considered fully transparent in true-color mode.
			if (tabs.PLTE && tabs.PLTE.length >= 3 * 2 && ctype === 3 /* palettized */) {
				if (tabs.PLTE.length === 3 * 2) {
					palette = make_monochrome_palette(
						[...tabs.PLTE.slice(0, 3), tabs.tRNS?.[0] ?? 255],
						[...tabs.PLTE.slice(3, 6), tabs.tRNS?.[1] ?? 255]
					);
					monochrome = true;
				} else {
					palette = new Array(tabs.PLTE.length / 3);
					for (let i = 0; i < palette.length; i++) {
						if (tabs.tRNS && tabs.tRNS.length >= i + 1) {
							palette[i] = `rgba(${tabs.PLTE[i * 3 + 0]}, ${tabs.PLTE[i * 3 + 1]}, ${tabs.PLTE[i * 3 + 2]}, ${tabs.tRNS[i] / 255})`;
						} else {
							palette[i] = `rgb(${tabs.PLTE[i * 3 + 0]}, ${tabs.PLTE[i * 3 + 1]}, ${tabs.PLTE[i * 3 + 2]})`;
						}
					}
					monochrome = false;
				}
			}
			file_format = "image/png";
			const image_data = new ImageData(new Uint8ClampedArray(rgba), width, height);
			callback(null, { file_format, monochrome, palette, image_data, source_blob: blob });
		} else if (detected_type_id === "tiff_be" || detected_type_id === "tiff_le") {
			// IFDs = image file directories
			// VSNs = ???
			// This code is based on UTIF.bufferToURI	
			var ifds = UTIF.decode(arrayBuffer);
			//console.log(ifds);
			var vsns = ifds, ma = 0, page = vsns[0];
			if (ifds[0].subIFD) {
				vsns = vsns.concat(ifds[0].subIFD);
			}
			for (var i = 0; i < vsns.length; i++) {
				var img = vsns[i];
				if (img["t258"] == null || img["t258"].length < 3) continue;
				var ar = img["t256"] * img["t257"];
				if (ar > ma) { ma = ar; page = img; }
			}
			UTIF.decodeImage(arrayBuffer, page, ifds);
			var rgba = UTIF.toRGBA8(page);

			var image_data = new ImageData(new Uint8ClampedArray(rgba.buffer), page.width, page.height);

			file_format = "image/tiff";
			callback(null, {file_format, monochrome, palette, image_data, source_blob: blob});
		} else if (detected_type_id === "pdf") {
			file_format = "application/pdf";

			const pdfjs = window['pdfjs-dist/build/pdf'];
			
			pdfjs.GlobalWorkerOptions.workerSrc = 'lib/pdf.js/build/pdf.worker.js';

			const file_bytes = new Uint8Array(arrayBuffer);

			const loadingTask = pdfjs.getDocument({
				data: file_bytes,
				cMapUrl: "lib/pdf.js/web/cmaps/",
				cMapPacked: true,
			});

			loadingTask.promise.then((pdf)=>  {
				console.log('PDF loaded');

				// Fetch the first page
				// TODO: maybe concatenate all pages into one image?
				var pageNumber = 1;
				pdf.getPage(pageNumber).then((page)=>  {
					console.log('Page loaded');

					var scale = 1.5;
					var viewport = page.getViewport({ scale });

					// Prepare canvas using PDF page dimensions
					var canvas = make_canvas(viewport.width, viewport.height);

					// Render PDF page into canvas context
					var renderContext = {
						canvasContext: canvas.ctx,
						viewport,
					};
					var renderTask = page.render(renderContext);
					renderTask.promise.then(() => {
						console.log('Page rendered');
						const image_data = canvas.ctx.getImageData(0, 0, canvas.width, canvas.height);
						callback(null, {file_format, monochrome, palette, image_data, source_blob: blob});
					});
				});
			}, (reason) => {
				callback(new Error(`Failed to load PDF. ${reason}`));
			});
		} else {
			monochrome = false;
			file_format = {
				// bmp: "image/bmp",
				png: "image/png",
				webp: "image/webp",
				jpeg: "image/jpeg",
				gif: "image/gif",
				tiff_be: "image/tiff",
				tiff_le: "image/tiff", // can also be image/x-canon-cr2 etc.
				ico: "image/x-icon",
				cur: "image/x-win-bitmap",
				icns: "image/icns",
			}[detected_type_id] || blob.type;

			const blob_uri = URL.createObjectURL(blob);
			const img = new Image();
			// img.crossOrigin = "Anonymous";
			const handle_decode_fail = ()=> {
				URL.revokeObjectURL(blob_uri);
				blob.text().then((file_text)=> {
					const error = new Error("failed to decode blob as an image");
					error.code = file_text.match(/^\s*<!doctype\s+html/i) ? "html-not-image" : "decoding-failure";
					callback(error);
				}, (err)=> {
					const error = new Error("failed to decode blob as image or text");
					error.code = "decoding-failure";
					callback(error);
				});
			};
			img.onload = ()=> {
				URL.revokeObjectURL(blob_uri);
				if (!img.complete || typeof img.naturalWidth == "undefined" || img.naturalWidth === 0) {
					handle_decode_fail();
					return;
				}
				callback(null, {file_format, monochrome, palette, image: img, source_blob: blob});
			};
			img.onerror = handle_decode_fail;
			img.src = blob_uri;
		}
	}, (error)=> {