function onPaste($event, range, onInsert) {
		// Because we do not want the smartContentChange method to process this
		// event if the metaKey property had been set.
		$event.metaKey = null;
		$event.stopPropagation();

		// Because yeiling here allows for a small execution window to ensure
		// that the pasted content has been inserted into the paste div before
		// we attempt to retrieve it.
		window.setTimeout(function () {
			paste($CLIPBOARD, range, onInsert);
			Aloha.activeEditable.smartContentChange($event);
		}, 10);
	}