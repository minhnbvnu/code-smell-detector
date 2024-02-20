function readFromFileMap(sm, read) {
        var r = exports.mapFileCommentRegex.exec(sm);
        // for some odd reason //# .. captures in 1 and /* .. */ in 2
        var filename = r[1] || r[2];
        try {
            var sm = read(filename);
            if (sm != null && typeof sm.catch === 'function') {
                return sm.catch(throwError);
            }
            else {
                return sm;
            }
        }
        catch (e) {
            throwError(e);
        }
        function throwError(e) {
            throw new Error('An error occurred while trying to read the map file at ' + filename + '\n' + e.stack);
        }
    }