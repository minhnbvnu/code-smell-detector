async function * doFreeBusyRequest(start, end, organizer, attendees) {
	const freeBusyComponent = createFreeBusyRequest(start, end, organizer, attendees)
	const freeBusyICS = freeBusyComponent.toICS()

	const outbox = await findSchedulingOutbox()
	const freeBusyData = await outbox.freeBusyRequest(freeBusyICS)

	for (const [, data] of Object.entries(freeBusyData)) {
		if (!data.success) {
			continue
		}

		const parserManager = getParserManager()
		const parser = parserManager.getParserForFileType('text/calendar')
		parser.parse(data.calendarData)

		// TODO: fix me upstream, parser only exports VEVENT, VJOURNAL and VTODO at the moment
		const calendarComponent = parser._calendarComponent
		const freeBusyComponent = calendarComponent.getFirstComponent('VFREEBUSY')
		if (!freeBusyComponent) {
			continue
		}

		for (const attendeeProperty of freeBusyComponent.getPropertyIterator('ATTENDEE')) {
			for (const freeBusyProperty of freeBusyComponent.getPropertyIterator('FREEBUSY')) {
				if (freeBusyProperty.type === 'FREE') {
					// We care about anything BUT free slots
					continue
				}

				yield [attendeeProperty, freeBusyProperty]
			}
		}
	}
}