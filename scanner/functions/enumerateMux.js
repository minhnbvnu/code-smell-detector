function enumerateMux() {
        var result = Object.getOwnPropertyNames(redirect).filter(function(name) {
            return name in redirect[name];
        });
        for (name in catchall) {
            if (!hasOwn(redirect, name))
                result.push(name);
        };
        return result;
    }