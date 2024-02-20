function isFixPossiblyReExportingImportingFile(fix, importingFile, compilerOptions, toPath3) {
            var _a2;
            if (fix.isReExport && ((_a2 = fix.exportInfo) == null ? void 0 : _a2.moduleFileName) && getEmitModuleResolutionKind(compilerOptions) === 2 /* Node10 */ && isIndexFileName(fix.exportInfo.moduleFileName)) {
                const reExportDir = toPath3(getDirectoryPath(fix.exportInfo.moduleFileName));
                return startsWith(importingFile.path, reExportDir);
            }
            return false;
        }