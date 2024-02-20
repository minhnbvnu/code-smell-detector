function isValidOffset(node, offset) {
        return offset <= (dom.isCharacterDataNode(node) ? node.length : node.childNodes.length);
    }