function isLookaround(node) {
        return node.type === "Assertion" &&
            (node.kind === "lookahead" || node.kind === "lookbehind");
    }