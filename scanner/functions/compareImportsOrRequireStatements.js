function compareImportsOrRequireStatements(s1, s2, comparer) {
            return compareModuleSpecifiersWorker(getModuleSpecifierExpression(s1), getModuleSpecifierExpression(s2), comparer) || compareImportKind(s1, s2);
        }