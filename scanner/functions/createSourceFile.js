function createSourceFile(parseSettings) {
        log('Getting AST without type information in %s mode for: %s', parseSettings.jsx ? 'TSX' : 'TS', parseSettings.filePath);
        return ts.createSourceFile(parseSettings.filePath, parseSettings.code, ts.ScriptTarget.Latest, 
        /* setParentNodes */ true, (0, getScriptKind_1.getScriptKind)(parseSettings.filePath, parseSettings.jsx));
    }