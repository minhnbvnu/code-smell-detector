function updateShorthandPropertyAssignment(node, name, objectAssignmentInitializer) {
                return node.name !== name || node.objectAssignmentInitializer !== objectAssignmentInitializer ? finishUpdateShorthandPropertyAssignment(createShorthandPropertyAssignment(name, objectAssignmentInitializer), node) : node;
            }