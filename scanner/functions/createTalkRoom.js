async function createTalkRoom(eventTitle = null, eventDescription = null, attendees = []) {
	const apiVersion = loadState('calendar', 'talk_api_version')
	try {
		const response = await HTTPClient.post(generateOcsUrl('apps/spreed/api/' + apiVersion + '/', 2) + 'room', {
			roomType: 3,
			roomName: eventTitle || t('calendar', 'Chat room for event'),
		})

		const conversation = response.data.ocs.data
		const token = conversation.token
		if (eventDescription) {
			await HTTPClient.put(generateOcsUrl('apps/spreed/api/' + apiVersion + '/', 2) + 'room/' + token + '/description', {
				description: eventDescription,
			})
		}

		return generateURLForToken(token)
	} catch (error) {
		console.debug(error)
		throw error
	}
}