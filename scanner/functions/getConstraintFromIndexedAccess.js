function getConstraintFromIndexedAccess(type) {
                if (isMappedTypeGenericIndexedAccess(type)) {
                    return substituteIndexedMappedType(type.objectType, type.indexType);
                }
                const indexConstraint = getSimplifiedTypeOrConstraint(type.indexType);
                if (indexConstraint && indexConstraint !== type.indexType) {
                    const indexedAccess = getIndexedAccessTypeOrUndefined(type.objectType, indexConstraint, type.accessFlags);
                    if (indexedAccess) {
                        return indexedAccess;
                    }
                }
                const objectConstraint = getSimplifiedTypeOrConstraint(type.objectType);
                if (objectConstraint && objectConstraint !== type.objectType) {
                    return getIndexedAccessTypeOrUndefined(objectConstraint, type.indexType, type.accessFlags);
                }
                return void 0;
            }