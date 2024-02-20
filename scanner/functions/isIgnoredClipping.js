function isIgnoredClipping(node) {
        var tagName = node.tagName;
        return tagName === 'HTML' || tagName === 'BODY';
    }