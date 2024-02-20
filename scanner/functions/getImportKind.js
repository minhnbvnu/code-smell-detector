function getImportKind(importingFile, exportKind, compilerOptions, forceImportKeyword) {
            if (compilerOptions.verbatimModuleSyntax && (getEmitModuleKind(compilerOptions) === 1 /* CommonJS */ || importingFile.impliedNodeFormat === 1 /* CommonJS */)) {
                return 3 /* CommonJS */;
            }
            switch (exportKind) {
                case 0 /* Named */:
                    return 0 /* Named */;
                case 1 /* Default */:
                    return 1 /* Default */;
                case 2 /* ExportEquals */:
                    return getExportEqualsImportKind(importingFile, compilerOptions, !!forceImportKeyword);
                case 3 /* UMD */:
                    return getUmdImportKind(importingFile, compilerOptions, !!forceImportKeyword);
                default:
                    return Debug.assertNever(exportKind);
            }
        }