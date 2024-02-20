function updateUnionOrIntersectionTypeNode(node, types, parenthesize) {
                return node.types !== types ? update(createUnionOrIntersectionTypeNode(node.kind, types, parenthesize), node) : node;
            }