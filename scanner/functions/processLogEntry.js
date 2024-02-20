function processLogEntry(ANALYTICS, data) {
	ANALYTICS.writeDataPoint({
		indexes: [data.ClientRequestHost || ''], // Supply one index
		blobs: [
			// Supply a maximum of 20 blobs (max total data size 5120 bytes)
			data.RayID || '',
			data.ClientIP || '',
			data.ClientRequestMethod || '',
			data.ClientRequestURI || '',
		],
		doubles: [
			// Supply a maximum of 20 doubles
			data.EdgeStartTimestamp || 0,
			data.EdgeEndTimestamp || 0,
			data.EdgeResponseStatus || 0,
			data.EdgeResponseBytes || 0,
		],
	});
}