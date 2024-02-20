function pathNames(obj, path) {
        var regx = /\/{2,9}/g,
            names = path.replace(regx, "/").split("/");

        if (path.slice(0, 1) == "/" || path.length === 0) {
            names.splice(0, 1);
        }

        if (path.slice(-1) == "/") {
            names.splice(names.length - 1, 1);
        }

        return names;
    }