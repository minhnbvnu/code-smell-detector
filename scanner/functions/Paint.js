function Paint(file_path) {
	var $win = make_iframe_window({
		src: "programs/jspaint/index.html",
		icons: iconsAtTwoSizes("paint"),
		// NOTE: in Windows 98, "untitled" is lowercase, but TODO: we should just make it consistent
		title: "untitled - Paint",
		outerWidth: 275,
		outerHeight: 400,
		minOuterWidth: 275,
		minOuterHeight: 400,
	});

	var contentWindow = $win.$iframe[0].contentWindow;

	var waitUntil = function (test, interval, callback) {
		if (test()) {
			callback();
		} else {
			setTimeout(waitUntil, interval, test, interval, callback);
		}
	};

	const systemHooks = {
		readBlobFromHandle: (file_path) => {
			return new Promise((resolve, reject) => {
				withFilesystem(() => {
					var fs = BrowserFS.BFSRequire("fs");
					fs.readFile(file_path, (err, buffer) => {
						if (err) {
							return reject(err);
						}
						const byte_array = new Uint8Array(buffer);
						const blob = new Blob([byte_array]);
						const file_name = file_path.replace(/.*\//g, "");
						const file = new File([blob], file_name);
						resolve(file);
					});
				});
			});
		},
		writeBlobToHandle: async (file_path, blob) => {
			const arrayBuffer = await blob.arrayBuffer();
			return new Promise((resolve, reject) => {
				withFilesystem(()=> {
					const fs = BrowserFS.BFSRequire("fs");
					const { Buffer } = BrowserFS.BFSRequire("buffer");
					const buffer = Buffer.from(arrayBuffer);
					fs.writeFile(file_path, buffer, (err)=> {
						if (err) {
							return reject(err);
						}
						resolve();
					});
				});
			});
		},
		setWallpaperCentered: (canvas) => {
			canvas.toBlob((blob) => {
				setDesktopWallpaper(blob, "no-repeat", true);
			});
		},
		setWallpaperTiled: (canvas) => {
			canvas.toBlob((blob) => {
				setDesktopWallpaper(blob, "repeat", true);
			});
		},
	};

	// it seems like I should be able to use onload here, but when it works (overrides the function),
	// it for some reason *breaks the scrollbar styling* in jspaint
	// I don't know what's going on there

	// contentWindow.addEventListener("load", function(){
	// $(contentWindow).on("load", function(){
	// $win.$iframe.load(function(){
	// $win.$iframe[0].addEventListener("load", function(){
	waitUntil(()=> contentWindow.systemHooks, 500, ()=> {
		Object.assign(contentWindow.systemHooks, systemHooks);

		let $help_window;
		contentWindow.show_help = () => {
			if ($help_window) {
				$help_window.focus();
				return;
			}
			$help_window = show_help({
				title: "Paint Help",
				contentsFile: "programs/jspaint/help/mspaint.hhc",
				root: "programs/jspaint/help",
			}).$help_window;
			$help_window.on("close", () => {
				$help_window = null;
			});
		};

		if (file_path) {
			// window.initial_system_file_handle = ...; is too late to set this here
			// contentWindow.open_from_file_handle(...); doesn't exist
			systemHooks.readBlobFromHandle(file_path).then(file => {
				if (file) {
					contentWindow.open_from_file(file, file_path);
				}
			}, (error) => {
				// this handler may not always called for errors, sometimes error message is shown via readBlobFromHandle
				contentWindow.show_error_message(`Failed to open file ${file_path}`, error);
			});
		}

		var old_update_title = contentWindow.update_title;
		contentWindow.update_title = () => {
			old_update_title();
			$win.title(contentWindow.document.title);
		};
	});

	return new Task($win);
}