function getUmdImportKind(importingFile, compilerOptions, forceImportKeyword) {
            if (getAllowSyntheticDefaultImports(compilerOptions)) {
                return 1 /* Default */;
            }
            const moduleKind = getEmitModuleKind(compilerOptions);
            switch (moduleKind) {
                case 2 /* AMD */:
                case 1 /* CommonJS */:
                case 3 /* UMD */:
                    if (isInJSFile(importingFile)) {
                        return isExternalModule(importingFile) || forceImportKeyword ? 2 /* Namespace */ : 3 /* CommonJS */;
                    }
                    return 3 /* CommonJS */;
                case 4 /* System */:
                case 5 /* ES2015 */:
                case 6 /* ES2020 */:
                case 7 /* ES2022 */:
                case 99 /* ESNext */:
                case 0 /* None */:
                    return 2 /* Namespace */;
                case 100 /* Node16 */:
                case 199 /* NodeNext */:
                    return importingFile.impliedNodeFormat === 99 /* ESNext */ ? 2 /* Namespace */ : 3 /* CommonJS */;
                default:
                    return Debug.assertNever(moduleKind, `Unexpected moduleKind ${moduleKind}`);
            }
        }