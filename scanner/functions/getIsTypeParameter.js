function getIsTypeParameter(typeParameters) {
                if (typeParameters === undefined) {
                    return (() => false);
                }
                const set = new Set();
                for (const t of typeParameters.params) {
                    set.add(t.name.name);
                }
                return (typeName => set.has(typeName));
            }