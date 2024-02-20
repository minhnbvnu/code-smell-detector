function getMood(moodComponent) {
	if (OS_IOS) {
		switch (moodComponent.index) {
			case 0:
				return 'happy';
			case 2:
				return 'mad';
			case 1:
			default:
				return 'neutral';
		}
	} else {
		return moodComponent.getSelectedRow(0).title;
	}
}