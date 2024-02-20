function readUserInfos($, options, cards, callback) {
    var users = new Array();
    var answerlimit = options.answer ? options.answer : 0;
    var agreelimit = options.agree ? options.agree : 0;
    var followerlimit = options.follower ? options.follower : 0;
    var ratiolimit = options.ratio ? options.ratio : 0;
    cards.each(function (i) {
        var name = $(this).find('a.zg-link').html();
        var id = $(this).find('a.zg-link').attr("href").replace(config.urlpre + "people/", "").replace(config.urlpre + "org/", "");
        var detail = $(this).find('.details');
        var hash = $(this).find(".zg-btn").attr("data-id");
        if (id != undefined && name != undefined && hash != undefined) {
            try {
                var follower = Number(detail.eq(0).children().eq(0).html().split(' ')[0]);
                var ask = Number(detail.eq(0).children().eq(1).html().split(' ')[0]);
                var answer = Number(detail.eq(0).children().eq(2).html().split(' ')[0]);
                var agree = Number(detail.eq(0).children().eq(3).html().split(' ')[0]);
                var ratio = agree / answer;
                if (answer >= answerlimit && agree >= agreelimit && follower >= followerlimit && ratio >= ratiolimit) {
                    var r = new Object();
                    r.name = name;
                    r.id = id;
                    r.hash = hash;
                    r.follower = follower;
                    r.ask = ask;
                    r.agree = agree;
                    r.answer = answer;
                    r.ratio = ratio.toFixed(2);
                    users.push(r);
                }
            }
            catch (err) {
                //html解析出错只记日志，不处理
                logger.error("Cannot read user card of " + id + ":" + err);
            }
        }
    });
    callback(users);
}