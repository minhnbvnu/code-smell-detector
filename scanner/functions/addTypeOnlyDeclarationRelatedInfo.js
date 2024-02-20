function addTypeOnlyDeclarationRelatedInfo(diagnostic, typeOnlyDeclaration, unescapedName) {
                if (!typeOnlyDeclaration)
                    return diagnostic;
                return addRelatedInfo(diagnostic, createDiagnosticForNode(typeOnlyDeclaration, typeOnlyDeclaration.kind === 278 /* ExportSpecifier */ || typeOnlyDeclaration.kind === 275 /* ExportDeclaration */ || typeOnlyDeclaration.kind === 277 /* NamespaceExport */ ? Diagnostics._0_was_exported_here : Diagnostics._0_was_imported_here, unescapedName));
            }