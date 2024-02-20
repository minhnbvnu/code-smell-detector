function fixUseridByHash(userlist, cursor, callback) {
    if (cursor >= userlist.length) callback();
    else {
        var user = userlist[cursor];
        logger.debug(user.tid + " start read user page by hash: " + user.hash);
        tools.get(config.urlpre + "people/" + user.hash, cookie, function (err, data) {
            if (err)
                logger.error(user.tid + " read user page by hash error:" + err);
            else {
                var $ = cheerio.load(data, {decodeEntities: false});
                var homepagehref = $(".zm-profile-header .profile-navbar a.home").attr("href");//通过链接读取用户id
                if (!homepagehref) {
                    logger.error(user.tid + " cannot get user id by hash: " + err);//可能会失败，失败则忽略
                }
                else {
                    var id = homepagehref.replace("/people/", "").replace("/org/", "");
                    if (user.id != id) {//修改id
                        user.oldid = user.id;
                        user.id = id;
                    }
                }
            }
            //无论是否失败都读取下一个
            setTimeout(function () {
                fixUseridByHash(userlist, cursor + 1, callback);
            }, httpdelay);
        })
    }
}