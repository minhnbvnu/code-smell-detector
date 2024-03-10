function saveViewFile(callback) {
    //排名种类
    var resulttypes = ["ask", "answer", "post", "agree", "ratio", "agreei", "agreeiratio", "agreeiw", "agreeiratiow",
        "follower", "followee", "followeri", "followiratio", "followeriw", "followiratiow", "thanks", "tratio",
        "fav", "fratio", "logs", "mostvote", "mostvotepercent", "mostvote5", "mostvote5percent", "mostvote10", "mostvote10percent",
        "count10000", "count5000", "count2000", "count1000", "count500", "count200", "count100"];
    var sqls = new Array();
    //只有在各种比率的排序时才会过滤掉赞同、回答过低用户
    var filtersql = " and s.answer>=" + filteroptions.answer + " and s.agree>=" + filteroptions.agree + " and s.follower>=" + filteroptions.follower;

    for (var i in resulttypes) {
        var sql = "SELECT u.tid uid, u.id, u.name, s.ask, s.answer, s.post, s.agree, ROUND( s.agree / ( s.answer + s.post ), 2 ) ratio, s.follower, s.followee, " +
            "s.agree-ys.agree agreei,  CONCAT( ROUND( (s.agree-ys.agree) / ys.agree * 100, 2 ), '%') agreeiratio, " +
            "s.agree-ws.agree agreeiw,  CONCAT( ROUND( (s.agree-ws.agree) / ws.agree * 100, 2 ), '%') agreeiratiow, " +
            "s.follower-ys.follower followeri, CONCAT( ROUND( (s.follower-ys.follower) / ys.follower * 100, 2 ), '%') followiratio, " +
            "s.follower-ws.follower followeriw, CONCAT( ROUND( (s.follower-ws.follower) / ws.follower * 100, 2 ), '%') followiratiow, " +
            "s.thanks, ROUND( s.thanks / s.agree , 4 ) tratio, s.fav, ROUND( s.fav / s.agree , 4 ) fratio, s.logs, u.stopped, " +
            "s.mostvote, CONCAT( ROUND( s.mostvote / s.agree * 100, 2 ) ,  '%' ) mostvotepercent, " +
            "s.mostvote5, CONCAT( ROUND( s.mostvote5 / s.agree *100, 2 ) ,  '%' ) mostvote5percent, " +
            "s.mostvote10, CONCAT( ROUND( s.mostvote10 / s.agree *100, 2 ) ,  '%' ) mostvote10percent, " +
            "s.count10000, s.count5000, s.count2000, s.count1000, s.count500, s.count200, s.count100 " +
            "FROM users u INNER JOIN usersnapshots s ON s.uid = u.tid INNER JOIN usersnapshots ys ON ys.uid = u.tid INNER JOIN usersnapshots ws ON ws.uid = u.tid " +
            "WHERE s.sid='" + sid + "' and ys.sid='" + ysid + "' and ws.sid='" + wsid + "' and u.hidden = 0";
        if (resulttypes[i] == "mostvotepercent")
            sql += filtersql + " and s.answer + s.post >= 1 and s.mostvote > 0 and s.agree > 0 ORDER BY s.agree / s.mostvote";//三个高票占比列要从低到高排列
        else if (resulttypes[i] == "mostvote5percent")
            sql += filtersql + " and s.answer + s.post >= 5 and s.mostvote5 > 0 and s.agree > 0 ORDER BY s.agree / s.mostvote5";
        else if (resulttypes[i] == "mostvote10percent")
            sql += filtersql + " and s.answer + s.post >= 10 and s.mostvote10 > 0 and s.agree > 0 ORDER BY s.agree / s.mostvote10";
        else if (resulttypes[i] == "agreei")
            sql += filtersql + " and u.cheat = 0 ORDER BY agreei";//四个增长列要反作弊
        else if (resulttypes[i] == "agreeiw")
            sql += filtersql + " and u.cheat = 0 ORDER BY agreeiw";
        else if (resulttypes[i] == "agreeiratio")
            sql += filtersql + " and u.cheat = 0 ORDER BY (s.agree-ys.agree) / ys.agree";
        else if (resulttypes[i] == "agreeiratiow")
            sql += filtersql + " and u.cheat = 0 ORDER BY (s.agree-ws.agree) / ws.agree"
        else if (resulttypes[i] == "followeri")
            sql += filtersql + " and ys.follower > 0 ORDER BY followeri";
        else if (resulttypes[i] == "followeriw")
            sql += filtersql + " and ws.follower > 0 ORDER BY followeriw";
        else if (resulttypes[i] == "followiratio")
            sql += filtersql + " ORDER BY (s.follower-ys.follower) / ys.follower";
        else if (resulttypes[i] == "followiratiow")
            sql += filtersql + " ORDER BY (s.follower-ws.follower) / ws.follower";
        else if (resulttypes[i] == "ratio" || resulttypes[i] == "tratio" || resulttypes[i] == "fratio")
            sql += filtersql + " ORDER BY " + resulttypes[i];
        else if (resulttypes[i] == "count10000" || resulttypes[i] == "count5000" || resulttypes[i] == "count2000" || resulttypes[i] == "count1000"
            || resulttypes[i] == "count500" || resulttypes[i] == "count200" || resulttypes[i] == "count100")
            sql += filtersql + " ORDER BY " + resulttypes[i] + " DESC, agree";//防止数字重复，后面再按赞同数排个序
        else
            sql += " ORDER BY " + resulttypes[i];//其他列
        sql += " DESC LIMIT 0,500";
        sqls.push(sql);
    }
    db.mutliquerywithresults(sqls, function (err, results) {
        if (err) {
            callback(err);
            return;
        }
        try {
            for (var i in results) {
                //为去世id加@标记
                if (deathuserids.length > 0) {
                    for (var j in results[i]) {
                        if (deathuserids.indexOf(results[i][j].uid) != -1) results[i][j].name = "@" + results[i][j].name;
                    }
                }

                var jsonobj = new Object();
                jsonobj.total = results[i].length;
                jsonobj.rows = results[i];
                fs.writeFileSync(path + "topuser_" + resulttypes[i] + ".json", JSON.stringify(jsonobj), "utf-8");
                jsonobj = null;
            }
            callback();
        }
        catch (err) {
            logger.error(err);
            callback(err);
        }
    })
}