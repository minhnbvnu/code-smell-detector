function getDataObservable(url) {
    var stubs = {
        '/search?name=iPhone': 123,
        '/shopOffers?id=123': ['AppleStore', 'DNS']
    };

    return Rx.Observable.create(function (observer) {
        setTimeout(function () {
            observer.next(stubs[url]);
        }, 1000);
    });
}