function publishWPArchive(callback) {
    var archivetime = new Date(stime.getTime());
    archivetime.setDate(stime.getDate() - 180);

    //近7天~180天的热门答案
    var sql1 = "SELECT u.tid, u.id uid, u.name uname, u.hash, u.avatar, s.agree uagree, s.follower ufollower, a.title, a.link, a.date, a.agree, a.ispost, a.len, a.imgcount, a.summary" +
        " FROM usertopanswers a inner join users u on a.uid=u.tid " +
        " inner join usersnapshots s on s.uid=u.tid" +
        " where a.date<'" + tools.getDateString(wstime) + "' and a.date>='" + tools.getDateString(archivetime) + "' and ispost=0 and collapsed=0 and noshare=0" +
        " and a.link not in (select answerlink from wpdetail)" +
        " and len + imgcount > 0" +
        " and u.stopped <> 1" +
        " and s.sid=(select max(tid) from snapshots where endtime>0)" +
        " and u.hidden = 0" +
        " order by a.agree desc limit 0,400";//取400个赞同最高且未发表过的答案用于筛选

    //180天前的热门答案
    var sql2 = "SELECT u.tid, u.id uid, u.name uname, u.hash, u.avatar, s.agree uagree, s.follower ufollower, a.title, a.link, a.date, a.agree, a.ispost, a.len, a.imgcount, a.summary" +
        " FROM usertopanswers a inner join users u on a.uid=u.tid " +
        " inner join usersnapshots s on s.uid=u.tid" +
        " where a.date<'" + tools.getDateString(archivetime) + "' and ispost=0 and collapsed=0 and noshare=0" +
        " and a.link not in (select answerlink from wpdetail)" +
        " and len + imgcount > 0" +
        " and u.stopped <> 1" +
        " and s.sid=(select max(tid) from snapshots where endtime>0)" +
        " and u.hidden = 0" +
        " order by a.agree desc limit 0,4000";//取4000个赞同最高且未发表过的答案用于筛选

    var sqls = new Array();
    sqls.push(sql1);
    sqls.push(sql2);
    db.mutliquerywithresults(sqls, function (err, results) {
            if (err) {
                callback("get answers error: " + err);
                return;
            }
            var answers1 = results[0];//7~90天
            var answers2 = results[1];//90天前

            //随机排序
            answers1.sort(function () {
                return Math.random() - 0.5;
            });
            answers2.sort(function () {
                return Math.random() - 0.5;
            });

            var answers = new Array();//答案数组
            var avatars = new Array();//头像数组，取前32个用户

            for (var i in answers1) {
                var exist = false;//用户是否已存在
                for (var j in answers)
                    if (answers[j].uid == answers1[i].uid) {
                        exist = true;
                        break;
                    }
                answers.push(answers1[i]);
                if (!exist) avatars.push(answers1[i].avatar);//避免头像重复
                if (avatars.length >= 16) break;//只取16个用户
            }
            for (var i in answers2) {
                var exist = false;//用户是否已存在
                for (var j in answers)
                    if (answers[j].uid == answers2[i].uid) {
                        exist = true;
                        break;
                    }
                answers.push(answers2[i]);
                if (!exist) avatars.push(answers2[i].avatar);//避免头像重复
                if (avatars.length >= 32) break;//再取16个用户，一共32个
            }

            //按高票答案占总赞同的比例排序
            answers.sort(function (a, b) {
                return (b.agree / b.uagree) - (a.agree / a.uagree);
            });

            //把答案按标题分组
            var questions = new Array();
            for (var i in answers) {
                var findquestion = null;
                for (var j in questions)
                    if (answers[i].title == questions[j].title) {
                        findquestion = questions[j];
                        break;
                    }

                if (findquestion) {//问题已添加则直接添加答案
                    findquestion.answers.push(answers[i]);
                }
                else {//否则添加问题对象
                    var q = new Object();
                    q.title = answers[i].title;
                    q.ispost = answers[i].ispost;
                    q.answers = new Array();
                    q.answers.push(answers[i]);
                    if (!answers[i].ispost) {//取答案链接的前半段作为问题链接
                        var linkarray = answers[i].link.split("/");
                        q.link = "/" + linkarray[1] + "/" + linkarray[2];
                    }
                    else
                        q.link = answers[i].link;
                    questions.push(q);
                }
            }

            var publishdata = new Object();
            //发布时间：数据生成日中午11点
            var publishtime = new Date(stime);
            publishtime.setHours(17);
            publishtime.setMinutes(0);
            publishtime.setSeconds(0);
            publishdata.publishtime = publishtime;
            //生成要发布的内容
            publishdata.title = tools.getCNDateString(publishtime) + " 历史精华";
            publishdata.link = "archive-" + tools.getDateString(publishtime);
            publishdata.category = "历史精华";
            var content = "<ul>";
            var excerpt = "摘录了";
            for (var i in questions) {
                var q = questions[i];
                var qlink;
                if (!q.ispost) {
                    qlink = config.urlpre.replace(/\/$/, '');
                    if (q.answers.length != 1) qlink += q.link;//如果多于一个答案，就使用问题链接，否则使用唯一答案链接
                    else qlink += q.answers[0].link;
                }
                else qlink = config.urlzhuanlanpre.replace(/\/$/, '') + q.link;

                content += '<li><h3><a href="' + qlink + '" target="_blank" style="font-weight: bold;">' + q.title + '</a></h3>';

                for (var j in q.answers) {
                    var a = q.answers[j];
                    var alink;
                    if (!a.ispost) alink = config.urlpre.replace(/\/$/, '') + a.link;
                    else alink = config.urlzhuanlanpre.replace(/\/$/, '') + a.link;

                    if (a.avatar.indexOf("https://") == 0)  a.avatar = a.avatar.replace("https://", config.WPurlavatarpre);
                    else a.avatar = a.avatar.replace("http://", config.WPurlavatarpre);

                    content += '<a href="' + config.urlpre + 'people/' + a.uid + '/" target="_blank">' +
                        '<img class="alignleft avatar" src="' + a.avatar + '" alt="" /></a>' +
                        '<span class="summary"><a href="' + config.urlpre + 'people/' + a.uid + '/" target="_blank">' +
                        a.uname + '</a>: ' + '<span class="agreetext">(' + a.agree +
                        '<img class="agreelogo" src="/zhihufile/agree.png" />)</span>' +
                        ((a.len == 0 && a.imgcount > 0) ? '[图片]' : a.summary) +
                        '<span class="readmore"><a href="' + alink + '" target="_blank">[阅读全文]</a></span></span></li>' +
                        '<div class="cleardiv"></div>\r\n';
                }
                content += '</li>\r\n\r\n\r\n';
                if (excerpt.length < 200) excerpt += "『" + q.title + "』、";//记录摘要
            }
            content += "</ul>";
            excerpt = excerpt.replace(/、$/, '') + "等问题下的" + answers.length + "个答案";
            publishdata.content = content;
            publishdata.excerpt = excerpt;

            //拼接头像
            tools.spliceAvatars(avatars, 8, 4, true, false, false, function (err, buffer) {
                if (err) {
                    callback("splice avatar error: " + err);
                    return;
                }
                //上传拼接好的头像
                tools.WPnewMedia("archive-" + tools.getDateString(stime) + ".jpg", buffer, function (err, mediaid, mediaurl) {
                    if (err) {
                        callback("upload media error: " + err);
                        return;
                    }
                    publishdata.mediaid = mediaid;
                    //发布新日志
                    tools.WPnewPost(publishdata, function (err, postid) {
                        if (err) {
                            callback("new post error: " + err);
                            return;
                        }
                        recordWPPostInfo(postid, answers, "archive", mediaurl, publishdata.excerpt, function (err) {
                            if (err) callback("record post info error: " + err);
                            else callback();
                        })
                    })
                })
            })
        }
    )
}