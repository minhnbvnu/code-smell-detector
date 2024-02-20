function parseJsonConfigFileContent(json, host, basePath, existingOptions, configFileName, resolutionStack, extraFileExtensions, extendedConfigCache, existingWatchOptions) {
            return parseJsonConfigFileContentWorker(json, 
            /*sourceFile*/
            void 0, host, basePath, existingOptions, existingWatchOptions, configFileName, resolutionStack, extraFileExtensions, extendedConfigCache);
        }