function getMatchingUnionConstituentForObjectLiteral(unionType, node) {
                const keyPropertyName = getKeyPropertyName(unionType);
                const propNode = keyPropertyName && find(node.properties, (p) => p.symbol && p.kind === 299 /* PropertyAssignment */ && p.symbol.escapedName === keyPropertyName && isPossiblyDiscriminantValue(p.initializer));
                const propType = propNode && getContextFreeTypeOfExpression(propNode.initializer);
                return propType && getConstituentTypeForKeyType(unionType, propType);
            }