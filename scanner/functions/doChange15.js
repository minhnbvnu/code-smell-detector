function doChange15(changes, sourceFile, node) {
            changes.replaceNode(sourceFile, node, factory.createPropertyAssignment(node.name, node.objectAssignmentInitializer));
        }