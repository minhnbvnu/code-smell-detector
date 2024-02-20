function getStringIfConstant(node, initialScope = null) {
        // Handle the literals that the platform doesn't support natively.
        if (node && node.type === "Literal" && node.value === null) {
            if (node.regex) {
                return `/${node.regex.pattern}/${node.regex.flags}`;
            }
            if (node.bigint) {
                return node.bigint;
            }
        }
        const evaluated = getStaticValue(node, initialScope);
        return evaluated && String(evaluated.value);
    }