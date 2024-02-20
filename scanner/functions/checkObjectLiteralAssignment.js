function checkObjectLiteralAssignment(node, sourceType, rightIsThis) {
                const properties = node.properties;
                if (strictNullChecks && properties.length === 0) {
                    return checkNonNullType(sourceType, node);
                }
                for (let i = 0; i < properties.length; i++) {
                    checkObjectLiteralDestructuringPropertyAssignment(node, sourceType, i, properties, rightIsThis);
                }
                return sourceType;
            }