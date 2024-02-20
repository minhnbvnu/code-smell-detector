function appendExportsOfImportEqualsDeclaration(statements, node) {
                if (hasSyntacticModifier(node, 1 /* Export */)) {
                    statements = append(statements, factory2.createExportDeclaration(
                    /*modifiers*/
                    void 0, node.isTypeOnly, factory2.createNamedExports([factory2.createExportSpecifier(
                        /*isTypeOnly*/
                        false, 
                        /*propertyName*/
                        void 0, idText(node.name))])));
                }
                return statements;
            }