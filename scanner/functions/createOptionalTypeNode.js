function createOptionalTypeNode(type) {
                const node = createBaseNode(187 /* OptionalType */);
                node.type = parenthesizerRules().parenthesizeTypeOfOptionalType(type);
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }