function trygetcookie(retry, callback) {
    tools.get(config.urlpre, cookieuser.cookie, function (err, data) {
        if (err) {
            if (retry >= maxretry)
                callback("Get homepage error.<br/>" + err);
            else
                trygetcookie(retry + 1, callback);
            return;
        }

        var $ = cheerio.load(data, {decodeEntities: false});
        var findname = $(".zu-top-nav-userinfo .name").html();//寻找已登录用户名，如果找不到说明cookie失效，登录失败
        if (findname != cookieuser.name) {
            if (retry >= maxretry)
                callback("Invalid cookie.");
            else
                trygetcookie(retry + 1, callback);
            return;
        }

        var xsrf = $("input[name='_xsrf']").val();
        if (!xsrf) {
            if (retry >= maxretry)
                callback("Cannot read xsrf.");
            else
                trygetcookie(retry + 1, callback);
            return
        }

        var fullcookie = cookieuser.cookie + '_xsrf=' + xsrf;//带sessionid的cookie
        callback(null, fullcookie, xsrf);
    })
}