function prepareFileTree() {
		if(!config.filetree.enabled) {
			return;
		}

		$filetree.show();

        // Provides support for adjustible columns.
        $splitter.splitter({
            sizeLeft: config.filetree.width,
            minLeft: config.filetree.minWidth,
            minRight: 200
        });
	}