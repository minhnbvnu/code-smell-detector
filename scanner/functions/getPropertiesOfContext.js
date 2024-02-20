function getPropertiesOfContext(context) {
                if (!context.resolvedProperties) {
                    const names = /* @__PURE__ */ new Map();
                    for (const t of getSiblingsOfContext(context)) {
                        if (isObjectLiteralType2(t) && !(getObjectFlags(t) & 2097152 /* ContainsSpread */)) {
                            for (const prop of getPropertiesOfType(t)) {
                                names.set(prop.escapedName, prop);
                            }
                        }
                    }
                    context.resolvedProperties = arrayFrom(names.values());
                }
                return context.resolvedProperties;
            }