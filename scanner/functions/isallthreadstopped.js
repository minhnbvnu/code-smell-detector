function isallthreadstopped() {
    if (lastsaveresulttime != 0 && new Date().getTime() - lastsaveresulttime > lastsaveresultspan) {
        logger.log("After " + (lastsaveresultspan / 60000) + " minutes of last save result job idle, force stop all threads.");
        return true;
    }

    var hasrunningthread = false;//是否还有线程在运行
    for (var i = 0; i < threadcount; i++) {
        if (threadstatus[i] == "stopped") {
            if (firstthreadstoptime == 0) {
                //如果出现了首个停止线程，则记录时间
                firstthreadstoptime = new Date().getTime();
                logger.log("First thread stopped.");
            }
        }
        else {
            hasrunningthread = true;
            break;
        }
    }

    //如果还有线程运行中，判断如果第一个停止线程之后已经过了5分钟，则视为所有线程已结束
    if (hasrunningthread) {
        if (firstthreadstoptime != 0 && new Date().getTime() - firstthreadstoptime > firstthreadstopspan) {
            logger.log("After " + (firstthreadstopspan / 60000) + " minutes of first thread stopped, force stop all threads.");
            return true;
        }
        else
            return false;
    }
    else {
        logger.log("All threads stopped.");
        return true;
    }
}