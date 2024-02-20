function getPackageJsonTypesVersionsPaths(typesVersions) {
            if (!typeScriptVersion)
                typeScriptVersion = new Version(version);
            for (const key in typesVersions) {
                if (!hasProperty(typesVersions, key))
                    continue;
                const keyRange = VersionRange.tryParse(key);
                if (keyRange === void 0) {
                    continue;
                }
                if (keyRange.test(typeScriptVersion)) {
                    return { version: key, paths: typesVersions[key] };
                }
            }
        }