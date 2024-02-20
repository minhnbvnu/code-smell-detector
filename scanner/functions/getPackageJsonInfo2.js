function getPackageJsonInfo2(packageJsonPath) {
                return cache == null ? void 0 : cache.get(toPath(packageJsonPath, currentDirectory, getCanonicalFileName));
            }