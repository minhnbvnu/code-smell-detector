function getKeyPropertyName(unionType) {
                const types = unionType.types;
                if (types.length < 10 || getObjectFlags(unionType) & 32768 /* PrimitiveUnion */ || countWhere(types, (t) => !!(t.flags & (524288 /* Object */ | 58982400 /* InstantiableNonPrimitive */))) < 10) {
                    return void 0;
                }
                if (unionType.keyPropertyName === void 0) {
                    const keyPropertyName = forEach(types, (t) => t.flags & (524288 /* Object */ | 58982400 /* InstantiableNonPrimitive */) ? forEach(getPropertiesOfType(t), (p) => isUnitType(getTypeOfSymbol(p)) ? p.escapedName : void 0) : void 0);
                    const mapByKeyProperty = keyPropertyName && mapTypesByKeyProperty(types, keyPropertyName);
                    unionType.keyPropertyName = mapByKeyProperty ? keyPropertyName : "";
                    unionType.constituentMap = mapByKeyProperty;
                }
                return unionType.keyPropertyName.length ? unionType.keyPropertyName : void 0;
            }