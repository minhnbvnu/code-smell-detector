function createIsolatedProgram(parseSettings) {
        log('Getting isolated program in %s mode for: %s', parseSettings.jsx ? 'TSX' : 'TS', parseSettings.filePath);
        const compilerHost = {
            fileExists() {
                return true;
            },
            getCanonicalFileName() {
                return parseSettings.filePath;
            },
            getCurrentDirectory() {
                return '';
            },
            getDirectories() {
                return [];
            },
            getDefaultLibFileName() {
                return 'lib.d.ts';
            },
            // TODO: Support Windows CRLF
            getNewLine() {
                return '\n';
            },
            getSourceFile(filename) {
                return ts.createSourceFile(filename, parseSettings.code, ts.ScriptTarget.Latest, 
                /* setParentNodes */ true, (0, getScriptKind_1.getScriptKind)(parseSettings.filePath, parseSettings.jsx));
            },
            readFile() {
                return undefined;
            },
            useCaseSensitiveFileNames() {
                return true;
            },
            writeFile() {
                return null;
            },
        };
        const program = ts.createProgram([parseSettings.filePath], Object.assign({ noResolve: true, target: ts.ScriptTarget.Latest, jsx: parseSettings.jsx ? ts.JsxEmit.Preserve : undefined }, (0, shared_1.createDefaultCompilerOptionsFromExtra)(parseSettings)), compilerHost);
        const ast = program.getSourceFile(parseSettings.filePath);
        if (!ast) {
            throw new Error('Expected an ast to be returned for the single-file isolated program.');
        }
        return { ast, program };
    }