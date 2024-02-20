function getNonInheritedProperties(type, baseTypes, properties) {
                if (!length(baseTypes)) {
                    return properties;
                }
                const seen = /* @__PURE__ */ new Map();
                forEach(properties, (p) => {
                    seen.set(p.escapedName, p);
                });
                for (const base of baseTypes) {
                    const properties2 = getPropertiesOfType(getTypeWithThisArgument(base, type.thisType));
                    for (const prop of properties2) {
                        const existing = seen.get(prop.escapedName);
                        if (existing && prop.parent === existing.parent) {
                            seen.delete(prop.escapedName);
                        }
                    }
                }
                return arrayFrom(seen.values());
            }