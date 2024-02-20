function restful(baseUrl, httpBackend) {
    const rootScope = scope();
    rootScope.assign('config', 'entityIdentifier', 'id');
    if (!baseUrl && typeof(window) !== 'undefined' && window.location) {
        rootScope.set('url', `${window.location.protocol}//${window.location.host}`);
    } else {
        rootScope.set('url', baseUrl);
    }

    const rootEndpoint = member(endpoint(http(httpBackend))(rootScope));

    instances.push(rootEndpoint);

    return rootEndpoint;
}