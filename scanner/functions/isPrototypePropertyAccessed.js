function isPrototypePropertyAccessed(identifierNode) {
                return Boolean(identifierNode &&
                    identifierNode.parent &&
                    identifierNode.parent.type === "MemberExpression" &&
                    identifierNode.parent.object === identifierNode &&
                    astUtils.getStaticPropertyName(identifierNode.parent) === "prototype");
            }