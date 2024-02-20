function getDataDeferred(url) {
    var deferred = $.Deferred();
    var stubs = {
        '/search?name=iPhone': 123,
        '/shopOffers?id=123': ['AppleStore', 'DNS']
    };

    setTimeout(function () {
        deferred.resolve(stubs[url]);
    }, 1000);

    return deferred;
}