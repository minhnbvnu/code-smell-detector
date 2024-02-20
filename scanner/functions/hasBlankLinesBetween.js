function hasBlankLinesBetween(node, token) {
        return token.loc.start.line > node.loc.end.line + 1;
    }