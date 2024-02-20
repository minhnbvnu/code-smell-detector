function indexOfNode(nodeArray, node) {
            return binarySearch(nodeArray, node, getPos, compareValues);
        }