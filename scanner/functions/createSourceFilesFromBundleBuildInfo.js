function createSourceFilesFromBundleBuildInfo(bundle, buildInfoDirectory, host) {
            var _a2;
            const jsBundle = Debug.checkDefined(bundle.js);
            const prologueMap = ((_a2 = jsBundle.sources) == null ? void 0 : _a2.prologues) && arrayToMap(jsBundle.sources.prologues, (prologueInfo) => prologueInfo.file);
            return bundle.sourceFiles.map((fileName, index) => {
                var _a3, _b;
                const prologueInfo = prologueMap == null ? void 0 : prologueMap.get(index);
                const statements = prologueInfo == null ? void 0 : prologueInfo.directives.map((directive) => {
                    const literal = setTextRange(factory.createStringLiteral(directive.expression.text), directive.expression);
                    const statement = setTextRange(factory.createExpressionStatement(literal), directive);
                    setParent(literal, statement);
                    return statement;
                });
                const eofToken = factory.createToken(1 /* EndOfFileToken */);
                const sourceFile = factory.createSourceFile(statements != null ? statements : [], eofToken, 0 /* None */);
                sourceFile.fileName = getRelativePathFromDirectory(host.getCurrentDirectory(), getNormalizedAbsolutePath(fileName, buildInfoDirectory), !host.useCaseSensitiveFileNames());
                sourceFile.text = (_a3 = prologueInfo == null ? void 0 : prologueInfo.text) != null ? _a3 : "";
                setTextRangePosWidth(sourceFile, 0, (_b = prologueInfo == null ? void 0 : prologueInfo.text.length) != null ? _b : 0);
                setEachParent(sourceFile.statements, sourceFile);
                setTextRangePosWidth(eofToken, sourceFile.end, 0);
                setParent(eofToken, sourceFile);
                return sourceFile;
            });
        }