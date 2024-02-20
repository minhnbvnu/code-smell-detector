function handleDrop(e) {
			e.stopPropagation();
			e.preventDefault();

			var dt = e.dataTransfer;
			var files = dt.files;

			Tracker.handleUpload(files);
		}