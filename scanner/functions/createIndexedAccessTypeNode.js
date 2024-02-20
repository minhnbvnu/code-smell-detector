function createIndexedAccessTypeNode(objectType, indexType) {
                const node = createBaseNode(196 /* IndexedAccessType */);
                node.objectType = parenthesizerRules().parenthesizeNonArrayTypeOfPostfixType(objectType);
                node.indexType = indexType;
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }