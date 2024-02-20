function harpHandler(rootDir, req, res, next) {
    if (!req.query.callback) {
        next();
        return;
    }

    if (!/^[a-zA-Z0-9_]+$/.exec(req.query.callback)) {
        throw new Error("Invalid callback name");
    }

    // http://expressjs.com/4x/api.html#req.baseUrl
    // baseUrl is, for example
    // "/selenium/tests/hars/testLoad2.harp"
    const filename = req.baseUrl.replace(/\.harp$/, ".har");
    filename = path.join(rootDir, filename);

    fs.readFile(filename, function(err, data) {
        if (err) {
            console.error("HARP PROCESSING", err);
            next();
        }
        res.set("Content-Type", "application/javascript");
        res.send(req.query.callback + "(" + data + ");");
    });
}