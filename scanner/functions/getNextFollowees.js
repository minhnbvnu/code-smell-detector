function getNextFollowees(cookie, limit, offset, request, followees, callback) {
    //如果读取数量已经超过限制的个数，则返回结果，不继续读取
    if (offset >= limit) {
        callback(null, followees);
        return;
    }
    var requestbody = request.replace("{0}", offset);//消息体
    tools.post(config.urlpre + "node/ProfileFolloweesListV2", cookie, requestbody,
        function (err, data) {
            if (err) {
                logger.error("Get followee error on " + offset + ":" + err);
                setTimeout(function () {
                    getNextFollowees(cookie, limit, offset + 20, request, followees, callback);
                }, delay);//出错也继续
                return;
            }
            try {
                var l = JSON.parse(data).msg;
                if (l.length > 0) {
                    $ = cheerio.load(l.join(), {decodeEntities: false});
                    var cards = $(".zm-profile-card");
                    readUserInfos($, userfilteroptions, cards, function (newusers) {
                        followees = followees.concat(newusers);
                        //继续下一页
                        setTimeout(function () {
                            getNextFollowees(cookie, limit, offset + 20, request, followees, callback);
                        }, delay);
                    });
                }
                else
                    callback(null, followees);//如果读不到，说明已经读完，返回结果
            }
            catch (err) {//如果解析json出错则继续下一个
                logger.error("Parse followee json error on " + offset + ":" + err);
                setTimeout(function () {
                    getNextFollowees(cookie, limit, offset + 20, request, followees, callback);
                }, delay);
            }
        }
    )
}