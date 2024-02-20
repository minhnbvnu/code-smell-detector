function createTemplateLiteralTypeSpan(type, literal) {
                const node = createBaseNode(201 /* TemplateLiteralTypeSpan */);
                node.type = type;
                node.literal = literal;
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }