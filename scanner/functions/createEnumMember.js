function createEnumMember(name, initializer) {
                const node = createBaseDeclaration(302 /* EnumMember */);
                node.name = asName(name);
                node.initializer = initializer && parenthesizerRules().parenthesizeExpressionForDisallowedComma(initializer);
                node.transformFlags |= propagateChildFlags(node.name) | propagateChildFlags(node.initializer) | 1 /* ContainsTypeScript */;
                node.jsDoc = void 0;
                return node;
            }