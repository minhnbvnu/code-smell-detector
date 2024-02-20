function saveResults(callback) {
    if (results.length != 0) {//有新读取的结果时，取第一条数据，写入数据库
        var r = results.shift();
        lastsaveresulttime = new Date().getTime();
        var sqls = new Array();
        //用户快照
        var snapshotsql = "INSERT INTO `usersnapshots`(`sid`, `uid`, `ask`, `answer`, `post`, `agree`, `thanks`, `follower`, `followee`, `fav`, `logs`, " +
            "`mostvote`, `mostvote5`, `mostvote10`, `count10000`, `count5000`, `count2000`, `count1000`, `count500`, `count200`, `count100`) " +
            "VALUES ('" + sid + "','" + r.uid + "','" + r.ask + "','" + r.answer + "','" + r.post + "','" + r.agree + "','" + r.thanks + "','" +
            r.follower + "','" + r.followee + "','" + r.fav + "','" + r.logs + "','" + r.mostvote + "','" + r.mostvote5 + "','" + r.mostvote10 + "'," +
            "'" + r.count10000 + "','" + r.count5000 + "','" + r.count2000 + "','" + r.count1000 + "','" + r.count500 + "','" + r.count200 + "','" + r.count100 + "')";
        //用户高票答案
        for (var j in r.topanswers) {
            var a = r.topanswers[j];
            sqls.push("REPLACE INTO `usertopanswers`(`uid`, `sid`, `title`, `agree`, `date`, `answerid`, `link`, `ispost`, `collapsed`, `noshare`, `len`, `imgcount`, `summary`, `content`) " +
                "VALUES ('" + r.uid + "','" + sid + "'," + db.escape(a.name) + ",'" + a.agree + "','" + a.date + "','" + a.aid + "','" + a.link + "'," + a.ispost + ", " + a.collapsed + ", " + a.noshare + ", " + a.len + ", " + a.imgcount + ", " + db.escape(a.summary) + ", " + db.escape(a.content) + ")");
        }
        //用户是否改过性别
        if (r.sexchanged) {
            sqls.push("update users set sex=" + r.sex + " where tid=" + r.uid);
        }
        //用户是否改过ID
        if (r.oldid) {
            idchangedUserCount++;
            logger.log(r.uid + " user " + r.oldid + "'s id changed -> " + r.id);
            sqls.push("update users set id=" + db.escape(r.id) + " where tid=" + r.uid);
        }
        //用户是否改过名称
        if (r.oldname != undefined) {
            namechangedUserCount++;
            logger.log(r.uid + " user " + r.id + "'s name changed from " + r.oldname + " -> " + r.name);
            sqls.push("update users set name=" + db.escape(r.name) + " where tid=" + r.uid);
        }
        //用户是否改过头像
        if (r.avatar != r.oldavatar && r.oldavatar != undefined) {
            avatarchangedUserCount++;
            logger.debug(r.uid + " user " + r.id + " uploaded new avatar.");
            sqls.push("update users set avatar='" + r.avatar + "' where tid=" + r.uid);
        }

        //为节约判断资源，用户签名/描述/是否屏蔽等字段一律更新
        sqls.push("update users set signature=" + db.escape(r.signature) + ", description= " + db.escape(r.description) + ", stopped=" + r.stopped +
            " where tid=" + r.uid);

        //单独一句更新用户附加信息
        sqls.push("update users set location=" + db.escape(r.location) + ", business= " + db.escape(r.business) + ", employment= " + db.escape(r.employment) +
            ", position= " + db.escape(r.position) + ", education= " + db.escape(r.education) + ", educationextra= " + db.escape(r.educationextra) +
            " where tid=" + r.uid);

        //为了避免快照插入后未插入答案即中断，快照本体要放到最后面插入
        sqls.push(snapshotsql);

        db.mutliquery(sqls, function (err, cursor) {
            sqls = null;
            if (err) {
                logger.error("Save results to db error: " + err);
                logger.error("The error sql: " + sqls[cursor]);
            }
            else {
                var logstr = "User " + r.id + " inserted to db.";
                if (results.length > 0) logstr += " " + results.length + " user's data in queue.";
                logger.debug(logstr);

                r = null;
            }
            //成功或失败均继续
            setTimeout(function () {
                saveResults(callback);
            }, dbdelay);
        })
    }
    else {//当结果列表为空时
        if (!isallthreadstopped()) {//如果当前还有读取线程在运行，或者正在修复错误用户，则继续执行
            setTimeout(function () {
                saveResults(callback);
            }, dbdelay);
        }
        else if (failusers.length > 0 && !fixed) {//如果第一轮读完后存在失败用户，则修复并重读它们（第二次还存在则不处理）
            logger.log("Start fixing " + failusers.length + " error users.");
            //通过hash修复用户id
            fixUseridByHash(failusers, 0, function () {
                logger.log("Start reloading " + failusers.length + " users info.");
                users = failusers;
                failusers = new Array();
                _usercursor = 0;
                fixed = true;

                //错误用户较少，使用双线程进行重读即可
                threadcount = 2;
                initthreads();
                startthread(0, getSingleUserInfo);
                startthread(1, getSingleUserInfo);

                setTimeout(function () {
                    saveResults(callback);
                }, dbdelay);
            })
        }
        else {//如果所有读取和修复工作完成，则结束循环、记录时间和数量
            logger.log("success read " + successUserCount + " users first time, " + failUserCount + " failed, " + fixedUserCount + " of them fixed.");
            logger.log(idchangedUserCount + " users changed id, " + namechangedUserCount + " users changed name, " + avatarchangedUserCount + " users uploaded new avatar.");
            endtime = tools.getDateTimeString();
            var snapsql = "UPDATE snapshots SET endtime='" + endtime + "', successcount=(select count(*) from usersnapshots where sid='" + sid + "')," +
                " failcount='" + (failUserCount - fixedUserCount) + "', idchangedcount='" + idchangedUserCount + "'," +
                " namechangedcount='" + namechangedUserCount + "', avatarchangedcount='" + avatarchangedUserCount + "'" +
                " WHERE tid='" + sid + "'";
            db.query(snapsql, function (err) {
                if (err) logger.error(err);
                callback();//回调结果
            });
        }
    }
}