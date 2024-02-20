function isSingleLine(node) {
        return (node.loc.end.line === node.loc.start.line);
    }