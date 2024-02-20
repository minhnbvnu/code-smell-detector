function initthreads() {
    threadstatus = new Array();
    for (var i = 0; i < threadcount; i++) {
        threadstatus.push("ready");
    }
    firstthreadstoptime = 0;
    lastsaveresulttime = 0;
}