function visitImportClause(node) {
                Debug.assert(!node.isTypeOnly);
                const name = shouldEmitAliasDeclaration(node) ? node.name : void 0;
                const namedBindings = visitNode(node.namedBindings, visitNamedImportBindings, isNamedImportBindings);
                return name || namedBindings ? factory2.updateImportClause(node, 
                /*isTypeOnly*/
                false, name, namedBindings) : void 0;
            }