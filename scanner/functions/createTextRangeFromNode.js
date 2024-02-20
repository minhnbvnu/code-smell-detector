function createTextRangeFromNode(node, sourceFile) {
            return createRange(node.getStart(sourceFile), node.end);
        }