function getTopAnswers(r, page, alist, callback, retry) {
    if (!retry) retry = 0;//重试次数
    //获取用户高票答案
    logger.debug("Getting user " + r.id + "'s top answer page " + page + ".");
    tools.get(config.urlpre + "people/" + encodeURIComponent(r.id) + "/answers?order_by=vote_num&page=" + page, cookie, function (err, data) {
        if (err) {
            //如果失败则重试，超出重试次数则返回
            retry++;
            if (err == '429')//429错误只记录调试信息
                logger.debug("Get user " + r.id + "'s top answer page " + page + " error:" + err);
            else
                logger.error("Get user " + r.id + "'s top answer page " + page + " error:" + err);

            if (retry >= maxretry)
                callback("error reached max retry count : " + err, alist);
            else
                setTimeout(function () {
                    getTopAnswers(r, page, alist, callback, retry);
                }, faildelay);
            return;
        }
        //解析答案列表
        var $ = cheerio.load(data, {decodeEntities: false});
        var answerlist = $("#zh-profile-answer-list .zm-item");
        var pagealist = new Array();//当前页答案
        var getanswerfailed = false;//执行each的过程中是否出错，出错则整页重读
        answerlist.each(function () {
            var a = Object();
            var aitem = $(this);//单个答案的html
            a.agree = Number(aitem.find(".zm-item-vote-info").attr("data-votecount"));
            if (!isNaN(a.agree)) {
                a.timestamp = Number(aitem.find(".zm-item-answer").attr("data-created"));
                a.aid = aitem.find(".zm-item-answer").attr("data-aid");//用于获取赞同列表的回答id
                a.date = tools.getDateTimeString(new Date(a.timestamp * 1000));//发布时间
                a.link = aitem.find(".question_link").attr("href");
                a.name = aitem.find(".question_link").text().replace(/\n/g, "");
                a.ispost = false;
                a.collapsed = (aitem.find(".zm-item-answer").attr("data-collapsed") == "1");//是否折叠
                a.noshare = (aitem.find(".copyright").text().indexOf("禁止转载") >= 0);//是否禁止转载

                //如果链接或标题为空，说明读取有错，需要重读本页
                if (!a.link || !a.name) {
                    getanswerfailed = true;
                    return;
                }

                //获取答案摘要
                var summarydiv = aitem.find(".summary");
                summarydiv.find("a.toggle-expand").remove();//移除展开答案的链接
                a.summary = summarydiv.text().trim().replace(/\n/g, "").substr(0, 1000);
                ;

                //计算答案字数和图片数
                var contentdiv = aitem.find("textarea");
                contentdiv.find(".answer-date-link-wrap").remove();//移除日期链接
                var content = contentdiv.text().trim().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                a.content = content;
                var findimg = content.match(/<img/g);//查找包含的img标签数
                a.imgcount = findimg ? findimg.length : 0;
                var text = content.replace(/<[^>]*>/g, '');//去掉所有html标签的文本内容
                a.len = text.length;
                pagealist.push(a);
            }
        })

        //如果前一步中出现任何错误则重读当前页，超出重试次数则返回
        if (getanswerfailed) {
            retry++;
            logger.error("Get user " + r.id + "'s top answer page " + page + " error on answer title.");
            if (retry >= maxretry)
                callback("reached max retry count : answer title", alist);
            else
                setTimeout(function () {
                    getTopAnswers(r, page, alist, callback, retry);
                }, faildelay);
            return;
        }

        alist = alist.concat(pagealist);

        //如果本页最后一个答案仍然高于指定票数，且未读完所有答案，则继续读取下一页
        if (answerlist.length > 0 && alist.length > 0 && alist.length < r.answer && alist[alist.length - 1].agree >= agreelimit) {
            setTimeout(function () {
                getTopAnswers(r, page + 1, alist, callback);
            }, httpdelay);
            return;
        }

        //答案读取完成，读取文章并将两者合并返回
        if (r.post > 0) {
            setTimeout(function () {
                getTopPosts(r, 1, new Array(), function (err, plist) {
                    if (err)
                        logger.error("Get user " + r.id + "'s post error: " + err);

                    if (plist && plist.length > 0)
                        alist = alist.concat(plist);

                    callback(null, alist);
                })
            }, httpdelay);
        }
        else//如果没有文章则直接返回
        {
            callback(null, alist);
        }
    })
}