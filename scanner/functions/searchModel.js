function searchModel(name) {
    var searchUrl = '/search?name=' + name;
    var whenModelIdFetched = getDataDeferred(searchUrl);

    whenModelIdFetched.done(function (modelId) {
        var offersUrl = '/shopOffers?id=' + modelId;
        var whenShopsDataFetched = getDataDeferred(offersUrl);
        
        whenShopsDataFetched.done(function (shops) {

            shops.forEach(function (shopName) {
                console.log(name + ' есть в магазине ' + shopName);
            });

        });
    });
}