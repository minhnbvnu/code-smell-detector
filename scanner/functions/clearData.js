function clearData(callback) {
    //清理优化表
    var optimizesqls = ["OPTIMIZE TABLE snapshots", "OPTIMIZE TABLE usersnapshots", "OPTIMIZE TABLE usertopanswers"];
    db.mutliquery(optimizesqls, function (err) {
        //无论是否出错都直接清理数据
        threadstatus = null;
        firstthreadstoptime = 0;
        lastsaveresulttime = 0;
        users = null;
        failusers = null;
        results = null;
        _usercursor = 0;
        successUserCount = 0;
        failUserCount = 0;
        fixedUserCount = 0;
        idchangedUserCount = 0;
        namechangedUserCount = 0;
        avatarchangedUserCount = 0;
        fixed = false;
        starttime = null;
        endtime = null;
        sid = 0;
        if (err) callback(err);
        else callback(null);
    });
}