function getUserError(threadnum, errmsg, user, callback) {
    logger.error(errmsg);
    if (failusers == null) return;//如果线程被强制结束，failusers可能会被置成null

    if (!fixed) {//只有初次出错才记录错误用户
        failUserCount++;
        failusers.push(user);
    }
    //出错也执行下一步
    setTimeout(function () {
        getSingleUserInfo(threadnum, callback);
    }, faildelay);
}