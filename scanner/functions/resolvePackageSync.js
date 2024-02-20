function resolvePackageSync(base, packagePath) {
        var originalBase = base;
        if (!(base in packagePathCache)) {
            packagePathCache[base] = {};
        }
        var cache = packagePathCache[base];
        if (packagePath in cache) {
            return cache[packagePath];
        }
        var newPath;
        if (packagePath[0] === "." || packagePath[0] === "/") {
            newPath = resolve(base, packagePath);
            if (!existsSync(newPath)) {
                newPath = newPath + ".js";
            }
            if (existsSync(newPath)) {
                newPath = realpathSync(newPath);
                cache[packagePath] = newPath;
                return newPath;
            }
        }
        else {
            while (base) {
                newPath = resolve(base, "node_modules", packagePath);
                if (existsSync(newPath)) {
                    newPath = realpathSync(newPath);
                    cache[packagePath] = newPath;
                    return newPath;
                }
                base = resolve(base, '..');
            }
        }
        var err = new Error("Can't find '" + packagePath + "' relative to '" + originalBase + "'");
        err.code = "ENOENT";
        throw err;
    }