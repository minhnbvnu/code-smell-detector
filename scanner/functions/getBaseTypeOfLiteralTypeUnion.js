function getBaseTypeOfLiteralTypeUnion(type) {
                var _a2;
                const key = `B${getTypeId(type)}`;
                return (_a2 = getCachedType(key)) != null ? _a2 : setCachedType(key, mapType(type, getBaseTypeOfLiteralType));
            }