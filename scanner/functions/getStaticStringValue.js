function getStaticStringValue(node) {
        switch (node.type) {
            case "Literal":
                if (node.value === null) {
                    if (isNullLiteral(node)) {
                        return String(node.value); // "null"
                    }
                    if (node.regex) {
                        return `/${node.regex.pattern}/${node.regex.flags}`;
                    }
                    if (node.bigint) {
                        return node.bigint;
                    }
                    // Otherwise, this is an unknown literal. The function will return null.
                }
                else {
                    return String(node.value);
                }
                break;
            case "TemplateLiteral":
                if (node.expressions.length === 0 && node.quasis.length === 1) {
                    return node.quasis[0].value.cooked;
                }
                break;
            // no default
        }
        return null;
    }