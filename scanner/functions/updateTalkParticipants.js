async function updateTalkParticipants(eventComponent) {
	const apiVersion = loadState('calendar', 'talk_api_version')
	const url = eventComponent.getConferenceList()[0]?.uri ?? eventComponent.location
	if (!url || !url.startsWith(window.location.protocol + '//' + window.location.host)) {
		logger.debug('Event\'s conference/location is from another host', url)
		return
	}
	const token = url.match(/\/call\/([a-z0-9]*)$/)[1]
	if (!token) {
		logger.debug('URL ' + url + ' contains no call token')
		return
	}
	try {
		const { data: { ocs: { data: room } } } = await HTTPClient.get(generateOcsUrl('apps/spreed/api/' + apiVersion + '/', 2) + 'room/' + token)
		const participantsResponse = await HTTPClient.get(generateOcsUrl('apps/spreed/api/' + apiVersion + '/', 2) + 'room/' + token + '/participants')
		// Ignore if the actor isn't owner of the conversation
		if (!participantsResponse.data.ocs.data.some(participant => participant.actorId === getCurrentUser().uid && participant.participantType <= 2)) {
			logger.debug('Current user is not a moderator or owner', { currentUser: getCurrentUser().uid, conversation: participantsResponse.data.ocs.data })
			return
		}
		console.info('room', room)

		for (const attendee of eventComponent.getAttendeeIterator()) {
			logger.debug('Processing attendee', { attendee })
			if (['GROUP', 'RESOURCE', 'ROOM'].includes(attendee.userType)) {
				continue
			}

			const participantId = removeMailtoPrefix(attendee.email)
			try {
				// Map attendee email to Nextcloud user uid
				const searchResult = await HTTPClient.get(generateOcsUrl('core/autocomplete/', 2) + 'get?search=' + encodeURIComponent(participantId) + '&itemType=&itemId=%20&shareTypes[]=0&limit=2')
				// Only map if there is exactly one result
				if (searchResult.data.ocs.data.length === 1 && searchResult.data.ocs.data[0].id !== getCurrentUser().uid) {
					await HTTPClient.post(generateOcsUrl('apps/spreed/api/' + apiVersion + '/', 2) + 'room/' + token + '/participants', {
						newParticipant: searchResult.data.ocs.data[0].id,
						source: 'users',
					})
				} else if (searchResult.data.ocs.data[0]?.id === getCurrentUser().uid) {
					logger.debug('Skipping organizer ' + searchResult.data.ocs.data[0].id)
				} else if (room.type === 3) {
					await HTTPClient.post(generateOcsUrl('apps/spreed/api/' + apiVersion + '/', 2) + 'room/' + token + '/participants', {
						newParticipant: participantId,
						source: 'emails',
					})
				} else {
					logger.debug('Attendee ' + participantId + ' ignored as Talk participant')
				}
			} catch (error) {
				logger.info('Could not add attendee ' + participantId + ' as Talk participant', { error })
			}
		}
	} catch (error) {
		logger.warn('Could not update Talk room attendees', { error })
	}
}