function createTypeQueryNode(exprName, typeArguments) {
                const node = createBaseNode(183 /* TypeQuery */);
                node.exprName = exprName;
                node.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(typeArguments);
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }