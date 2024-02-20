function resolveModuleSync(base, modulePath) {
        var packagePath;
        try {
            packagePath = resolvePackageSync(base, modulePath + "/package.json");
        }
        catch (err) {
            if (err.code !== "ENOENT") throw err;
        }
        var metadata = packagePath && require(packagePath).plugin || {};
        if (packagePath) {
            modulePath = dirname(packagePath);
        } else {
            modulePath = resolvePackageSync(base, modulePath);
        }
        var module = require(modulePath);
        metadata.provides = metadata.provides || module.provides || [];
        metadata.consumes = metadata.consumes || module.consumes || [];
        metadata.packagePath = modulePath;
        return metadata;
    }