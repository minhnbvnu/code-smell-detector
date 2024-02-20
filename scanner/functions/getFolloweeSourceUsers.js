function getFolloweeSourceUsers(callback) {
    //找到最新的、已完成的快照id
    db.query("SELECT tid FROM snapshots where endtime>0 order by starttime desc limit 0,2", function (err, rows) {
        if (err || rows.length < 2) {
            logger.error(err || "At least 2 snapshots for this task.");
            callback(null);
            return;
        }
        var sid = rows[0].tid;//最近一次快照id
        var sid2 = rows[1].tid;///第二近的快照id
        //查找关注数增加最多的用户
        db.query("SELECT u.id, u.hash, us1.followee f1, us2.followee f2, us1.followee-us2.followee fi FROM users u" +
            " inner join usersnapshots us1 on u.tid=us1.uid inner join usersnapshots us2 on u.tid=us2.uid" +
            " where us1.sid=" + sid + " and us2.sid=" + sid2 +
            " order by us1.followee-us2.followee desc limit 0," + newfolloweeusercount,
            function (err, rows) {
                if (err || rows.length == 0) {
                    logger.error(err || "Cannot find top increasing followee users");
                    callback(null);
                    return;
                }
                var searchusers = new Array();
                for (var i in rows) {
                    var u = new Object();
                    u.id = rows[i].id;
                    u.hash = rows[i].hash;
                    u.increase = rows[i].fi;//用本次增长数进行限制
                    searchusers.push(u);
                }
                callback(searchusers);
            });
    });
}