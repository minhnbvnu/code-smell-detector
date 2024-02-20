function getsid(callback) {
    sid = 0, ysid = 0, wsid = 0;
    db.query("SELECT tid, endtime FROM snapshots where endtime>0 order by starttime desc limit 0,1", function (err, rows) {
        if (err || rows.length == 0) {
            callback(err || "No snapshots");
            return;
        }
        sid = rows[0].tid;
        stime = rows[0].endtime;
        db.query("SELECT tid, endtime FROM snapshots WHERE endtime>0 and to_days(starttime)<=(select to_days(endtime)-1 from snapshots where tid=" + sid + ") order by starttime desc limit 0,1", function (err, rows) {
            if (err || rows.length == 0) {
                logger.error("Cannot find snapshots of yesterday.");
                return;
            }
            ysid = rows[0].tid;
            ystime = rows[0].endtime;
            db.query("SELECT tid, endtime FROM snapshots WHERE endtime>0 and to_days(starttime)<=(select to_days(endtime)-7 from snapshots where tid=" + sid + ") order by starttime desc limit 0,1", function (err, rows) {
                if (err || rows.length == 0) {
                    logger.error("Cannot find snapshots of last week.");
                    return
                }
                wsid = rows[0].tid;
                wstime = rows[0].endtime;
                callback();
            });
        });
    });
}