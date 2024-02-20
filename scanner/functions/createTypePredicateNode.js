function createTypePredicateNode(assertsModifier, parameterName, type) {
                const node = createBaseNode(179 /* TypePredicate */);
                node.assertsModifier = assertsModifier;
                node.parameterName = asName(parameterName);
                node.type = type;
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }