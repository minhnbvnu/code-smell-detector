function mergePlugins(target, source) {
        if (!isNonNullObject(source)) {
            return;
        }
        for (const key of Object.keys(source)) {
            if (key === "__proto__") {
                continue;
            }
            const targetValue = target[key];
            const sourceValue = source[key];
            // Adopt the plugin which was found at first.
            if (targetValue === void 0) {
                if (sourceValue.error) {
                    throw sourceValue.error;
                }
                target[key] = sourceValue;
            }
            else if (sourceValue.filePath !== targetValue.filePath) {
                throw new PluginConflictError(key, [
                    {
                        filePath: targetValue.filePath,
                        importerName: targetValue.importerName
                    },
                    {
                        filePath: sourceValue.filePath,
                        importerName: sourceValue.importerName
                    }
                ]);
            }
        }
    }