function getShouldUseDefault(program, importClause) {
            return getAllowSyntheticDefaultImports(program.getCompilerOptions()) && isExportEqualsModule(importClause.parent.moduleSpecifier, program.getTypeChecker());
        }