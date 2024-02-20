function setIdentifierGeneratedImportReference(node, value) {
            getOrCreateEmitNode(node).generatedImportReference = value;
            return node;
        }