function getAstFromProgram(currentProgram, parseSettings) {
        const ast = currentProgram.getSourceFile(parseSettings.filePath);
        // working around https://github.com/typescript-eslint/typescript-eslint/issues/1573
        const expectedExt = getExtension(parseSettings.filePath);
        const returnedExt = getExtension(ast === null || ast === void 0 ? void 0 : ast.fileName);
        if (expectedExt !== returnedExt) {
            return undefined;
        }
        return ast && { ast, program: currentProgram };
    }