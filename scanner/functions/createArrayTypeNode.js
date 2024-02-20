function createArrayTypeNode(elementType) {
                const node = createBaseNode(185 /* ArrayType */);
                node.elementType = parenthesizerRules().parenthesizeNonArrayTypeOfPostfixType(elementType);
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }