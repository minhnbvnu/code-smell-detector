function render_history_as_gif() {
	const $win = $DialogWindow();
	$win.title("Rendering GIF");

	const $output = $win.$main;
	const $progress = $(E("progress")).appendTo($output).addClass("inset-deep");
	const $progress_percent = $(E("span")).appendTo($output).css({
		width: "2.3em",
		display: "inline-block",
		textAlign: "center",
	});
	$win.$main.css({ padding: 5 });

	const $cancel = $win.$Button('Cancel', () => {
		$win.close();
	}).focus();

	$win.center();

	try {
		const width = main_canvas.width;
		const height = main_canvas.height;
		const gif = new GIF({
			//workers: Math.min(5, Math.floor(undos.length/50)+1),
			workerScript: "lib/gif.js/gif.worker.js",
			width,
			height,
		});

		$win.on('close', () => {
			gif.abort();
		});

		gif.on("progress", p => {
			$progress.val(p);
			$progress_percent.text(`${~~(p * 100)}%`);
		});

		gif.on("finished", blob => {
			$win.title("Rendered GIF");
			const blob_url = URL.createObjectURL(blob);
			$output.empty().append(
				$(E("div")).addClass("inset-deep").append(
					$(E("img")).attr({
						src: blob_url,
						width,
						height,
					}).css({
						display: "block", // prevent margin below due to inline display (vertical-align can also be used)
					}),
				).css({
					overflow: "auto",
					maxHeight: "70vh",
					maxWidth: "70vw",
				})
			);
			$win.on("close", () => {
				// revoking on image load(+error) breaks right click > "Save image as" and "Open image in new tab"
				URL.revokeObjectURL(blob_url);
			});
			$win.$Button("Upload to Imgur", () => {
				$win.close();
				sanity_check_blob(blob, () => {
					show_imgur_uploader(blob);
				});
			}).focus();
			$win.$Button(localize("Save"), () => {
				$win.close();
				sanity_check_blob(blob, () => {
					const suggested_file_name = `${file_name.replace(/\.(bmp|dib|a?png|gif|jpe?g|jpe|jfif|tiff?|webp|raw)$/i, "")} history.gif`;
					systemHooks.showSaveFileDialog({
						dialogTitle: localize("Save As"), // localize("Save Animation As"),
						getBlob: () => blob,
						defaultFileName: suggested_file_name,
						defaultPath: typeof system_file_handle === "string" ? `${system_file_handle.replace(/[/\\][^/\\]*/, "")}/${suggested_file_name}` : null,
						defaultFileFormatID: "image/gif",
						formats: [{
							formatID: "image/gif",
							mimeType: "image/gif",
							name: localize("Animated GIF (*.gif)").replace(/\s+\([^(]+$/, ""),
							nameWithExtensions: localize("Animated GIF (*.gif)"),
							extensions: ["gif"],
						}],
					});
				});
			});
			$cancel.appendTo($win.$buttons);
			$win.center();
		});

		const gif_canvas = make_canvas(width, height);
		const frame_history_nodes = [...undos, current_history_node];
		for (const frame_history_node of frame_history_nodes) {
			gif_canvas.ctx.clearRect(0, 0, gif_canvas.width, gif_canvas.height);
			gif_canvas.ctx.putImageData(frame_history_node.image_data, 0, 0);
			if (frame_history_node.selection_image_data) {
				const selection_canvas = make_canvas(frame_history_node.selection_image_data);
				gif_canvas.ctx.drawImage(selection_canvas, frame_history_node.selection_x, frame_history_node.selection_y);
			}
			gif.addFrame(gif_canvas, { delay: 200, copy: true });
		}
		gif.render();

	} catch (err) {
		$win.close();
		show_error_message("Failed to render GIF.", err);
	}
}