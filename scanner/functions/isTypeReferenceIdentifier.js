function isTypeReferenceIdentifier(node) {
                while (node.parent.kind === 163 /* QualifiedName */) {
                    node = node.parent;
                }
                return node.parent.kind === 180 /* TypeReference */;
            }