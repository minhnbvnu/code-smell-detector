function createWebserviceClient(config) {
	let webserviceUrl = config.webservice;
	if (typeof webserviceUrl === 'object') {
		webserviceUrl = `http://${webserviceUrl.host}:${webserviceUrl.port}/`;
	}
	return createClient(webserviceUrl);
}