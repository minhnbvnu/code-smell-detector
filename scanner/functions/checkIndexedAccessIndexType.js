function checkIndexedAccessIndexType(type, accessNode) {
                if (!(type.flags & 8388608 /* IndexedAccess */)) {
                    return type;
                }
                const objectType = type.objectType;
                const indexType = type.indexType;
                if (isTypeAssignableTo(indexType, getIndexType(objectType, 
                /*stringsOnly*/
                false))) {
                    if (accessNode.kind === 209 /* ElementAccessExpression */ && isAssignmentTarget(accessNode) && getObjectFlags(objectType) & 32 /* Mapped */ && getMappedTypeModifiers(objectType) & 1 /* IncludeReadonly */) {
                        error(accessNode, Diagnostics.Index_signature_in_type_0_only_permits_reading, typeToString(objectType));
                    }
                    return type;
                }
                const apparentObjectType = getApparentType(objectType);
                if (getIndexInfoOfType(apparentObjectType, numberType) && isTypeAssignableToKind(indexType, 296 /* NumberLike */)) {
                    return type;
                }
                if (isGenericObjectType(objectType)) {
                    const propertyName = getPropertyNameFromIndex(indexType, accessNode);
                    if (propertyName) {
                        const propertySymbol = forEachType(apparentObjectType, (t) => getPropertyOfType(t, propertyName));
                        if (propertySymbol && getDeclarationModifierFlagsFromSymbol(propertySymbol) & 24 /* NonPublicAccessibilityModifier */) {
                            error(accessNode, Diagnostics.Private_or_protected_member_0_cannot_be_accessed_on_a_type_parameter, unescapeLeadingUnderscores(propertyName));
                            return errorType;
                        }
                    }
                }
                error(accessNode, Diagnostics.Type_0_cannot_be_used_to_index_type_1, typeToString(indexType), typeToString(objectType));
                return errorType;
            }