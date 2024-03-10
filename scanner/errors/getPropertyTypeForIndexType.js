function getPropertyTypeForIndexType(originalObjectType, objectType, indexType, fullIndexType, accessNode, accessFlags) {
                var _a2;
                const accessExpression = accessNode && accessNode.kind === 209 /* ElementAccessExpression */ ? accessNode : void 0;
                const propName = accessNode && isPrivateIdentifier(accessNode) ? void 0 : getPropertyNameFromIndex(indexType, accessNode);
                if (propName !== void 0) {
                    if (accessFlags & 256 /* Contextual */) {
                        return getTypeOfPropertyOfContextualType(objectType, propName) || anyType;
                    }
                    const prop = getPropertyOfType(objectType, propName);
                    if (prop) {
                        if (accessFlags & 64 /* ReportDeprecated */ && accessNode && prop.declarations && isDeprecatedSymbol(prop) && isUncalledFunctionReference(accessNode, prop)) {
                            const deprecatedNode = (_a2 = accessExpression == null ? void 0 : accessExpression.argumentExpression) != null ? _a2 : isIndexedAccessTypeNode(accessNode) ? accessNode.indexType : accessNode;
                            addDeprecatedSuggestion(deprecatedNode, prop.declarations, propName);
                        }
                        if (accessExpression) {
                            markPropertyAsReferenced(prop, accessExpression, isSelfTypeAccess(accessExpression.expression, objectType.symbol));
                            if (isAssignmentToReadonlyEntity(accessExpression, prop, getAssignmentTargetKind(accessExpression))) {
                                error(accessExpression.argumentExpression, Diagnostics.Cannot_assign_to_0_because_it_is_a_read_only_property, symbolToString(prop));
                                return void 0;
                            }
                            if (accessFlags & 8 /* CacheSymbol */) {
                                getNodeLinks(accessNode).resolvedSymbol = prop;
                            }
                            if (isThisPropertyAccessInConstructor(accessExpression, prop)) {
                                return autoType;
                            }
                        }
                        const propType = getTypeOfSymbol(prop);
                        return accessExpression && getAssignmentTargetKind(accessExpression) !== 1 /* Definite */ ? getFlowTypeOfReference(accessExpression, propType) : accessNode && isIndexedAccessTypeNode(accessNode) && containsMissingType(propType) ? getUnionType([propType, undefinedType]) : propType;
                    }
                    if (everyType(objectType, isTupleType) && isNumericLiteralName(propName)) {
                        const index = +propName;
                        if (accessNode && everyType(objectType, (t) => !t.target.hasRestElement) && !(accessFlags & 16 /* NoTupleBoundsCheck */)) {
                            const indexNode = getIndexNodeForAccessExpression(accessNode);
                            if (isTupleType(objectType)) {
                                if (index < 0) {
                                    error(indexNode, Diagnostics.A_tuple_type_cannot_be_indexed_with_a_negative_value);
                                    return undefinedType;
                                }
                                error(indexNode, Diagnostics.Tuple_type_0_of_length_1_has_no_element_at_index_2, typeToString(objectType), getTypeReferenceArity(objectType), unescapeLeadingUnderscores(propName));
                            }
                            else {
                                error(indexNode, Diagnostics.Property_0_does_not_exist_on_type_1, unescapeLeadingUnderscores(propName), typeToString(objectType));
                            }
                        }
                        if (index >= 0) {
                            errorIfWritingToReadonlyIndex(getIndexInfoOfType(objectType, numberType));
                            return mapType(objectType, (t) => {
                                const restType = getRestTypeOfTupleType(t) || undefinedType;
                                return accessFlags & 1 /* IncludeUndefined */ ? getUnionType([restType, missingType]) : restType;
                            });
                        }
                    }
                }
                if (!(indexType.flags & 98304 /* Nullable */) && isTypeAssignableToKind(indexType, 402653316 /* StringLike */ | 296 /* NumberLike */ | 12288 /* ESSymbolLike */)) {
                    if (objectType.flags & (1 /* Any */ | 131072 /* Never */)) {
                        return objectType;
                    }
                    const indexInfo = getApplicableIndexInfo(objectType, indexType) || getIndexInfoOfType(objectType, stringType);
                    if (indexInfo) {
                        if (accessFlags & 2 /* NoIndexSignatures */ && indexInfo.keyType !== numberType) {
                            if (accessExpression) {
                                error(accessExpression, Diagnostics.Type_0_cannot_be_used_to_index_type_1, typeToString(indexType), typeToString(originalObjectType));
                            }
                            return void 0;
                        }
                        if (accessNode && indexInfo.keyType === stringType && !isTypeAssignableToKind(indexType, 4 /* String */ | 8 /* Number */)) {
                            const indexNode = getIndexNodeForAccessExpression(accessNode);
                            error(indexNode, Diagnostics.Type_0_cannot_be_used_as_an_index_type, typeToString(indexType));
                            return accessFlags & 1 /* IncludeUndefined */ ? getUnionType([indexInfo.type, missingType]) : indexInfo.type;
                        }
                        errorIfWritingToReadonlyIndex(indexInfo);
                        if (accessFlags & 1 /* IncludeUndefined */ && !(objectType.symbol && objectType.symbol.flags & (256 /* RegularEnum */ | 128 /* ConstEnum */) && (indexType.symbol && indexType.flags & 1024 /* EnumLiteral */ && getParentOfSymbol(indexType.symbol) === objectType.symbol))) {
                            return getUnionType([indexInfo.type, missingType]);
                        }
                        return indexInfo.type;
                    }
                    if (indexType.flags & 131072 /* Never */) {
                        return neverType;
                    }
                    if (isJSLiteralType(objectType)) {
                        return anyType;
                    }
                    if (accessExpression && !isConstEnumObjectType(objectType)) {
                        if (isObjectLiteralType2(objectType)) {
                            if (noImplicitAny && indexType.flags & (128 /* StringLiteral */ | 256 /* NumberLiteral */)) {
                                diagnostics.add(createDiagnosticForNode(accessExpression, Diagnostics.Property_0_does_not_exist_on_type_1, indexType.value, typeToString(objectType)));
                                return undefinedType;
                            }
                            else if (indexType.flags & (8 /* Number */ | 4 /* String */)) {
                                const types = map(objectType.properties, (property) => {
                                    return getTypeOfSymbol(property);
                                });
                                return getUnionType(append(types, undefinedType));
                            }
                        }
                        if (objectType.symbol === globalThisSymbol && propName !== void 0 && globalThisSymbol.exports.has(propName) && globalThisSymbol.exports.get(propName).flags & 418 /* BlockScoped */) {
                            error(accessExpression, Diagnostics.Property_0_does_not_exist_on_type_1, unescapeLeadingUnderscores(propName), typeToString(objectType));
                        }
                        else if (noImplicitAny && !compilerOptions.suppressImplicitAnyIndexErrors && !(accessFlags & 128 /* SuppressNoImplicitAnyError */)) {
                            if (propName !== void 0 && typeHasStaticProperty(propName, objectType)) {
                                const typeName = typeToString(objectType);
                                error(accessExpression, Diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_to_access_the_static_member_2_instead, propName, typeName, typeName + "[" + getTextOfNode(accessExpression.argumentExpression) + "]");
                            }
                            else if (getIndexTypeOfType(objectType, numberType)) {
                                error(accessExpression.argumentExpression, Diagnostics.Element_implicitly_has_an_any_type_because_index_expression_is_not_of_type_number);
                            }
                            else {
                                let suggestion;
                                if (propName !== void 0 && (suggestion = getSuggestionForNonexistentProperty(propName, objectType))) {
                                    if (suggestion !== void 0) {
                                        error(accessExpression.argumentExpression, Diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_2, propName, typeToString(objectType), suggestion);
                                    }
                                }
                                else {
                                    const suggestion2 = getSuggestionForNonexistentIndexSignature(objectType, accessExpression, indexType);
                                    if (suggestion2 !== void 0) {
                                        error(accessExpression, Diagnostics.Element_implicitly_has_an_any_type_because_type_0_has_no_index_signature_Did_you_mean_to_call_1, typeToString(objectType), suggestion2);
                                    }
                                    else {
                                        let errorInfo;
                                        if (indexType.flags & 1024 /* EnumLiteral */) {
                                            errorInfo = chainDiagnosticMessages(
                                            /* details */
                                            void 0, Diagnostics.Property_0_does_not_exist_on_type_1, "[" + typeToString(indexType) + "]", typeToString(objectType));
                                        }
                                        else if (indexType.flags & 8192 /* UniqueESSymbol */) {
                                            const symbolName2 = getFullyQualifiedName(indexType.symbol, accessExpression);
                                            errorInfo = chainDiagnosticMessages(
                                            /* details */
                                            void 0, Diagnostics.Property_0_does_not_exist_on_type_1, "[" + symbolName2 + "]", typeToString(objectType));
                                        }
                                        else if (indexType.flags & 128 /* StringLiteral */) {
                                            errorInfo = chainDiagnosticMessages(
                                            /* details */
                                            void 0, Diagnostics.Property_0_does_not_exist_on_type_1, indexType.value, typeToString(objectType));
                                        }
                                        else if (indexType.flags & 256 /* NumberLiteral */) {
                                            errorInfo = chainDiagnosticMessages(
                                            /* details */
                                            void 0, Diagnostics.Property_0_does_not_exist_on_type_1, indexType.value, typeToString(objectType));
                                        }
                                        else if (indexType.flags & (8 /* Number */ | 4 /* String */)) {
                                            errorInfo = chainDiagnosticMessages(
                                            /* details */
                                            void 0, Diagnostics.No_index_signature_with_a_parameter_of_type_0_was_found_on_type_1, typeToString(indexType), typeToString(objectType));
                                        }
                                        errorInfo = chainDiagnosticMessages(errorInfo, Diagnostics.Element_implicitly_has_an_any_type_because_expression_of_type_0_can_t_be_used_to_index_type_1, typeToString(fullIndexType), typeToString(objectType));
                                        diagnostics.add(createDiagnosticForNodeFromMessageChain(getSourceFileOfNode(accessExpression), accessExpression, errorInfo));
                                    }
                                }
                            }
                        }
                        return void 0;
                    }
                }
                if (isJSLiteralType(objectType)) {
                    return anyType;
                }
                if (accessNode) {
                    const indexNode = getIndexNodeForAccessExpression(accessNode);
                    if (indexType.flags & (128 /* StringLiteral */ | 256 /* NumberLiteral */)) {
                        error(indexNode, Diagnostics.Property_0_does_not_exist_on_type_1, "" + indexType.value, typeToString(objectType));
                    }
                    else if (indexType.flags & (4 /* String */ | 8 /* Number */)) {
                        error(indexNode, Diagnostics.Type_0_has_no_matching_index_signature_for_type_1, typeToString(objectType), typeToString(indexType));
                    }
                    else {
                        error(indexNode, Diagnostics.Type_0_cannot_be_used_as_an_index_type, typeToString(indexType));
                    }
                }
                if (isTypeAny(indexType)) {
                    return indexType;
                }
                return void 0;
                function errorIfWritingToReadonlyIndex(indexInfo) {
                    if (indexInfo && indexInfo.isReadonly && accessExpression && (isAssignmentTarget(accessExpression) || isDeleteTarget(accessExpression))) {
                        error(accessExpression, Diagnostics.Index_signature_in_type_0_only_permits_reading, typeToString(objectType));
                    }
                }
            }