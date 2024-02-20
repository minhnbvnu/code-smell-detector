function updateImportClause(node, isTypeOnly, name, namedBindings) {
                return node.isTypeOnly !== isTypeOnly || node.name !== name || node.namedBindings !== namedBindings ? update(createImportClause(isTypeOnly, name, namedBindings), node) : node;
            }