function isClassFieldInitialValue(fullNumberNode) {
                const parent = fullNumberNode.parent;
                return parent.type === "PropertyDefinition" && parent.value === fullNumberNode;
            }