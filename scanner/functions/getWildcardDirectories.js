function getWildcardDirectories({ validatedIncludeSpecs: include, validatedExcludeSpecs: exclude }, path, useCaseSensitiveFileNames) {
            const rawExcludeRegex = getRegularExpressionForWildcard(exclude, path, "exclude");
            const excludeRegex = rawExcludeRegex && new RegExp(rawExcludeRegex, useCaseSensitiveFileNames ? "" : "i");
            const wildcardDirectories = {};
            if (include !== void 0) {
                const recursiveKeys = [];
                for (const file of include) {
                    const spec = normalizePath(combinePaths(path, file));
                    if (excludeRegex && excludeRegex.test(spec)) {
                        continue;
                    }
                    const match = getWildcardDirectoryFromSpec(spec, useCaseSensitiveFileNames);
                    if (match) {
                        const { key, flags } = match;
                        const existingFlags = wildcardDirectories[key];
                        if (existingFlags === void 0 || existingFlags < flags) {
                            wildcardDirectories[key] = flags;
                            if (flags === 1 /* Recursive */) {
                                recursiveKeys.push(key);
                            }
                        }
                    }
                }
                for (const key in wildcardDirectories) {
                    if (hasProperty(wildcardDirectories, key)) {
                        for (const recursiveKey of recursiveKeys) {
                            if (key !== recursiveKey && containsPath(recursiveKey, key, path, !useCaseSensitiveFileNames)) {
                                delete wildcardDirectories[key];
                            }
                        }
                    }
                }
            }
            return wildcardDirectories;
        }