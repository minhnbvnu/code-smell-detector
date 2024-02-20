function getBestFix(fixes, sourceFile, program, packageJsonImportFilter, host) {
            if (!some(fixes))
                return;
            if (fixes[0].kind === 0 /* UseNamespace */ || fixes[0].kind === 2 /* AddToExisting */) {
                return fixes[0];
            }
            return fixes.reduce((best, fix) => (
            // Takes true branch of conditional if `fix` is better than `best`
            compareModuleSpecifiers(fix, best, sourceFile, program, packageJsonImportFilter.allowsImportingSpecifier, (fileName) => toPath(fileName, host.getCurrentDirectory(), hostGetCanonicalFileName(host))) === -1 /* LessThan */ ? fix : best));
        }