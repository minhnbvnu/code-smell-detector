function getUnionOrIntersectionProperty(type, name, skipObjectFunctionPropertyAugment) {
                var _a2, _b;
                let property = ((_a2 = type.propertyCacheWithoutObjectFunctionPropertyAugment) == null ? void 0 : _a2.get(name)) || !skipObjectFunctionPropertyAugment ? (_b = type.propertyCache) == null ? void 0 : _b.get(name) : void 0;
                if (!property) {
                    property = createUnionOrIntersectionProperty(type, name, skipObjectFunctionPropertyAugment);
                    if (property) {
                        const properties = skipObjectFunctionPropertyAugment ? type.propertyCacheWithoutObjectFunctionPropertyAugment || (type.propertyCacheWithoutObjectFunctionPropertyAugment = createSymbolTable()) : type.propertyCache || (type.propertyCache = createSymbolTable());
                        properties.set(name, property);
                    }
                }
                return property;
            }