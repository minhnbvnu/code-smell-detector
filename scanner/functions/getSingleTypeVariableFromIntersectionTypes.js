function getSingleTypeVariableFromIntersectionTypes(types) {
                    let typeVariable;
                    for (const type of types) {
                        const t = type.flags & 2097152 /* Intersection */ && find(type.types, (t2) => !!getInferenceInfoForType(t2));
                        if (!t || typeVariable && t !== typeVariable) {
                            return void 0;
                        }
                        typeVariable = t;
                    }
                    return typeVariable;
                }