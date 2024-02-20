function addThemes() {
    return (config.get().client_themes || ['relaxed']).reduce(function (prom, theme) {
        return prom.then(function (themes) {
            return new Promise(function readThemeInfo(resolve, reject) {
                fs.readFile(global.config.public_http + '/assets/themes/' + theme.toLowerCase() + '/theme.json', function (err, theme_json) {
                    var theme;
                    if (err) {
                        return reject(err);
                    }

                    try {
                        theme = JSON.parse(theme_json);
                    } catch (e) {
                        return reject(e);
                    }

                    themes.push(theme);
                    resolve(themes);
                });
            });
        });
    }, Promise.resolve([]));
}