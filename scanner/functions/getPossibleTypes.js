function getPossibleTypes(parsedSelector) {
        switch (parsedSelector.type) {
            case "identifier":
                return [parsedSelector.value];
            case "matches": {
                const typesForComponents = parsedSelector.selectors.map(getPossibleTypes);
                if (typesForComponents.every(Boolean)) {
                    return union(...typesForComponents);
                }
                return null;
            }
            case "compound": {
                const typesForComponents = parsedSelector.selectors.map(getPossibleTypes).filter(typesForComponent => typesForComponent);
                // If all of the components could match any type, then the compound could also match any type.
                if (!typesForComponents.length) {
                    return null;
                }
                /*
                 * If at least one of the components could only match a particular type, the compound could only match
                 * the intersection of those types.
                 */
                return intersection(...typesForComponents);
            }
            case "child":
            case "descendant":
            case "sibling":
            case "adjacent":
                return getPossibleTypes(parsedSelector.right);
            case "class":
                if (parsedSelector.name === "function") {
                    return ["FunctionDeclaration", "FunctionExpression", "ArrowFunctionExpression"];
                }
                return null;
            default:
                return null;
        }
    }