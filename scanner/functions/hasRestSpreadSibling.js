function hasRestSpreadSibling(variable) {
                    if (options.ignoreRestSiblings) {
                        const hasRestSiblingDefinition = variable.defs.some(def => hasRestSibling(def.name.parent));
                        const hasRestSiblingReference = variable.references.some(ref => hasRestSibling(ref.identifier.parent));
                        return hasRestSiblingDefinition || hasRestSiblingReference;
                    }
                    return false;
                }