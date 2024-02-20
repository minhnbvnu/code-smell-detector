function getSingleColumn(userid, links, cursor, postdata, callback, retry) {
    if (retry == undefined) retry = 0;
    if (cursor >= links.length) {
        callback(postdata);//所有专栏读取完成
        return;
    }

    tools.get(links[cursor], "", function (err, data) {
        if (err) {
            logger.error("Get user column " + links[cursor] + " error: " + err);
            if (retry >= maxretry) {//如重试专栏超过次数，则读下一个
                logger.error("Reached max retry count, read next.");
                setTimeout(function () {
                    getSingleColumn(userid, links, cursor + 1, postdata, callback);
                }, httpdelay);
            }
            else {
                setTimeout(function () {
                    getSingleColumn(userid, links, cursor, postdata, callback, retry + 1);
                }, faildelay);
            }
            return;
        }

        var posts;
        try {
            posts = JSON.parse(data);
        }
        catch (ex) {
            logger.error("Parse json of user column " + links[cursor] + " error: " + ex);
            setTimeout(function () {
                getSingleColumn(userid, links, cursor, postdata, callback, retry + 1);
            }, faildelay);
            return;
        }

        for (var i in posts) {
            var post = posts[i];
            //只有本用户自己发布的专栏文章才计算
            if (post.author && post.author.slug && post.author.slug == userid) {
                var p = new Object();
                p.agree = post.likesCount;
                var pdate = new Date(post.publishedTime);
                p.date = tools.getDateTimeString(pdate);
                p.timestamp = pdate.getTime();
                p.link = post.url;
                p.name = post.title;
                p.aid = post.slug;
                p.summary = post.summary.trim().replace(/<[^>]*>/g, '').substr(0, 1000);
                p.content = post.content;
                p.ispost = true;
                p.collapsed = false;
                p.noshare = false;
                //计算文章字数和包含图片数
                var findimg = post.content.match(/<img/g);//查找包含的img标签数
                p.imgcount = findimg ? findimg.length : 0;
                var text = post.content.trim().replace(/<[^>]*>/g, '');//去掉所有html标签的文本内容
                p.len = text.length;
                postdata.push(p);
            }
        }
        data = null;
        post = null;

        setTimeout(function () {
            getSingleColumn(userid, links, cursor + 1, postdata, callback);
        }, httpdelay);
    })
}