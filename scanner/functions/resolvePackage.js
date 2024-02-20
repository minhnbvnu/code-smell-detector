function resolvePackage(base, packagePath, callback) {
        var originalBase = base;
        if (!packagePathCache.hasOwnProperty(base)) {
            packagePathCache[base] = {};
        }
        var cache = packagePathCache[base];
        if (cache.hasOwnProperty(packagePath)) {
            return callback(null, cache[packagePath]);
        }
        if (packagePath[0] === "." || packagePath[0] === "/") {
            var newPath = resolve(base, packagePath);
            exists(newPath, function(exists) {
                if (exists) {
                    realpath(newPath, function(err, newPath) {
                        if (err) return callback(err);

                        cache[packagePath] = newPath;
                        return callback(null, newPath);
                    });
                } else {
                    var err = new Error("Can't find '" + packagePath + "' relative to '" + originalBase + "'");
                    err.code = "ENOENT";
                    return callback(err);
                }
            });
        }
        else {
            tryNext(base);
        }

        function tryNext(base) {
            if (base == "/") {
                var err = new Error("Can't find '" + packagePath + "' relative to '" + originalBase + "'");
                err.code = "ENOENT";
                return callback(err);
            }

            var newPath = resolve(base, "node_modules", packagePath);
            exists(newPath, function(exists) {
                if (exists) {
                    realpath(newPath, function(err, newPath) {
                        if (err) return callback(err);

                        cache[packagePath] = newPath;
                        return callback(null, newPath);
                    });
                } else {
                    var nextBase = resolve(base, '..');
                    if (nextBase === base)
                        tryNext("/"); // for windows
                    else
                        tryNext(nextBase);
                }
            });
        }
    }