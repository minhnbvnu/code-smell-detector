function updateExternalModuleReference(node, expression) {
                return node.expression !== expression ? update(createExternalModuleReference(expression), node) : node;
            }