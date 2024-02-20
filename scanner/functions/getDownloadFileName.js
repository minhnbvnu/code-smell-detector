function getDownloadFileName(task, result, extension) {
		return [
			'pa11y',
			'--',
			task.url
				.replace(/^https?:\/\//i, '')
				.replace(/\/$/, '')
				.replace(/[^a-z0-9.\-_]+/gi, '-'),
			'--',
			task.standard.toLowerCase(),
			'--',
			moment(result.date).format('YYYY-MM-DD'),
			'.',
			extension
		].join('');
	}