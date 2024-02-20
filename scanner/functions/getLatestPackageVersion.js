async function getLatestPackageVersion (packageName, defaultVersion) {
	return new Promise((resolve) => {
		try {
			https.get(`https://registry.npmjs.org/-/package/${packageName}/dist-tags`, res => {
				if (res.statusCode === 200) {
					let body = '';
					res.on('data', data => body += data);
					res.on('end', () => {
						return resolve(JSON.parse(body).latest);
					});
				} else {
					return resolve(defaultVersion);
				}
			});
		} catch (error) {
			return resolve(defaultVersion);
		}
	});
}