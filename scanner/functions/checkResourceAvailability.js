async function checkResourceAvailability(options, principalEmail, start, end) {
	if (options.length === 0) {
		return
	}

	const organizer = new AttendeeProperty(
		'ORGANIZER',
		addMailtoPrefix(principalEmail),
	)
	const attendees = []
	for (const option of options) {
		attendees.push(new AttendeeProperty('ATTENDEE', addMailtoPrefix(option.email)))
	}

	for await (const [attendeeProperty] of doFreeBusyRequest(start, end, organizer, attendees)) {
		const attendeeEmail = removeMailtoPrefix(attendeeProperty.email)
		for (const option of options) {
			if (removeMailtoPrefix(option.email) === attendeeEmail) {
				options.participationStatus = ''
				option.isAvailable = false
				break
			}
		}
	}
}