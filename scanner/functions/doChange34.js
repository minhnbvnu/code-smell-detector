function doChange34(sourceFile, program, changes, info) {
            const checker = program.getTypeChecker();
            if (info.convertTo === 0 /* Named */) {
                doChangeNamespaceToNamed(sourceFile, checker, changes, info.import, getAllowSyntheticDefaultImports(program.getCompilerOptions()));
            }
            else {
                doChangeNamedToNamespaceOrDefault(sourceFile, program, changes, info.import, info.convertTo === 1 /* Default */);
            }
        }