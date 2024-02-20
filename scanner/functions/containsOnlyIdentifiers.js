function containsOnlyIdentifiers(node) {
                if (node.type === "Identifier") {
                    return true;
                }
                if (node.type === "MemberExpression") {
                    if (node.object.type === "Identifier") {
                        return true;
                    }
                    if (node.object.type === "MemberExpression") {
                        return containsOnlyIdentifiers(node.object);
                    }
                }
                return false;
            }