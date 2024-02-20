function hasUselessComputedKey(node) {
        if (!node.computed) {
            return false;
        }
        const { key } = node;
        if (key.type !== "Literal") {
            return false;
        }
        const { value } = key;
        if (typeof value !== "number" && typeof value !== "string") {
            return false;
        }
        switch (node.type) {
            case "Property":
                return value !== "__proto__";
            case "PropertyDefinition":
                if (node.static) {
                    return value !== "constructor" && value !== "prototype";
                }
                return value !== "constructor";
            case "MethodDefinition":
                if (node.static) {
                    return value !== "prototype";
                }
                return value !== "constructor";
            /* c8 ignore next */
            default:
                throw new Error(`Unexpected node type: ${node.type}`);
        }
    }