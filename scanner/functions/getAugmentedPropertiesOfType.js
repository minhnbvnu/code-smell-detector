function getAugmentedPropertiesOfType(type) {
                type = getApparentType(type);
                const propsByName = createSymbolTable(getPropertiesOfType(type));
                const functionType = getSignaturesOfType(type, 0 /* Call */).length ? globalCallableFunctionType : getSignaturesOfType(type, 1 /* Construct */).length ? globalNewableFunctionType : void 0;
                if (functionType) {
                    forEach(getPropertiesOfType(functionType), (p) => {
                        if (!propsByName.has(p.escapedName)) {
                            propsByName.set(p.escapedName, p);
                        }
                    });
                }
                return getNamedMembers(propsByName);
            }