function hasMemberExpressionAssignment(node) {
        switch (node.type) {
            case "ObjectPattern":
                return node.properties.some(prop => {
                    if (prop) {
                        /*
                         * Spread elements have an argument property while
                         * others have a value property. Because different
                         * parsers use different node types for spread elements,
                         * we just check if there is an argument property.
                         */
                        return hasMemberExpressionAssignment(prop.argument || prop.value);
                    }
                    return false;
                });
            case "ArrayPattern":
                return node.elements.some(element => {
                    if (element) {
                        return hasMemberExpressionAssignment(element);
                    }
                    return false;
                });
            case "AssignmentPattern":
                return hasMemberExpressionAssignment(node.left);
            case "MemberExpression":
                return true;
            // no default
        }
        return false;
    }