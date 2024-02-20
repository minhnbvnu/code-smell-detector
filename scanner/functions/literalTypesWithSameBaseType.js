function literalTypesWithSameBaseType(types) {
                let commonBaseType;
                for (const t of types) {
                    if (!(t.flags & 131072 /* Never */)) {
                        const baseType = getBaseTypeOfLiteralType(t);
                        commonBaseType != null ? commonBaseType : commonBaseType = baseType;
                        if (baseType === t || baseType !== commonBaseType) {
                            return false;
                        }
                    }
                }
                return true;
            }