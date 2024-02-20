function checkProjStr(item) {
        var ext = (0, match_1.default)(item, 'extension');
        if (!ext) {
            return;
        }
        return (0, match_1.default)(ext, 'proj4');
    }