function isStaticTemplateLiteral(node) {
        return node.type === "TemplateLiteral" && node.expressions.length === 0;
    }