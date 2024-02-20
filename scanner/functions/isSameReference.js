function isSameReference(left, right, disableStaticComputedKey = false) {
        if (left.type !== right.type) {
            // Handle `a.b` and `a?.b` are samely.
            if (left.type === "ChainExpression") {
                return isSameReference(left.expression, right, disableStaticComputedKey);
            }
            if (right.type === "ChainExpression") {
                return isSameReference(left, right.expression, disableStaticComputedKey);
            }
            return false;
        }
        switch (left.type) {
            case "Super":
            case "ThisExpression":
                return true;
            case "Identifier":
            case "PrivateIdentifier":
                return left.name === right.name;
            case "Literal":
                return equalLiteralValue(left, right);
            case "ChainExpression":
                return isSameReference(left.expression, right.expression, disableStaticComputedKey);
            case "MemberExpression": {
                if (!disableStaticComputedKey) {
                    const nameA = getStaticPropertyName(left);
                    // x.y = x["y"]
                    if (nameA !== null) {
                        return (isSameReference(left.object, right.object, disableStaticComputedKey) &&
                            nameA === getStaticPropertyName(right));
                    }
                }
                /*
                 * x[0] = x[0]
                 * x[y] = x[y]
                 * x.y = x.y
                 */
                return (left.computed === right.computed &&
                    isSameReference(left.object, right.object, disableStaticComputedKey) &&
                    isSameReference(left.property, right.property, disableStaticComputedKey));
            }
            default:
                return false;
        }
    }