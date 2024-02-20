function saveMapConfig(content, cb) {
    new Promise(function (resolve, reject) {
        var anyproxyHome = utils.getAnyProxyHome(),
            mapCfgPath = path.join(anyproxyHome, configFile);

        if (typeof content == "object") {
            content = JSON.stringify(content);
        }
        resolve({
            path: mapCfgPath,
            content: content
        });
    })
        .then(function (config) {
            return new Promise(function (resolve, reject) {
                fs.writeFile(config.path, config.content, function (e) {
                    if (e) {
                        reject(e);
                    } else {
                        resolve();
                    }
                });
            });
        })
        .catch(function (e) {
            cb && cb(e);
        })
        .done(function () {
            cb && cb();
        });
}