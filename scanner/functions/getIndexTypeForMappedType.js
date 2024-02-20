function getIndexTypeForMappedType(type, stringsOnly, noIndexSignatures) {
                const typeParameter = getTypeParameterFromMappedType(type);
                const constraintType = getConstraintTypeFromMappedType(type);
                const nameType = getNameTypeFromMappedType(type.target || type);
                if (!nameType && !noIndexSignatures) {
                    return constraintType;
                }
                const keyTypes = [];
                if (isMappedTypeWithKeyofConstraintDeclaration(type)) {
                    if (!isGenericIndexType(constraintType)) {
                        const modifiersType = getApparentType(getModifiersTypeFromMappedType(type));
                        forEachMappedTypePropertyKeyTypeAndIndexSignatureKeyType(modifiersType, 8576 /* StringOrNumberLiteralOrUnique */, stringsOnly, addMemberForKeyType);
                    }
                    else {
                        return getIndexTypeForGenericType(type, stringsOnly);
                    }
                }
                else {
                    forEachType(getLowerBoundOfKeyType(constraintType), addMemberForKeyType);
                }
                if (isGenericIndexType(constraintType)) {
                    forEachType(constraintType, addMemberForKeyType);
                }
                const result = noIndexSignatures ? filterType(getUnionType(keyTypes), (t) => !(t.flags & (1 /* Any */ | 4 /* String */))) : getUnionType(keyTypes);
                if (result.flags & 1048576 /* Union */ && constraintType.flags & 1048576 /* Union */ && getTypeListId(result.types) === getTypeListId(constraintType.types)) {
                    return constraintType;
                }
                return result;
                function addMemberForKeyType(keyType) {
                    const propNameType = nameType ? instantiateType(nameType, appendTypeMapping(type.mapper, typeParameter, keyType)) : keyType;
                    keyTypes.push(propNameType === stringType ? stringOrNumberType : propNameType);
                }
            }