function updateEmailAlarms(eventComponent) {
	for (const alarmComponent of eventComponent.getAlarmIterator()) {
		if (alarmComponent.action !== 'EMAIL') {
			continue
		}

		alarmComponent.deleteAllProperties('SUMMARY')
		const summaryProperty = eventComponent.getFirstProperty('SUMMARY')
		if (summaryProperty) {
			alarmComponent.addProperty(summaryProperty.clone())
		} else {
			const defaultSummary = t('calendar', 'Untitled event')
			alarmComponent.addProperty(new Property('SUMMARY', defaultSummary))
		}

		if (!alarmComponent.hasProperty('DESCRIPTION')) {
			const defaultDescription = t('calendar', 'This is an event reminder.')
			alarmComponent.addProperty(new Property('DESCRIPTION', defaultDescription))
		}

		alarmComponent.deleteAllProperties('ATTENDEE')
		for (const attendee of eventComponent.getAttendeeIterator()) {
			if (['RESOURCE', 'ROOM'].includes(attendee.userType)) {
				continue
			}

			// Only copy the email address (value) of the attendee
			alarmComponent.addProperty(new AttendeeProperty('ATTENDEE', attendee.value))
		}
	}
}