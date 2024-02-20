function getMuxPropertyNames() {
        var names1 = Object.getOwnPropertyNames(redirect).filter(function(name) {
            return name in redirect[name];
        });
        var names2 = getPropertyNames(catchall).filter(function(name) {
            return !hasOwn(redirect, name);
        });
        return names1.concat(names2);
    }