function startgetnewuser(callback) {
    if (ng) {
        logger.log("Get new user task skipped.");
        callback();
    }
    else {
        var getnewuser = require("./getnewuser");
        getnewuser.start(cookie, xsrf, callback);
    }
}