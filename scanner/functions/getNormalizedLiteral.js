function getNormalizedLiteral(node) {
        if (node.type === "Literal") {
            return node;
        }
        if (isNegativeNumericLiteral(node)) {
            return {
                type: "Literal",
                value: -node.argument.value,
                raw: `-${node.argument.value}`
            };
        }
        if (isStaticTemplateLiteral(node)) {
            return {
                type: "Literal",
                value: node.quasis[0].value.cooked,
                raw: node.quasis[0].value.raw
            };
        }
        return null;
    }