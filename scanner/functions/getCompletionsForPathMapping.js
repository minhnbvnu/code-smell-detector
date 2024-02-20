function getCompletionsForPathMapping(path, patterns, fragment, packageDirectory, extensionOptions, host) {
            if (!endsWith(path, "*")) {
                return !stringContains(path, "*") ? justPathMappingName(path, "script" /* scriptElement */) : emptyArray;
            }
            const pathPrefix = path.slice(0, path.length - 1);
            const remainingFragment = tryRemovePrefix(fragment, pathPrefix);
            if (remainingFragment === void 0) {
                const starIsFullPathComponent = path[path.length - 2] === "/";
                return starIsFullPathComponent ? justPathMappingName(pathPrefix, "directory" /* directory */) : flatMap(patterns, (pattern) => {
                    var _a2;
                    return (_a2 = getModulesForPathsPattern("", packageDirectory, pattern, extensionOptions, host)) == null ? void 0 : _a2.map(({ name, ...rest }) => ({ name: pathPrefix + name, ...rest }));
                });
            }
            return flatMap(patterns, (pattern) => getModulesForPathsPattern(remainingFragment, packageDirectory, pattern, extensionOptions, host));
            function justPathMappingName(name, kind) {
                return startsWith(name, fragment) ? [{ name: removeTrailingDirectorySeparator(name), kind, extension: void 0 }] : emptyArray;
            }
        }