function isTypeParameterSymbolDeclaredInContainer(symbol, container) {
                if (symbol.declarations) {
                    for (const decl of symbol.declarations) {
                        if (decl.kind === 165 /* TypeParameter */) {
                            const parent2 = isJSDocTemplateTag(decl.parent) ? getJSDocHost(decl.parent) : decl.parent;
                            if (parent2 === container) {
                                return !(isJSDocTemplateTag(decl.parent) && find(decl.parent.parent.tags, isJSDocTypeAlias));
                            }
                        }
                    }
                }
                return false;
            }