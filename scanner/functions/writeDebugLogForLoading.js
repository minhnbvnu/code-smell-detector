function writeDebugLogForLoading(request, relativeTo, filePath) {
        /* istanbul ignore next */
        if (debug$2.enabled) {
            let nameAndVersion = null;
            try {
                const packageJsonPath = resolve(`${request}/package.json`, relativeTo);
                const { version = "unknown" } = require$1(packageJsonPath);
                nameAndVersion = `${request}@${version}`;
            }
            catch (error) {
                debug$2("package.json was not found:", error.message);
                nameAndVersion = request;
            }
            debug$2("Loaded: %s (%s)", nameAndVersion, filePath);
        }
    }