function accessesSingleProperty(node) {
                if (!isStrict && isInsideWithBlock(node)) {
                    return node.type === "Identifier";
                }
                return node.type === "MemberExpression" &&
                    baseTypes.has(node.object.type) &&
                    (!node.computed || (node.property.type !== "MemberExpression" && node.property.type !== "ChainExpression"));
            }