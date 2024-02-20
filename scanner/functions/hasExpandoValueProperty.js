function hasExpandoValueProperty(node, isPrototypeAssignment) {
            return forEach(node.properties, (p) => isPropertyAssignment(p) && isIdentifier(p.name) && p.name.escapedText === "value" && p.initializer && getExpandoInitializer(p.initializer, isPrototypeAssignment));
        }