function toggleNavigationEvent( event ) {
		event = event || w.event;

		// if this comes from a click or a snap use the active pages
		// calculation provided as an event property, otherwise use
		// the scroll calculation
		toggleNavigation( event.target || event.srcElement, event && event.overthrow && event.overthrow.active );
	}