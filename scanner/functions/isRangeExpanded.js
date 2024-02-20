function isRangeExpanded() {
		if (!Aloha.getSelection().getRangeCount()) {
			return false;
		}
		return !Aloha.getSelection().getRangeAt(0).collapsed;
	}