function isThisConstructorReference(node) {
                return node.object.type === "MemberExpression" &&
                    node.object.property.name === "constructor" &&
                    node.object.object.type === "ThisExpression";
            }