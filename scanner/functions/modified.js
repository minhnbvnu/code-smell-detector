function modified(node) {
            if (node instanceof AST_DestructuredArray) {
                node.elements.forEach(modified);
            } else if (node instanceof AST_DestructuredObject) {
                node.properties.forEach(function(prop) {
                    modified(prop.value);
                });
            } else if (node instanceof AST_PropAccess) {
                modified(node.expression);
            } else if (node instanceof AST_SymbolRef) {
                node.definition().references.forEach(function(ref) {
                    delete ref._eval;
                });
            }
        }