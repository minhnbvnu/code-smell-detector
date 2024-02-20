function startsaveviewfile(err, callback) {
    if (err) {
        logger.error("Save file task cancelled.");//如果快照错误则本次不生成统计结果文件
        callback();
    }
    else if (nf) {
        logger.log("Save file task skipped.");
        callback();
    }
    else {
        var saveviewfile = require("./saveviewfile");
        saveviewfile.start(callback);
    }
}