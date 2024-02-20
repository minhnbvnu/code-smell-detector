function isUnaryTupleTypeNode(node) {
                return node.kind === 186 /* TupleType */ && node.elements.length === 1;
            }