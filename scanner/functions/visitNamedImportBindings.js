function visitNamedImportBindings(node) {
                if (node.kind === 271 /* NamespaceImport */) {
                    return shouldEmitAliasDeclaration(node) ? node : void 0;
                }
                else {
                    const allowEmpty = compilerOptions.verbatimModuleSyntax || compilerOptions.preserveValueImports && (compilerOptions.importsNotUsedAsValues === 1 /* Preserve */ || compilerOptions.importsNotUsedAsValues === 2 /* Error */);
                    const elements = visitNodes2(node.elements, visitImportSpecifier, isImportSpecifier);
                    return allowEmpty || some(elements) ? factory2.updateNamedImports(node, elements) : void 0;
                }
            }