function recordWPPostInfo(postid, answers, type, mediaurl, excerpt, callback) {
    var sqls = new Array();
    //保存发布数据与明细
    sqls.push("INSERT INTO wpposts (date, publishtime, type, postid, pic, excerpt)" +
        " VALUES ('" + tools.getDateString(stime) + "','" + tools.getDateTimeString() + "','" +
        type + "'," + postid + ",'" + mediaurl + "'," + db.escape(excerpt) + ")");

    for (var i in answers) {
        var a = answers[i];
        sqls.push("INSERT INTO wpdetail (pid, uid, answerlink)" +
            " VALUES ((select max(tid) from wpposts)," + a.tid + ",'" + a.link + "')");
    }
    db.mutliquery(sqls, function (err) {
        if (err) {
            callback(err);
            return;
        }
        callback();
    })
}