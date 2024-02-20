function tryGetAnyFileFromPath(host, path) {
            if (!host.fileExists)
                return;
            const extensions = flatten(getSupportedExtensions({ allowJs: true }, [{ extension: "node", isMixedContent: false }, { extension: "json", isMixedContent: false, scriptKind: 6 /* JSON */ }]));
            for (const e of extensions) {
                const fullPath = path + e;
                if (host.fileExists(fullPath)) {
                    return fullPath;
                }
            }
        }