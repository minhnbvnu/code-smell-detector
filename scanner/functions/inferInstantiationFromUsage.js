function inferInstantiationFromUsage(type, usage) {
                if (!(getObjectFlags(type) & 4 /* Reference */) || !usage.properties) {
                    return type;
                }
                const generic = type.target;
                const singleTypeParameter = singleOrUndefined(generic.typeParameters);
                if (!singleTypeParameter)
                    return type;
                const types = [];
                usage.properties.forEach((propUsage, name) => {
                    const genericPropertyType = checker.getTypeOfPropertyOfType(generic, name);
                    Debug.assert(!!genericPropertyType, "generic should have all the properties of its reference.");
                    types.push(...inferTypeParameters(genericPropertyType, combineFromUsage(propUsage), singleTypeParameter));
                });
                return builtinConstructors[type.symbol.escapedName](combineTypes(types));
            }