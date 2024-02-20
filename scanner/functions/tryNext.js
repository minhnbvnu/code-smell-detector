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