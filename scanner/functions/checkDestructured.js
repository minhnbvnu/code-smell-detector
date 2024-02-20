function checkDestructured(node) {
                if (ignoreDestructuring) {
                    return;
                }
                for (const property of node.properties) {
                    /**
                     * Properties using shorthand syntax and rest elements can not be renamed.
                     * If the property is computed, we have no idea if a rename is useless or not.
                     */
                    if (property.type !== "Property" || property.shorthand || property.computed) {
                        continue;
                    }
                    const key = (property.key.type === "Identifier" && property.key.name) || (property.key.type === "Literal" && property.key.value);
                    const renamedKey = property.value.type === "AssignmentPattern" ? property.value.left.name : property.value.name;
                    if (key === renamedKey) {
                        reportError(property, property.key, "Destructuring assignment");
                    }
                }
            }