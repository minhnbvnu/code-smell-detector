function addExports(sourceFile, toMove, needExport, useEs6Exports) {
            return flatMap(toMove, (statement) => {
                if (isTopLevelDeclarationStatement(statement) && !isExported(sourceFile, statement, useEs6Exports) && forEachTopLevelDeclaration(statement, (d) => {
                    var _a2;
                    return needExport.has(Debug.checkDefined((_a2 = tryCast(d, canHaveSymbol)) == null ? void 0 : _a2.symbol));
                })) {
                    const exports = addExport(statement, useEs6Exports);
                    if (exports)
                        return exports;
                }
                return statement;
            });
        }