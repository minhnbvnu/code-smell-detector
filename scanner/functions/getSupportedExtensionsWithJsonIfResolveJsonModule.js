function getSupportedExtensionsWithJsonIfResolveJsonModule(options, supportedExtensions) {
            if (!options || !getResolveJsonModule(options))
                return supportedExtensions;
            if (supportedExtensions === allSupportedExtensions)
                return allSupportedExtensionsWithJson;
            if (supportedExtensions === supportedTSExtensions)
                return supportedTSExtensionsWithJson;
            return [...supportedExtensions, [".json" /* Json */]];
        }