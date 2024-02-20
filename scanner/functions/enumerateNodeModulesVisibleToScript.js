function enumerateNodeModulesVisibleToScript(host, scriptPath) {
            if (!host.readFile || !host.fileExists)
                return emptyArray;
            const result = [];
            for (const packageJson of findPackageJsons(scriptPath, host)) {
                const contents = readJson(packageJson, host);
                for (const key of nodeModulesDependencyKeys) {
                    const dependencies = contents[key];
                    if (!dependencies)
                        continue;
                    for (const dep in dependencies) {
                        if (hasProperty(dependencies, dep) && !startsWith(dep, "@types/")) {
                            result.push(dep);
                        }
                    }
                }
            }
            return result;
        }