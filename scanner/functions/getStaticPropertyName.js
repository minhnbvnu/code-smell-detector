function getStaticPropertyName(node) {
        let prop;
        switch (node && node.type) {
            case "ChainExpression":
                return getStaticPropertyName(node.expression);
            case "Property":
            case "PropertyDefinition":
            case "MethodDefinition":
                prop = node.key;
                break;
            case "MemberExpression":
                prop = node.property;
                break;
            // no default
        }
        if (prop) {
            if (prop.type === "Identifier" && !node.computed) {
                return prop.name;
            }
            return getStaticStringValue(prop);
        }
        return null;
    }