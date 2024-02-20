function getReportNodeName(node) {
        if (node.type === "ChainExpression") {
            return getReportNodeName(node.expression);
        }
        if (node.type === "MemberExpression") {
            return getPropertyName(node);
        }
        return node.name;
    }