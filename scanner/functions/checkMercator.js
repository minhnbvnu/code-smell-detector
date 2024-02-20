function checkMercator(item) {
        var auth = (0, match_1.default)(item, 'authority');
        if (!auth) {
            return;
        }
        var code = (0, match_1.default)(auth, 'epsg');
        return code && codes.indexOf(code) > -1;
    }