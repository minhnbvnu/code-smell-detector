function convertToTSConfig(configParseResult, configFileName, host) {
            var _a2, _b, _c;
            const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames);
            const files = map(filter(configParseResult.fileNames, !((_b = (_a2 = configParseResult.options.configFile) == null ? void 0 : _a2.configFileSpecs) == null ? void 0 : _b.validatedIncludeSpecs) ? returnTrue : matchesSpecs(configFileName, configParseResult.options.configFile.configFileSpecs.validatedIncludeSpecs, configParseResult.options.configFile.configFileSpecs.validatedExcludeSpecs, host)), (f) => getRelativePathFromFile(getNormalizedAbsolutePath(configFileName, host.getCurrentDirectory()), getNormalizedAbsolutePath(f, host.getCurrentDirectory()), getCanonicalFileName));
            const optionMap = serializeCompilerOptions(configParseResult.options, { configFilePath: getNormalizedAbsolutePath(configFileName, host.getCurrentDirectory()), useCaseSensitiveFileNames: host.useCaseSensitiveFileNames });
            const watchOptionMap = configParseResult.watchOptions && serializeWatchOptions(configParseResult.watchOptions);
            const config = {
                compilerOptions: {
                    ...optionMapToObject(optionMap),
                    showConfig: void 0,
                    configFile: void 0,
                    configFilePath: void 0,
                    help: void 0,
                    init: void 0,
                    listFiles: void 0,
                    listEmittedFiles: void 0,
                    project: void 0,
                    build: void 0,
                    version: void 0
                },
                watchOptions: watchOptionMap && optionMapToObject(watchOptionMap),
                references: map(configParseResult.projectReferences, (r) => ({ ...r, path: r.originalPath ? r.originalPath : "", originalPath: void 0 })),
                files: length(files) ? files : void 0,
                ...((_c = configParseResult.options.configFile) == null ? void 0 : _c.configFileSpecs) ? {
                    include: filterSameAsDefaultInclude(configParseResult.options.configFile.configFileSpecs.validatedIncludeSpecs),
                    exclude: configParseResult.options.configFile.configFileSpecs.validatedExcludeSpecs
                } : {},
                compileOnSave: !!configParseResult.compileOnSave ? true : void 0
            };
            return config;
        }