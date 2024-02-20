function snapshotinit(callback) {
    //读取最新一条快照id和完成情况
    db.query("SELECT tid sid, case when endtime>0 then 1 else 0 end finished FROM snapshots order by starttime desc limit 0,1", function (err, rows) {
        if (err) {
            callback(err);
            return;
        }
        if (rows.length == 0 || rows[0].finished == 1) {//无旧快照或者当前快照已完成，插入一条新快照
            var lastttid = 0;
            if (rows.length > 0) lastttid = rows[0].sid;
            db.query("INSERT INTO snapshots (starttime, lasttid) VALUES ('" + starttime + "'," + lastttid + ")", function (err) {
                if (err) {
                    callback(err);
                    return;
                }
                db.query("SELECT MAX(tid) sid FROM snapshots", function (err, rows) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    sid = rows[0].sid;
                    logger.log("New snapshot " + sid + ".");
                    db.query("select tid, id, name, sex, hash, ifnull(avatar,'') avatar from users", function (err, rows) {
                        if (err || rows.length == 0) {
                            callback(err || "No user.");
                            return;
                        }
                        users = rows;
                        users.sort(function () {//随机排序，防止大V过度集中导致瓶颈
                            return Math.random() - 0.5
                        });
                        callback();
                    });
                });
            });
        }
        else {//未完成，继续使用当前快照，并读取本次未包含的用户列表
            sid = rows[0].sid;
            logger.log("Resume snapshot " + sid + ".");
            db.query("select tid, id, name, sex, hash, ifnull(avatar,'') avatar from users where tid not in (select uid from usersnapshots where sid=" + sid + ")", function (err, rows) {
                if (err || rows.length == 0) {
                    callback(err || "No user to resume.");
                    return;
                }
                users = rows;
                users.sort(function () {//随机排序，防止大V过度集中导致瓶颈
                    return Math.random() - 0.5
                });
                callback();
            });
        }
    })
}