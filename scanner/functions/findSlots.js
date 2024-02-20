async function findSlots(config, start, timeZone) {
	const url = generateUrl('/apps/calendar/appointment/{id}/slots?startTime={start}&timeZone={timeZone}', {
		id: config.id,
		start,
		timeZone,
	})

	const response = await axios.get(url)

	return response.data.data
}