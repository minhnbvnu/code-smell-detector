function assignPositionsToNode(node) {
            const visited = visitEachChild(node, assignPositionsToNode, textChangesTransformationContext, assignPositionsToNodeArray, assignPositionsToNode);
            const newNode = nodeIsSynthesized(visited) ? visited : Object.create(visited);
            setTextRangePosEnd(newNode, getPos2(node), getEnd(node));
            return newNode;
        }