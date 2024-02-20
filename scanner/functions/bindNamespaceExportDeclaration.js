function bindNamespaceExportDeclaration(node) {
                if (some(node.modifiers)) {
                    file.bindDiagnostics.push(createDiagnosticForNode2(node, Diagnostics.Modifiers_cannot_appear_here));
                }
                const diag2 = !isSourceFile(node.parent) ? Diagnostics.Global_module_exports_may_only_appear_at_top_level : !isExternalModule(node.parent) ? Diagnostics.Global_module_exports_may_only_appear_in_module_files : !node.parent.isDeclarationFile ? Diagnostics.Global_module_exports_may_only_appear_in_declaration_files : void 0;
                if (diag2) {
                    file.bindDiagnostics.push(createDiagnosticForNode2(node, diag2));
                }
                else {
                    file.symbol.globalExports = file.symbol.globalExports || createSymbolTable();
                    declareSymbol(file.symbol.globalExports, file.symbol, node, 2097152 /* Alias */, 2097152 /* AliasExcludes */);
                }
            }