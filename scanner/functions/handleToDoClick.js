function handleToDoClick(event, store, route, window) {

	if (isPublicOrEmbeddedRoute(route.name)) {
		return
	}

	const davUrlParts = event.extendedProps.davUrl.split('/')
	const taskId = davUrlParts.pop()
	const calendarId = davUrlParts.pop()

	emit('calendar:handle-todo-click', { calendarId, taskId })

	if (!store.state.settings.tasksEnabled) {
		showInfo(t('calendar', 'Please ask your administrator to enable the Tasks App.'))
		return
	}
	const url = `apps/tasks/#/calendars/${calendarId}/tasks/${taskId}`
	window.location = window.location.protocol + '//' + window.location.host + generateUrl(url)
}