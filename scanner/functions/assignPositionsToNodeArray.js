function assignPositionsToNodeArray(nodes, visitor, test, start, count) {
            const visited = visitNodes2(nodes, visitor, test, start, count);
            if (!visited) {
                return visited;
            }
            Debug.assert(nodes);
            const nodeArray = visited === nodes ? factory.createNodeArray(visited.slice(0)) : visited;
            setTextRangePosEnd(nodeArray, getPos2(nodes), getEnd(nodes));
            return nodeArray;
        }