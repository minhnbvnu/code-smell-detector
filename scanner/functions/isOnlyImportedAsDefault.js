function isOnlyImportedAsDefault(usage) {
                const usageMode = getUsageModeForExpression(usage);
                return usageMode === 99 /* ESNext */ && endsWith(usage.text, ".json" /* Json */);
            }