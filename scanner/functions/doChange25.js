function doChange25(changes, sourceFile, returnTypeNode, promisedTypeNode) {
            changes.replaceNode(sourceFile, returnTypeNode, factory.createTypeReferenceNode("Promise", [promisedTypeNode]));
        }