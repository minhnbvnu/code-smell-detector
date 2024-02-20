function forEachChildInUnionOrIntersectionType(node, cbNode, cbNodes) {
            return visitNodes(cbNode, cbNodes, node.types);
        }