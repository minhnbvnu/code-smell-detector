function createTypeReferenceNode(typeName, typeArguments) {
                const node = createBaseNode(180 /* TypeReference */);
                node.typeName = asName(typeName);
                node.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(createNodeArray(typeArguments));
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }