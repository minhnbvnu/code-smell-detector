function isPartOfTypeQuery(node) {
            while (node.kind === 163 /* QualifiedName */ || node.kind === 79 /* Identifier */) {
                node = node.parent;
            }
            return node.kind === 183 /* TypeQuery */;
        }