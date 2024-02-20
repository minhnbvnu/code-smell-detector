function isRegexLiteral(node) {
        return node.type === "Literal" && Object.prototype.hasOwnProperty.call(node, "regex");
    }