function transformTypeOfMembers(type, f) {
                const members = createSymbolTable();
                for (const property of getPropertiesOfObjectType(type)) {
                    const original = getTypeOfSymbol(property);
                    const updated = f(original);
                    members.set(property.escapedName, updated === original ? property : createSymbolWithType(property, updated));
                }
                return members;
            }