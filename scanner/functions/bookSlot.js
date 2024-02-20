async function bookSlot(config, slot, displayName, email, description, timeZone) {
	const url = generateUrl('/apps/calendar/appointment/{id}/book', {
		id: config.id,
	})

	const response = await axios.post(url, {
		start: slot.start,
		end: slot.end,
		displayName,
		email,
		description,
		timeZone,
	})

	return response.data.data
}