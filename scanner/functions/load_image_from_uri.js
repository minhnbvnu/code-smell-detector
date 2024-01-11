async function load_image_from_uri(uri) {

	// Cases to consider:
	// - data URI
	// - blob URI
	//   - blob URI from another domain
	// - file URI
	// - http URI
	// - https URI
	// - unsupported protocol, e.g. "ftp://example.com/image.png"
	// - invalid URI
	//   - no protocol specified, e.g. "example.com/image.png"
	//     --> We can fix these up!
	//   - The user may be just trying to paste text, not an image.
	// - non-CORS-enabled URI
	//   --> Use a CORS proxy! :)
	//   - In electron, using a CORS proxy 1. is silly, 2. maybe isn't working.
	//     --> Either proxy requests to the main process,
	//         or configure headers in the main process to make requests work.
	//         Probably the latter. @TODO
	//         https://stackoverflow.com/questions/51254618/how-do-you-handle-cors-in-an-electron-app
	// - invalid image / unsupported image format
	// - image is no longer available on the live web
	//   --> try loading from WayBack Machine :)
	//   - often swathes of URLs are redirected to a new site, and do not give a 404.
	//     --> make sure the flow of fallbacks accounts for this, and doesn't just see it as an unsupported file format.
	// - localhost URI, e.g. "http://127.0.0.1/" or "http://localhost/"
	//   --> Don't try to proxy these, as it will just fail.
	//   - Some domain extensions are reserved, e.g. .localdomain (how official is this?)
	//   - There can also be arbitrary hostnames mapped to local servers, which we can't test for
	// - already a proxy URI, e.g. "https://cors.bridged.cc/https://example.com/image.png"
	// - file already downloaded
	//   --> maybe should cache downloads? maybe HTTP caching is good enough? maybe uncommon enough that it doesn't matter.
	// - Pasting (Edit > Paste or Ctrl+V) vs Opening (drag & drop, File > Open, Ctrl+O, or File > Load From URL)
	//   --> make wording generic or specific to the context

	const is_blob_uri = uri.match(/^blob:/i);
	const is_download = !uri.match(/^(blob|data|file):/i);
	const is_localhost = uri.match(/^(http|https):\/\/((127\.0\.0\.1|localhost)|.*(\.(local|localdomain|domain|lan|home|host|corp|invalid)))\b/i);

	if (is_blob_uri && uri.indexOf(`blob:${location.origin}`) === -1) {
		const error = new Error("can't load blob: URI from another domain");
		error.code = "cross-origin-blob-uri";
		throw error;
	}

	const uris_to_try = (is_download && !is_localhost) ? [
		uri,
		// work around CORS headers not sent by whatever server
		`https://cors.bridged.cc/${uri}`,
		`https://jspaint-cors-proxy.herokuapp.com/${uri}`,
		// if the image isn't available on the live web, see if it's archived
		`https://web.archive.org/${uri}`,
	] : [uri];
	const fails = [];

	for (let index_to_try = 0; index_to_try < uris_to_try.length; index_to_try += 1) {
		const uri_to_try = uris_to_try[index_to_try];
		try {
			if (is_download) {
				$status_text.text("Downloading picture...");
			}

			const show_progress = ({ loaded, total }) => {
				if (is_download) {
					$status_text.text(`Downloading picture... (${Math.round(loaded / total * 100)}%)`);
				}
			};

			if (is_download) {
				console.log(`Try loading image from URI (${index_to_try + 1}/${uris_to_try.length}): "${uri_to_try}"`);
			}

			const original_response = await fetch(uri_to_try);
			let response_to_read = original_response;
			if (!original_response.ok) {
				fails.push({ status: original_response.status, statusText: original_response.statusText, url: uri_to_try });
				continue;
			}
			if (!original_response.body) {
				if (is_download) {
					console.log("ReadableStream not yet supported in this browser. Progress won't be shown for image requests.");
				}
			} else {
				// to access headers, server must send CORS header "Access-Control-Expose-Headers: content-encoding, content-length x-file-size"
				// server must send custom x-file-size header if gzip or other content-encoding is used
				const contentEncoding = original_response.headers.get("content-encoding");
				const contentLength = original_response.headers.get(contentEncoding ? "x-file-size" : "content-length");
				if (contentLength === null) {
					if (is_download) {
						console.log("Response size header unavailable. Progress won't be shown for this image request.");
					}
				} else {
					const total = parseInt(contentLength, 10);
					let loaded = 0;
					response_to_read = new Response(
						new ReadableStream({
							start(controller) {
								const reader = original_response.body.getReader();

								read();
								function read() {
									reader.read().then(({ done, value }) => {
										if (done) {
											controller.close();
											return;
										}
										loaded += value.byteLength;
										show_progress({ loaded, total })
										controller.enqueue(value);
										read();
									}).catch(error => {
										console.error(error);
										controller.error(error)
									})
								}
							}
						})
					);
				}
			}

			const blob = await response_to_read.blob();
			if (is_download) {
				console.log("Download complete.");
				$status_text.text("Download complete.");
			}
			// @TODO: use headers to detect HTML, since a doctype is not guaranteed
			// @TODO: fall back to WayBack Machine still for decode errors,
			// since a website might start redirecting swathes of URLs regardless of what they originally pointed to,
			// at which point they would likely point to a web page instead of an image.
			// (But still show an error about it not being an image, if WayBack also fails.)
			const info = await new Promise((resolve, reject) => {
				read_image_file(blob, (error, info) => {
					if (error) {
						reject(error);
					} else {
						resolve(info);
					}
				});
			});
			return info;
		} catch (error) {
			fails.push({ url: uri_to_try, error });
		}
	}
	if (is_download) {
		$status_text.text("Failed to download picture.");
	}
	const error = new Error(`failed to fetch image from any of ${uris_to_try.length} URI(s):\n  ${fails.map((fail) =>
		(fail.statusText ? `${fail.status} ${fail.statusText} ` : "") + fail.url + (fail.error ? `\n    ${fail.error}` : "")
	).join("\n  ")}`);
	error.code = "access-failure";
	error.fails = fails;
	throw error;
}