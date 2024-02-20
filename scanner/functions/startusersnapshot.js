function startusersnapshot(callback) {
    if (ns) {
        logger.log("User snapshot task skipped.");
        callback();
    }
    else {
        var usersnapshot = require("./usersnapshot");
        usersnapshot.start(cookie, xsrf, callback);
    }
}