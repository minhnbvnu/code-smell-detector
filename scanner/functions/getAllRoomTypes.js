function getAllRoomTypes() {
	return [
		{ value: 'meeting-room', label: t('calendar', 'Meeting room') },
		{ value: 'lecture-hall', label: t('calendar', 'Lecture hall') },
		{ value: 'seminar-room', label: t('calendar', 'Seminar room') },
		{ value: 'other', label: t('calendar', 'Other') },
	]
}