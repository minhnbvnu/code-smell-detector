function isFilteringMappedType(type) {
                const nameType = getNameTypeFromMappedType(type);
                return !!nameType && isTypeAssignableTo(nameType, getTypeParameterFromMappedType(type));
            }