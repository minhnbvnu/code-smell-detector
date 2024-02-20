function makeAPIURL(urlObject, accessToken) {
    const apiUrlObject = parseUrl(config.API_URL);
    urlObject.protocol = apiUrlObject.protocol;
    urlObject.authority = apiUrlObject.authority;

    if (urlObject.protocol === 'http') {
        const i = urlObject.params.indexOf('secure');
        if (i >= 0) {
            urlObject.params.splice(i, 1);
        }
    }

    if (apiUrlObject.path !== '/') {
        urlObject.path = `${apiUrlObject.path}${urlObject.path}`;
    }

    if (!config.REQUIRE_ACCESS_TOKEN) { return formatUrl(urlObject); }

    accessToken = accessToken || config.ACCESS_TOKEN;
    if (!accessToken) { throw new Error('An API access token is required'); }
    if (accessToken[0] === 's') { throw new Error('Use a public access token (pk.*), not a secret access token (sk.*).'); }

    urlObject.params = urlObject.params.filter(d => d.indexOf('access_token') === -1);
    urlObject.params.push(`access_token=${accessToken}`);
    return formatUrl(urlObject);
}