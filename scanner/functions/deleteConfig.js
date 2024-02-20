async function deleteConfig(id) {
	logger.debug('Deleting appointment config', { id })
	const url = generateUrl('/apps/calendar/v1/appointment_configs/{id}', {
		id,
	})

	await axios.delete(url)
}