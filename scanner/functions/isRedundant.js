function isRedundant(property) {
                const value = property.value;
                if (value.type === "FunctionExpression") {
                    return !value.id; // Only anonymous should be shorthand method.
                }
                if (value.type === "Identifier") {
                    return astUtils.getStaticPropertyName(property) === value.name;
                }
                return false;
            }