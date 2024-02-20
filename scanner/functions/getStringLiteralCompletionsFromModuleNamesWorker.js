function getStringLiteralCompletionsFromModuleNamesWorker(sourceFile, node, compilerOptions, host, typeChecker, preferences) {
            const literalValue = normalizeSlashes(node.text);
            const mode = isStringLiteralLike(node) ? getModeForUsageLocation(sourceFile, node) : void 0;
            const scriptPath = sourceFile.path;
            const scriptDirectory = getDirectoryPath(scriptPath);
            const extensionOptions = getExtensionOptions(compilerOptions, 1 /* ModuleSpecifier */, sourceFile, typeChecker, preferences, mode);
            return isPathRelativeToScript(literalValue) || !compilerOptions.baseUrl && (isRootedDiskPath(literalValue) || isUrl(literalValue)) ? getCompletionEntriesForRelativeModules(literalValue, scriptDirectory, compilerOptions, host, scriptPath, extensionOptions) : getCompletionEntriesForNonRelativeModules(literalValue, scriptDirectory, mode, compilerOptions, host, extensionOptions, typeChecker);
        }