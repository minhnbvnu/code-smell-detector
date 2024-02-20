function createTextSpanFromNode(node, sourceFile, endNode2) {
            return createTextSpanFromBounds(node.getStart(sourceFile), (endNode2 || node).getEnd());
        }