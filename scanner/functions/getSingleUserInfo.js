function getSingleUserInfo(threadnum, callback, cursor, retry) {
    if (cursor == undefined) cursor = getcursor();//如果未指定光标位置，则取下一个用户
    if (retry == undefined) retry = 0;//如果未指定重试次数则置为0

    //如果已读完列表中所有用户，或者全部线程已停止（往往是强制停止）则返回
    if (cursor >= users.length || isallthreadstopped()) {
        callback();
        return;
    }

    var user = users[cursor];
    //读取关于用户页面
    logger.debug(user.tid + " start getting user " + user.id + "'s info, thread " + threadnum + ".");
    tools.get(config.urlpre + "people/" + encodeURIComponent(user.id) + "/about", cookie, function (err, data) {
        if (err) {
            if (err == "404")//是404错误则表示用户已改id，等修复后再进行
                getUserError(threadnum, user.tid + " get user " + user.id + " about page error:" + err, user, callback);
            else {//否则重试
                if (retry >= maxretry)//超出重试次数则记录错误用户并继续
                    getUserError(threadnum, user.tid + " get user " + user.id + " about page error:" + err, user, callback);
                else//否则重试当前用户
                    setTimeout(function () {
                        getSingleUserInfo(threadnum, callback, cursor, retry + 1)
                    }, faildelay);
            }
            return;
        }

        var r = new Object();
        r.uid = user.tid;
        r.id = user.id;
        var $ = cheerio.load(data, {decodeEntities: false});
        var header = $(".zm-profile-header");
        r.name = header.find(".title-section .name").text();
        r.signature = header.find(".title-section .bio").text();
        r.description = header.find(".description .content").text().trim().substr(0, 1500);

        //地理、职业、学校等信息
        var itemsdiv = header.find(".items");
        r.location = itemsdiv.find(".location").text();//位置
        r.business = itemsdiv.find(".business").text();//行业
        r.employment = itemsdiv.find(".employment").text();//公司
        r.position = itemsdiv.find(".position").text();//职位
        r.education = itemsdiv.find(".education").text();//学校
        r.educationextra = itemsdiv.find(".education-extra").text();//专业

        r.sex = 0;//性别
        if (header.find(".icon-profile-male").length == 1)
            r.sex = 1;
        else if (header.find(".icon-profile-female").length == 1)
            r.sex = 2;
        r.agree = Number(header.find(".zm-profile-header-user-agree strong").html());
        r.thanks = Number(header.find(".zm-profile-header-user-thanks strong").html());
        r.fav = Number($(".zm-profile-module-desc strong").eq(2).html());
        r.followee = Number($(".zm-profile-side-following strong").eq(0).html());
        r.follower = Number($(".zm-profile-side-following strong").eq(1).html());
        var nav = header.find(".profile-navbar").children();
        r.ask = Number(nav.eq(1).find(".num").html());
        r.answer = Number(nav.eq(2).find(".num").html());
        r.post = Number(nav.eq(3).find(".num").html());
        r.ratio = (r.agree / (r.answer + r.post)).toFixed(2);
        r.logs = Number(nav.eq(5).find(".num").html());

        //判断账号停用
        var accountstatus = $(".zh-profile-account-status");
        if (accountstatus.length == 1 && accountstatus.text().indexOf("知乎社区规范") >= 0) {
            logger.debug(user.tid + " User " + user.id + "'s account is stopped.");
            r.stopped = 1;
        }
        else
            r.stopped = 0;

        if (r.agree > 0 && r.follower == 0 && !fixed) {//如果发现用户有赞同但关注数为0，可能是网络错误导致的，需要再读一次（如果修复后还为0就不处理了）
            getUserError(threadnum, user.tid + " Cannot read user " + user.id + " 's follower.", user, callback);
            return;
        }

        if (r.sex && user.sex != r.sex) {//如果性别正常读取且发生变更则修改
            r.sexchanged = true;
        }

        if (user.oldid) {//此处仅用于修复用户后，用户id改变时记录旧id
            r.oldid = user.oldid;
        }

        if (r.name && r.name != user.name)//判断用户是否修改了名称
            r.oldname = user.name;

        r.avatar = header.find("img.avatar").attr("src");

        //2015.8.31 头像URL修改格式
        if (r.avatar && r.avatar.indexOf("//") == 0) r.avatar = "https://" + r.avatar.substr(2);

        if (r.avatar && tools.getUrlFileName(r.avatar) != tools.getUrlFileName(user.avatar)) //判断是否更换过头像（只比较文件名部分）
            r.oldavatar = user.avatar;
        //保存头像
        tools.getAvatar(r.avatar, function (err) {
            if (err) {//如果头像出错，不处理，不保存
                logger.error(user.tid + " Cannot get user " + user.id + "'s avatar: " + err);
                r.avatar = "";
            }

            //读取用户高票答案和专栏文章
            getTopAnswers(r, 1, new Array(), function (err, alist) {
                if (err) {//读取用户答案失败时加入失败列表重新处理
                    getUserError(threadnum, user.tid + " Cannot read user " + user.id + " 's top answer: " + err, user, callback);
                    return;
                }
                //结果排序
                alist.sort(function (a, b) {
                    return b.agree - a.agree;
                });

                //整理高票答案并计算数量
                var mostvote = 0, mostvote5 = 0, mostvote10 = 0;
                var count10000 = 0, count5000 = 0, count2000 = 0, count1000 = 0, count500 = 0, count200 = 0, count100 = 0;//大于等于指定票数的答案数量
                r.topanswers = new Array();
                if (alist.length > 0) {//防止无回答时出错
                    mostvote = alist[0].agree;
                    for (var j in alist) {
                        if (alist[j].agree >= 10000) count10000++;
                        if (alist[j].agree >= 5000) count5000++;
                        if (alist[j].agree >= 2000) count2000++;
                        if (alist[j].agree >= 1000) count1000++;
                        if (alist[j].agree >= 500) count500++;
                        if (alist[j].agree >= 200) count200++;
                        if (alist[j].agree >= 100) count100++;
                        if (j < 5) mostvote5 += alist[j].agree;
                        if (j < 10) mostvote10 += alist[j].agree;
                        if (j < 15 || alist[j].agree >= agreelimit) {//添加高票答案，如果较多则全部添加，至少也添加15个
                            r.topanswers.push(alist[j]);
                        }
                    }
                }
                r.mostvote = mostvote;
                r.mostvote5 = mostvote5;
                r.mostvote10 = mostvote10;
                r.count10000 = count10000;
                r.count5000 = count5000;
                r.count2000 = count2000;
                r.count1000 = count1000;
                r.count500 = count500;
                r.count200 = count200;
                r.count100 = count100;
                results.push(r);

                //如果是初次
                if (!fixed) {
                    logger.debug((cursor + 1) + " Get user " + user.id + " successfully, thread " + threadnum + ".");
                    successUserCount++;
                    if (successUserCount % 1000 == 0) logger.log("Get " + successUserCount + " users successfully.");
                }
                else {
                    logger.log((cursor + 1) + " Re-get user " + user.id + " successfully, thread " + threadnum + ".");
                    fixedUserCount++;
                }
                user = null;
                r = null;
                $ = null;

                //成功后读取下一用户
                setTimeout(function () {
                    getSingleUserInfo(threadnum, callback);
                }, httpdelay);
                return;
            })
        })
    })
}