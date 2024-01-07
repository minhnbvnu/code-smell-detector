constructor(session_id) {
			this.id = session_id;
			const lsid = `image#${session_id}`;
			log(`Local storage ID: ${lsid}`);
			// save image to storage
			this.save_image_to_storage_immediately = () => {
				const save_paused = handle_data_loss();
				if (save_paused) {
					return;
				}
				log(`Saving image to storage: ${lsid}`);
				storage.set(lsid, main_canvas.toDataURL("image/png"), err => {
					if (err) {
						if (err.quotaExceeded) {
							storage_quota_exceeded();
						}
						else {
							// e.g. localStorage is disabled
							// (or there's some other error?)
							// @TODO: show warning with "Don't tell me again" type option
						}
					}
				});
			};
			this.save_image_to_storage_soon = debounce(this.save_image_to_storage_immediately, 100);
			storage.get(lsid, (err, uri) => {
				if (err) {
					if (localStorageAvailable) {
						show_error_message("Failed to retrieve image from local storage.", err);
					}
					else {
						// @TODO: DRY with storage manager message
						showMessageBox({
							message: "Please enable local storage in your browser's settings for local backup. It may be called Cookies, Storage, or Site Data.",
						});
					}
				}
				else if (uri) {
					load_image_from_uri(uri).then((info) => {
						open_from_image_info(info, null, null, true, true);
					}, (error) => {
						show_error_message("Failed to open image from local storage.", error);
					});
				}
				else {
					// no uri so lets save the blank canvas
					this.save_image_to_storage_soon();
				}
			});
			$G.on("session-update.session-hook", this.save_image_to_storage_soon);
		}