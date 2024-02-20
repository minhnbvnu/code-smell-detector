function getFollowees(user, callback) {
    var request = 'method=next&params={"hash_id":"' + user.hash + '","order_by":"created","offset":{0}}&_xsrf=' + xsrf;
    logger.debug("Start getting " + user.id + "'s " + user.increase + " follwees");
    getNextFollowees(cookie, user.increase, 0, request, new Array(), function (err, followees) {
        if (err) {
            callback(err);
            return;
        }
        logger.debug("Totally get " + followees.length + " follwees of " + user.id);
        callback(null, followees);
    });
}