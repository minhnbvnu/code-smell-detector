function setIdentifierAutoGenerate(node, autoGenerate) {
            getOrCreateEmitNode(node).autoGenerate = autoGenerate;
            return node;
        }