function defaultOAuthCallback(hash) {
	var params, queryString, regex, m;

	queryString = hash.indexOf('#') === 0 ? hash.substring(1) : hash;
	params = {};
	regex = /([^&=]+)=([^&]*)/g;

	m = regex.exec(queryString);
	do {
		params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
		m = regex.exec(queryString);
	} while (m);

	/*jshint camelcase:false */
	pubsub.publish(params.state, params.token_type + ' ' + params.access_token);
}