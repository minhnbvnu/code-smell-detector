function getIndexedAccessTypeOrUndefined(objectType, indexType, accessFlags = 0 /* None */, accessNode, aliasSymbol, aliasTypeArguments) {
                if (objectType === wildcardType || indexType === wildcardType) {
                    return wildcardType;
                }
                if (isStringIndexSignatureOnlyType(objectType) && !(indexType.flags & 98304 /* Nullable */) && isTypeAssignableToKind(indexType, 4 /* String */ | 8 /* Number */)) {
                    indexType = stringType;
                }
                if (compilerOptions.noUncheckedIndexedAccess && accessFlags & 32 /* ExpressionPosition */)
                    accessFlags |= 1 /* IncludeUndefined */;
                if (isGenericIndexType(indexType) || (accessNode && accessNode.kind !== 196 /* IndexedAccessType */ ? isGenericTupleType(objectType) && !indexTypeLessThan(indexType, objectType.target.fixedLength) : isGenericObjectType(objectType) && !(isTupleType(objectType) && indexTypeLessThan(indexType, objectType.target.fixedLength)))) {
                    if (objectType.flags & 3 /* AnyOrUnknown */) {
                        return objectType;
                    }
                    const persistentAccessFlags = accessFlags & 1 /* Persistent */;
                    const id = objectType.id + "," + indexType.id + "," + persistentAccessFlags + getAliasId(aliasSymbol, aliasTypeArguments);
                    let type = indexedAccessTypes.get(id);
                    if (!type) {
                        indexedAccessTypes.set(id, type = createIndexedAccessType(objectType, indexType, persistentAccessFlags, aliasSymbol, aliasTypeArguments));
                    }
                    return type;
                }
                const apparentObjectType = getReducedApparentType(objectType);
                if (indexType.flags & 1048576 /* Union */ && !(indexType.flags & 16 /* Boolean */)) {
                    const propTypes = [];
                    let wasMissingProp = false;
                    for (const t of indexType.types) {
                        const propType = getPropertyTypeForIndexType(objectType, apparentObjectType, t, indexType, accessNode, accessFlags | (wasMissingProp ? 128 /* SuppressNoImplicitAnyError */ : 0));
                        if (propType) {
                            propTypes.push(propType);
                        }
                        else if (!accessNode) {
                            return void 0;
                        }
                        else {
                            wasMissingProp = true;
                        }
                    }
                    if (wasMissingProp) {
                        return void 0;
                    }
                    return accessFlags & 4 /* Writing */ ? getIntersectionType(propTypes, aliasSymbol, aliasTypeArguments) : getUnionType(propTypes, 1 /* Literal */, aliasSymbol, aliasTypeArguments);
                }
                return getPropertyTypeForIndexType(objectType, apparentObjectType, indexType, indexType, accessNode, accessFlags | 8 /* CacheSymbol */ | 64 /* ReportDeprecated */);
            }