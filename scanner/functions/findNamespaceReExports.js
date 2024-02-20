function findNamespaceReExports(sourceFileLike, name, checker) {
            const namespaceImportSymbol = checker.getSymbolAtLocation(name);
            return !!forEachPossibleImportOrExportStatement(sourceFileLike, (statement) => {
                if (!isExportDeclaration(statement))
                    return;
                const { exportClause, moduleSpecifier } = statement;
                return !moduleSpecifier && exportClause && isNamedExports(exportClause) && exportClause.elements.some((element) => checker.getExportSpecifierLocalTargetSymbol(element) === namespaceImportSymbol);
            });
        }