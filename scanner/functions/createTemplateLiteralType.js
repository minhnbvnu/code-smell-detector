function createTemplateLiteralType(texts, types) {
                const type = createType(134217728 /* TemplateLiteral */);
                type.texts = texts;
                type.types = types;
                return type;
            }