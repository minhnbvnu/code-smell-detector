function organizerDisplayName(organizer) {
	if (!organizer) {
		return ''
	}

	if (organizer.commonName) {
		return organizer.commonName
	}

	return removeMailtoPrefix(organizer.uri)
}