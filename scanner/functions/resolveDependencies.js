function resolveDependencies(file) {
        var currentDepsList = EDD._deps.files[file];
        if (!Array.isArray(currentDepsList)) {
            throw Error('List of dependencies must be an array, got ' +
                        typeof currentDepsList + ' ' + currentDepsList);
        }
        if (EDD._resolvingStatus[file]) {
            return;
        }
        EDD._resolvingStatus[file] = EDD.STATE_RESOLVING;
        if (currentDepsList.length > 0) {
            currentDepsList.forEach(function (file) {
                resolveDependencies(file);
            })
        }
        loadScript(file);
        EDD._resolvingStatus[file] = EDD.STATE_RESOLVED;
    }