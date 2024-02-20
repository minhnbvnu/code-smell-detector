function getPosts(r, callback) {
    if (r.post == 0) callback(null);
    else {
        logger.debug("Getting user " + r.id + "'s posts.");
        //抓取用户专栏文章页
        var url = config.urlpre + "people/" + encodeURIComponent(r.id) + "/posts";
        tools.get(url, cookie, function (err, data) {
            if (err) {//失败则重读
                setTimeout(function () {
                    getPosts(r, callback);
                }, faildelay);
                return;
            }

            var $ = cheerio.load(data, {decodeEntities: false});
            var columns = $(".profile-column-posts>.column");
            var links = new Array();
            columns.each(function (i) {
                var columnid = $(this).find(".header .avatar-link").attr("href").replace(config.urlzhuanlanpre, "");//专栏名
                var count = 10;//默认专栏文章数
                var f = $(this).find(".footer a");
                if (f.length > 0) {//如果存在带数量的链接则取指定数量的文章
                    count = Number(f.html().replace("查看全部 ", "").replace(" 篇文章", ""));
                }

                //2014.12.8 专栏文章每次不能读取太多，会出错，改为每页读取10个，多读几次
                for (var i = 0; i < count; i += 10) {
                    links.push(config.urlzhuanlanpre + "api/columns/" + columnid + "/posts?limit=10&offset=" + i);
                }
            })
            //逐个获取专栏文章
            setTimeout(function () {
                getSingleColumn(r.id, links, 0, new Array(), function (postdata) {
                    callback(postdata);
                })
            }, httpdelay);
        })
    }
}