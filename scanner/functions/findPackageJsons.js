function findPackageJsons(startDirectory, host, stopDirectory) {
            const paths = [];
            forEachAncestorDirectory(startDirectory, (ancestor) => {
                if (ancestor === stopDirectory) {
                    return true;
                }
                const currentConfigPath = combinePaths(ancestor, "package.json");
                if (tryFileExists(host, currentConfigPath)) {
                    paths.push(currentConfigPath);
                }
            });
            return paths;
        }