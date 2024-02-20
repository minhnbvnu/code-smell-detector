function getDataPromise(url) {
    var stubs = {
        '/search?name=iPhone': 123,
        '/shopOffers?id=123': ['AppleStore', 'DNS']
    };

    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(stubs[url]);
        }, 1000);
    });
}