function getPreferredEditorRoute() {
	let skipPopover
	try {
		skipPopover = loadState('calendar', 'skip_popover')
	} catch (error) {
		skipPopover = false
	}

	// Don't show the popover if the window size is too small (less then its max width of 450 px + a bit)
	// The mobile breakpoint of the reworked modals is 1024 px / 2 so simply use that.
	if (window.innerWidth <= 1024 / 2) {
		skipPopover = true
	}

	return skipPopover
		? 'sidebar'
		: 'popover'
}