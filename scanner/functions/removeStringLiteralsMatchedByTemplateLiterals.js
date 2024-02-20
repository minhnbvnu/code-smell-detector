function removeStringLiteralsMatchedByTemplateLiterals(types) {
                const templates = filter(types, (t) => !!(t.flags & 134217728 /* TemplateLiteral */) && isPatternLiteralType(t));
                if (templates.length) {
                    let i = types.length;
                    while (i > 0) {
                        i--;
                        const t = types[i];
                        if (t.flags & 128 /* StringLiteral */ && some(templates, (template) => isTypeMatchedByTemplateLiteralType(t, template))) {
                            orderedRemoveItemAt(types, i);
                        }
                    }
                }
            }