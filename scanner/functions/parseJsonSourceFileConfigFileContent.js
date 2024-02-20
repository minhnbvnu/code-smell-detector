function parseJsonSourceFileConfigFileContent(sourceFile, host, basePath, existingOptions, configFileName, resolutionStack, extraFileExtensions, extendedConfigCache, existingWatchOptions) {
            var _a2, _b;
            (_a2 = tracing) == null ? void 0 : _a2.push(tracing.Phase.Parse, "parseJsonSourceFileConfigFileContent", { path: sourceFile.fileName });
            const result = parseJsonConfigFileContentWorker(
            /*json*/
            void 0, sourceFile, host, basePath, existingOptions, existingWatchOptions, configFileName, resolutionStack, extraFileExtensions, extendedConfigCache);
            (_b = tracing) == null ? void 0 : _b.pop();
            return result;
        }