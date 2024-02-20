function getExportEqualsImportKind(importingFile, compilerOptions, forceImportKeyword) {
            const allowSyntheticDefaults = getAllowSyntheticDefaultImports(compilerOptions);
            const isJS = isInJSFile(importingFile);
            if (!isJS && getEmitModuleKind(compilerOptions) >= 5 /* ES2015 */) {
                return allowSyntheticDefaults ? 1 /* Default */ : 2 /* Namespace */;
            }
            if (isJS) {
                return isExternalModule(importingFile) || forceImportKeyword ? allowSyntheticDefaults ? 1 /* Default */ : 2 /* Namespace */ : 3 /* CommonJS */;
            }
            for (const statement of importingFile.statements) {
                if (isImportEqualsDeclaration(statement) && !nodeIsMissing(statement.moduleReference)) {
                    return 3 /* CommonJS */;
                }
            }
            return allowSyntheticDefaults ? 1 /* Default */ : 3 /* CommonJS */;
        }