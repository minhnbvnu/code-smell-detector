function setStartsOnNewLine(node, newLine) {
            getOrCreateEmitNode(node).startsOnNewLine = newLine;
            return node;
        }