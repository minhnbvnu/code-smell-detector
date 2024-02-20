function checkAndReportErrorForResolvingImportAliasToTypeOnlySymbol(node, resolved) {
                if (markSymbolOfAliasDeclarationIfTypeOnly(node, 
                /*immediateTarget*/
                void 0, resolved, 
                /*overwriteEmpty*/
                false) && !node.isTypeOnly) {
                    const typeOnlyDeclaration = getTypeOnlyAliasDeclaration(getSymbolOfDeclaration(node));
                    const isExport = typeOnlyDeclaration.kind === 278 /* ExportSpecifier */ || typeOnlyDeclaration.kind === 275 /* ExportDeclaration */;
                    const message = isExport ? Diagnostics.An_import_alias_cannot_reference_a_declaration_that_was_exported_using_export_type : Diagnostics.An_import_alias_cannot_reference_a_declaration_that_was_imported_using_import_type;
                    const relatedMessage = isExport ? Diagnostics._0_was_exported_here : Diagnostics._0_was_imported_here;
                    const name = typeOnlyDeclaration.kind === 275 /* ExportDeclaration */ ? "*" : unescapeLeadingUnderscores(typeOnlyDeclaration.name.escapedText);
                    addRelatedInfo(error(node.moduleReference, message), createDiagnosticForNode(typeOnlyDeclaration, relatedMessage, name));
                }
            }