function getConstituentTypeForKeyType(unionType, keyType) {
                var _a2;
                const result = (_a2 = unionType.constituentMap) == null ? void 0 : _a2.get(getTypeId(getRegularTypeOfLiteralType(keyType)));
                return result !== unknownType ? result : void 0;
            }