function getTopPosts(r, page, plist, callback, retry) {
    if (!retry) retry = 0;//重试次数
    //获取用户高票文章
    logger.debug("Getting user " + r.id + "'s top post page " + page + ".");
    tools.get(config.urlpre + "people/" + encodeURIComponent(r.id) + "/posts?order_by=vote_num&page=" + page, cookie, function (err, data) {
        if (err) {
            //如果失败则重试，超出重试次数则返回
            retry++;
            if (err == '429')//429错误只记录调试信息
                logger.debug("Get user " + r.id + "'s top post page " + page + " error:" + err);
            else
                logger.error("Get user " + r.id + "'s top post page " + page + " error:" + err);

            if (retry >= maxretry)
                callback("error reached max retry count : " + err, plist);
            else
                setTimeout(function () {
                    getTopPosts(r, page, plist, callback, retry);
                }, faildelay);
            return;
        }
        //解析文章列表
        var $ = cheerio.load(data, {decodeEntities: false});
        var postlist = $("#zh-profile-post-list .zm-item");
        var pageplist = new Array();//当前页文章
        var getpostfailed = false;//执行each的过程中是否出错，出错则整页重读
        postlist.each(function () {
            var p = Object();
            var pitem = $(this);//单个文章的html
            p.agree = Number(pitem.find(".zm-item-vote-info").attr("data-votecount"));
            if (!isNaN(p.agree)) {
                p.timestamp = Number(pitem.attr("data-time"));
                p.aid = pitem.find("meta[itemprop='post-url-token']").attr("content");//文章id，就是url后面的id
                p.date = tools.getDateTimeString(new Date(p.timestamp * 1000));//发布时间
                p.link = pitem.find(".post-link").attr("href");
                p.name = pitem.find(".post-link").text().replace(/\n/g, "");
                p.ispost = true;
                p.collapsed = false;//是否折叠
                p.noshare = false;//是否禁止转载

                //如果链接或标题为空，说明读取有错，需要重读本页
                if (!p.link || !p.name) {
                    getpostfailed = true;
                    return;
                }

                p.link = p.link.replace(config.urlzhuanlanpre, "/");//去掉专栏链接前缀

                //获取文章摘要
                var summarydiv = pitem.find(".summary");
                summarydiv.find("a.toggle-expand").remove();//移除展开文章的链接
                p.summary = summarydiv.text().trim().replace(/\n/g, "").substr(0, 1000)

                //计算文章字数和图片数
                var contentdiv = pitem.find("textarea");
                var content = contentdiv.text().trim().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                p.content = content;
                var findimg = content.match(/<img/g);//查找包含的img标签数
                p.imgcount = findimg ? findimg.length : 0;
                var text = content.replace(/<[^>]*>/g, '');//去掉所有html标签的文本内容
                p.len = text.length;
                pageplist.push(p);
            }
        })

        //如果前一步中出现任何错误则重读当前页，超出重试次数则返回
        if (getpostfailed) {
            retry++;
            logger.error("Get user " + r.id + "'s top post page " + page + " error on post title.");
            if (retry >= maxretry)
                callback("reached max retry count : post title", plist);
            else
                setTimeout(function () {
                    getTopPosts(r, page, plist, callback, retry);
                }, faildelay);
            return;
        }

        plist = plist.concat(pageplist);

        //如果本页最后一篇文章仍然高于指定票数，且未读完所有文章，则继续读取下一页
        if (postlist.length > 0 && plist.length > 0 && plist.length < r.post && plist[plist.length - 1].agree >= agreelimit) {
            setTimeout(function () {
                getTopPosts(r, page + 1, plist, callback);
            }, httpdelay);
            return;
        }

        //否则返回文章结果
        callback(null, plist);
    })
}