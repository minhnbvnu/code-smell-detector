function isPropertyDefinitionValue(node) {
        const parent = node.parent;
        return parent && parent.type === "PropertyDefinition" && parent.value === node;
    }