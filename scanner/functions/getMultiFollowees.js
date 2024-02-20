function getMultiFollowees(searchusers, cursor, callback) {
    if (cursor >= searchusers.length) {
        userhashs = null;
        callback();
        return;
    }
    getFollowees(searchusers[cursor], function (err, followees) {
        if (err) {
            logger.error(err);
            getMultiFollowees(searchusers, cursor + 1, callback);//出错也继续读下一个用户
            return;
        }
        //逐个检查本次读取的用户是否已存在，不存在则添加，存在则覆盖id和name，以后来者为准
        for (var i in followees) {
            var index = userhashs.indexOf(followees[i].hash);
            if (index == -1) {
                userhashs.push(followees[i].hash);
                users.push(followees[i]);
            }
            else {
                users[index].id = followees[i].id;
                users[index].name = followees[i].name;
            }
        }
        followees = null;
        setTimeout(function () {
            getMultiFollowees(searchusers, cursor + 1, callback);
        }, delay);
    });
}