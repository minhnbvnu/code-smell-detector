function typeIsOrHasBaseType(type, parentType) {
        const parentSymbol = parentType.getSymbol();
        if (!type.getSymbol() || !parentSymbol) {
            return false;
        }
        const typeAndBaseTypes = [type];
        const ancestorTypes = type.getBaseTypes();
        if (ancestorTypes) {
            typeAndBaseTypes.push(...ancestorTypes);
        }
        for (const baseType of typeAndBaseTypes) {
            const baseSymbol = baseType.getSymbol();
            if (baseSymbol && baseSymbol.name === parentSymbol.name) {
                return true;
            }
        }
        return false;
    }