async function updateConfig(config) {
	logger.debug('Updating appointment config', { config })
	const url = generateUrl('/apps/calendar/v1/appointment_configs/{id}', {
		id: config.id,
	})

	const response = await axios.put(url, config)
	return new AppointmentConfig(response.data.data)
}