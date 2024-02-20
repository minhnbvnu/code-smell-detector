function createProgramFromConfigFile(configFile, projectDirectory) {
        if (ts.sys === undefined) {
            throw new Error('`createProgramFromConfigFile` is only supported in a Node-like environment.');
        }
        const parsed = ts.getParsedCommandLineOfConfigFile(configFile, shared_1.CORE_COMPILER_OPTIONS, {
            onUnRecoverableConfigFileDiagnostic: diag => {
                throw new Error(formatDiagnostics([diag])); // ensures that `parsed` is defined.
            },
            fileExists: fs.existsSync,
            getCurrentDirectory: () => (projectDirectory && path.resolve(projectDirectory)) || process.cwd(),
            readDirectory: ts.sys.readDirectory,
            readFile: file => fs.readFileSync(file, 'utf-8'),
            useCaseSensitiveFileNames: ts.sys.useCaseSensitiveFileNames,
        });
        const result = parsed; // parsed is not undefined, since we throw on failure.
        if (result.errors.length) {
            throw new Error(formatDiagnostics(result.errors));
        }
        const host = ts.createCompilerHost(result.options, true);
        return ts.createProgram(result.fileNames, result.options, host);
    }