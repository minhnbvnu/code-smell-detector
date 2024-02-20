function getInitialView() {
	try {
		return loadState('calendar', 'initial_view')
	} catch (error) {
		return 'dayGridMonth'
	}
}