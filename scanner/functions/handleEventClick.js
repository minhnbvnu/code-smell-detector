function handleEventClick(event, store, router, route, window) {
	let desiredRoute = store.state.settings.skipPopover
		? 'EditSidebarView'
		: 'EditPopoverView'

	// Don't show the popover if the window size is too small (less then its max width of 450 px + a bit)
	// The mobile breakpoint of the reworked modals is 1024 px / 2 so simply use that.
	if (window.innerWidth <= 1024 / 2 && desiredRoute === 'EditPopoverView') {
		desiredRoute = 'EditSidebarView'
	}

	const name = getPrefixedRoute(route.name, desiredRoute)
	const params = Object.assign({}, route.params, {
		object: event.extendedProps.objectId,
		recurrenceId: String(event.extendedProps.recurrenceId),
	})

	// Don't push new route when day didn't change
	if ((getPrefixedRoute(route.name, 'EditPopoverView') === route.name || getPrefixedRoute(route.name, 'EditSidebarView') === route.name)
		&& params.object === route.params.object
		&& params.recurrenceId === route.params.recurrenceId) {
		return
	}

	router.push({ name, params })
}