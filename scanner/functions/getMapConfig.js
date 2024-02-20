function getMapConfig(cb) {
    var read = Promise.denodeify(fs.readFile);

    new Promise(function (resolve, reject) {
        var anyproxyHome = utils.getAnyProxyHome(),
            mapCfgPath = path.join(anyproxyHome, configFile);

        resolve(mapCfgPath);
    })
        .then(read)
        .then(function (content) {
            return JSON.parse(content);
        })
        .catch(function (e) {
            cb && cb(e);
        })
        .done(function (obj) {
            cb && cb(null, obj);
        });
}