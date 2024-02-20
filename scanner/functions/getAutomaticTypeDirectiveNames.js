function getAutomaticTypeDirectiveNames(options, host) {
            if (options.types) {
                return options.types;
            }
            const result = [];
            if (host.directoryExists && host.getDirectories) {
                const typeRoots = getEffectiveTypeRoots(options, host);
                if (typeRoots) {
                    for (const root of typeRoots) {
                        if (host.directoryExists(root)) {
                            for (const typeDirectivePath of host.getDirectories(root)) {
                                const normalized = normalizePath(typeDirectivePath);
                                const packageJsonPath = combinePaths(root, normalized, "package.json");
                                const isNotNeededPackage = host.fileExists(packageJsonPath) && readJson(packageJsonPath, host).typings === null;
                                if (!isNotNeededPackage) {
                                    const baseFileName = getBaseFileName(normalized);
                                    if (baseFileName.charCodeAt(0) !== 46 /* dot */) {
                                        result.push(baseFileName);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return result;
        }