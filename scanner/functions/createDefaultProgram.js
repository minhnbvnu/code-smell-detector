function createDefaultProgram(parseSettings) {
        var _a;
        log('Getting default program for: %s', parseSettings.filePath || 'unnamed file');
        if (((_a = parseSettings.projects) === null || _a === void 0 ? void 0 : _a.length) !== 1) {
            return undefined;
        }
        const tsconfigPath = parseSettings.projects[0];
        const commandLine = ts.getParsedCommandLineOfConfigFile(tsconfigPath, (0, shared_1.createDefaultCompilerOptionsFromExtra)(parseSettings), Object.assign(Object.assign({}, ts.sys), { onUnRecoverableConfigFileDiagnostic: () => { } }));
        if (!commandLine) {
            return undefined;
        }
        const compilerHost = ts.createCompilerHost(commandLine.options, 
        /* setParentNodes */ true);
        if (parseSettings.moduleResolver) {
            // eslint-disable-next-line deprecation/deprecation -- intentional for older TS versions
            compilerHost.resolveModuleNames = (0, shared_1.getModuleResolver)(parseSettings.moduleResolver).resolveModuleNames;
        }
        const oldReadFile = compilerHost.readFile;
        compilerHost.readFile = (fileName) => path_1.default.normalize(fileName) === path_1.default.normalize(parseSettings.filePath)
            ? parseSettings.code
            : oldReadFile(fileName);
        const program = ts.createProgram([parseSettings.filePath], commandLine.options, compilerHost);
        const ast = program.getSourceFile(parseSettings.filePath);
        return ast && { ast, program };
    }