function visitNode(node, visitor, test, lift) {
            if (node === void 0) {
                return node;
            }
            const visited = visitor(node);
            let visitedNode;
            if (visited === void 0) {
                return void 0;
            }
            else if (isArray(visited)) {
                visitedNode = (lift || extractSingleNode)(visited);
            }
            else {
                visitedNode = visited;
            }
            Debug.assertNode(visitedNode, test);
            return visitedNode;
        }