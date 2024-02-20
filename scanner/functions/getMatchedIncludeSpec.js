function getMatchedIncludeSpec(program, fileName) {
            var _a2, _b;
            const configFile = program.getCompilerOptions().configFile;
            if (!((_a2 = configFile == null ? void 0 : configFile.configFileSpecs) == null ? void 0 : _a2.validatedIncludeSpecs))
                return void 0;
            if (configFile.configFileSpecs.isDefaultIncludeSpec)
                return true;
            const isJsonFile = fileExtensionIs(fileName, ".json" /* Json */);
            const basePath = getDirectoryPath(getNormalizedAbsolutePath(configFile.fileName, program.getCurrentDirectory()));
            const useCaseSensitiveFileNames = program.useCaseSensitiveFileNames();
            return find((_b = configFile == null ? void 0 : configFile.configFileSpecs) == null ? void 0 : _b.validatedIncludeSpecs, (includeSpec) => {
                if (isJsonFile && !endsWith(includeSpec, ".json" /* Json */))
                    return false;
                const pattern = getPatternFromSpec(includeSpec, basePath, "files");
                return !!pattern && getRegexFromPattern(`(${pattern})$`, useCaseSensitiveFileNames).test(fileName);
            });
        }