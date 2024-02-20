function createStringRange(node, sourceFile) {
            return createRange(node.getStart(sourceFile) + 1, node.end - 1);
        }