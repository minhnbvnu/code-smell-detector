function updatePropertyAssignment(node, name, initializer) {
                return node.name !== name || node.initializer !== initializer ? finishUpdatePropertyAssignment(createPropertyAssignment(name, initializer), node) : node;
            }