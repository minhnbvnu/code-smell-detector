function eventSourceFunction(calendarObjects, calendar, start, end, timezone) {
	const fcEvents = []
	for (const calendarObject of calendarObjects) {
		let allObjectsInTimeRange
		try {
			allObjectsInTimeRange = getAllObjectsInTimeRange(calendarObject, start, end)
		} catch (error) {
			logger.error(error.message)
			continue
		}

		for (const object of allObjectsInTimeRange) {
			const classNames = []

			if (object.status === 'CANCELLED') {
				classNames.push('fc-event-nc-cancelled')
			} else if (object.status === 'TENTATIVE') {
				classNames.push('fc-event-nc-tentative')
			}

			if (object.hasComponent('VALARM')) {
				classNames.push('fc-event-nc-alarms')
			}

			// For now, we only display
			if (object.name === 'VTODO' && object.endDate === null) {
				continue
			}

			let jsStart, jsEnd
			if (object.name === 'VEVENT') {
				jsStart = object.startDate.getInTimezone(timezone).jsDate
				jsEnd = object.endDate.getInTimezone(timezone).jsDate
			} else if (object.name === 'VTODO') {
				// For tasks, we only want to display when it is due,
				// not for how long it has been in progress already
				jsStart = object.endDate.getInTimezone(timezone).jsDate
				jsEnd = object.endDate.getInTimezone(timezone).jsDate
			} else {
				// We do not want to display anything that's neither
				// an event nor a task
				continue
			}

			// Technically, an event's end is not allowed to be equal to it's start,
			// because the event's end is exclusive. Most calendar applications
			// (including all big ones) allow creating such events anyway (we do too).
			// If the event's start is equal to it's end, fullcalendar is giving
			// the event a default length of one hour. We are preventing that by
			// adding one second to the end in that case.
			if (jsStart.getTime() === jsEnd.getTime()) {
				jsEnd.setSeconds(jsEnd.getSeconds() + 1)
			}

			if (object.name === 'VTODO') {
				classNames.push('fc-event-nc-task')
				if (object.percent === 100 || object.status === 'COMPLETED') {
					classNames.push('fc-event-nc-task-completed')
				}
			}

			let title
			if (object.name === 'VEVENT') {
				if (object.title) {
					title = object.title.replace(/\n/g, ' ')
				} else {
					title = t('calendar', 'Untitled event')
				}
			} else {
				if (object.title) {
					title = object.title.replace(/\n/g, ' ')
				} else {
					title = t('calendar', 'Untitled task')
				}

				if (object.percent !== null) {
					title += ` (${object.percent}%)`
				}
			}

			const fcEvent = {
				id: [calendarObject.id, object.id].join('###'),
				title,
				allDay: object.isAllDay(),
				start: jsStart,
				end: jsEnd,
				// start: formatLocal(jsStart, object.isAllDay()),
				// end: formatLocal(jsEnd, object.isAllDay()),
				classNames,
				extendedProps: {
					objectId: calendarObject.id,
					recurrenceId: object.getReferenceRecurrenceId()
						? object.getReferenceRecurrenceId().unixTime
						: null,
					canModifyAllDay: object.canModifyAllDay(),
					calendarOrder: calendar.order,
					calendarName: calendar.displayName,
					calendarId: calendar.id,
					darkText: isLight(hexToRGB(calendar.color)),
					objectType: object.name,
					percent: object.percent || null,
					davUrl: calendarObject.dav.url,
					location: object.location,
					description: object.description,
				},
			}

			if (object.color) {
				const customColor = getHexForColorName(object.color)
				if (customColor) {
					fcEvent.backgroundColor = customColor
					fcEvent.borderColor = customColor
					fcEvent.textColor = generateTextColorForHex(customColor)
				}
			}

			fcEvents.push(fcEvent)
		}
	}

	return fcEvents
}