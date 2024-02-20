function checkpass(user, pass, cbsuccess, cberror) {
    var github = new Github({
        username: user,
        password: pass,
        auth: "basic"
    });
    var u = github.getUser();
    u.show(user, function(err, ret){
        $("#loading").hide()
        if (!cberror(err)) {
            global.github = github;
            global.user = user;
            repo = github.getRepo(user, user+".github.io");
            cbsuccess();
        }
    });
}