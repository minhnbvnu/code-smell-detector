function getAdditionalDependencyPath(comment) {
        var amdDependencyRegEx = /^(\/\/\/\s*<amd-dependency\s+path=)('|")(.+?)\2\s*(static=('|")(.+?)\2\s*)*\/>/igm;
        var match = amdDependencyRegEx.exec(comment);
        if(match) {
            var path = match[3];
            return path;
        } else {
            return null;
        }
    }