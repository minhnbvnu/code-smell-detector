function changeImports(program, { wasDefault, exportName, exportingModuleSymbol }, changes, cancellationToken) {
            const checker = program.getTypeChecker();
            const exportSymbol = Debug.checkDefined(checker.getSymbolAtLocation(exportName), "Export name should resolve to a symbol");
            ts_FindAllReferences_exports.Core.eachExportReference(program.getSourceFiles(), checker, cancellationToken, exportSymbol, exportingModuleSymbol, exportName.text, wasDefault, (ref) => {
                if (exportName === ref)
                    return;
                const importingSourceFile = ref.getSourceFile();
                if (wasDefault) {
                    changeDefaultToNamedImport(importingSourceFile, ref, changes, exportName.text);
                }
                else {
                    changeNamedToDefaultImport(importingSourceFile, ref, changes);
                }
            });
        }