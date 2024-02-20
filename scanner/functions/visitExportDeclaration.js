function visitExportDeclaration(node) {
                if (compilerOptions.module !== void 0 && compilerOptions.module > 5 /* ES2015 */) {
                    return node;
                }
                if (!node.exportClause || !isNamespaceExport(node.exportClause) || !node.moduleSpecifier) {
                    return node;
                }
                const oldIdentifier = node.exportClause.name;
                const synthName = factory2.getGeneratedNameForNode(oldIdentifier);
                const importDecl = factory2.createImportDeclaration(
                /*modifiers*/
                void 0, factory2.createImportClause(
                /*isTypeOnly*/
                false, 
                /*name*/
                void 0, factory2.createNamespaceImport(synthName)), node.moduleSpecifier, node.assertClause);
                setOriginalNode(importDecl, node.exportClause);
                const exportDecl = isExportNamespaceAsDefaultDeclaration(node) ? factory2.createExportDefault(synthName) : factory2.createExportDeclaration(
                /*modifiers*/
                void 0, 
                /*isTypeOnly*/
                false, factory2.createNamedExports([factory2.createExportSpecifier(
                    /*isTypeOnly*/
                    false, synthName, oldIdentifier)]));
                setOriginalNode(exportDecl, node);
                return [importDecl, exportDecl];
            }