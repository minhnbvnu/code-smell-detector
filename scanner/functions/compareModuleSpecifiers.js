function compareModuleSpecifiers(a, b, importingFile, program, allowsImportingSpecifier, toPath3) {
            if (a.kind !== 0 /* UseNamespace */ && b.kind !== 0 /* UseNamespace */) {
                return compareBooleans(allowsImportingSpecifier(b.moduleSpecifier), allowsImportingSpecifier(a.moduleSpecifier)) || compareNodeCoreModuleSpecifiers(a.moduleSpecifier, b.moduleSpecifier, importingFile, program) || compareBooleans(isFixPossiblyReExportingImportingFile(a, importingFile, program.getCompilerOptions(), toPath3), isFixPossiblyReExportingImportingFile(b, importingFile, program.getCompilerOptions(), toPath3)) || compareNumberOfDirectorySeparators(a.moduleSpecifier, b.moduleSpecifier);
            }
            return 0 /* EqualTo */;
        }