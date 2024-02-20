function substituteIndexedMappedType(objectType, index) {
                const mapper = createTypeMapper([getTypeParameterFromMappedType(objectType)], [index]);
                const templateMapper = combineTypeMappers(objectType.mapper, mapper);
                return instantiateType(getTemplateTypeFromMappedType(objectType.target || objectType), templateMapper);
            }