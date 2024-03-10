function checkPropertyAccessExpressionOrQualifiedName(node, left, leftType, right, checkMode) {
                const parentSymbol = getNodeLinks(left).resolvedSymbol;
                const assignmentKind = getAssignmentTargetKind(node);
                const apparentType = getApparentType(assignmentKind !== 0 /* None */ || isMethodAccessForCall(node) ? getWidenedType(leftType) : leftType);
                const isAnyLike = isTypeAny(apparentType) || apparentType === silentNeverType;
                let prop;
                if (isPrivateIdentifier(right)) {
                    if (languageVersion < 99 /* ESNext */) {
                        if (assignmentKind !== 0 /* None */) {
                            checkExternalEmitHelpers(node, 1048576 /* ClassPrivateFieldSet */);
                        }
                        if (assignmentKind !== 1 /* Definite */) {
                            checkExternalEmitHelpers(node, 524288 /* ClassPrivateFieldGet */);
                        }
                    }
                    const lexicallyScopedSymbol = lookupSymbolForPrivateIdentifierDeclaration(right.escapedText, right);
                    if (assignmentKind && lexicallyScopedSymbol && lexicallyScopedSymbol.valueDeclaration && isMethodDeclaration(lexicallyScopedSymbol.valueDeclaration)) {
                        grammarErrorOnNode(right, Diagnostics.Cannot_assign_to_private_method_0_Private_methods_are_not_writable, idText(right));
                    }
                    if (isAnyLike) {
                        if (lexicallyScopedSymbol) {
                            return isErrorType(apparentType) ? errorType : apparentType;
                        }
                        if (!getContainingClass(right)) {
                            grammarErrorOnNode(right, Diagnostics.Private_identifiers_are_not_allowed_outside_class_bodies);
                            return anyType;
                        }
                    }
                    prop = lexicallyScopedSymbol ? getPrivateIdentifierPropertyOfType(leftType, lexicallyScopedSymbol) : void 0;
                    if (!prop && checkPrivateIdentifierPropertyAccess(leftType, right, lexicallyScopedSymbol)) {
                        return errorType;
                    }
                    else {
                        const isSetonlyAccessor = prop && prop.flags & 65536 /* SetAccessor */ && !(prop.flags & 32768 /* GetAccessor */);
                        if (isSetonlyAccessor && assignmentKind !== 1 /* Definite */) {
                            error(node, Diagnostics.Private_accessor_was_defined_without_a_getter);
                        }
                    }
                }
                else {
                    if (isAnyLike) {
                        if (isIdentifier(left) && parentSymbol) {
                            markAliasReferenced(parentSymbol, node);
                        }
                        return isErrorType(apparentType) ? errorType : apparentType;
                    }
                    prop = getPropertyOfType(apparentType, right.escapedText, 
                    /*skipObjectFunctionPropertyAugment*/
                    false, 
                    /*includeTypeOnlyMembers*/
                    node.kind === 163 /* QualifiedName */);
                }
                if (isIdentifier(left) && parentSymbol && (getIsolatedModules(compilerOptions) || !(prop && (isConstEnumOrConstEnumOnlyModule(prop) || prop.flags & 8 /* EnumMember */ && node.parent.kind === 302 /* EnumMember */)) || shouldPreserveConstEnums(compilerOptions) && isExportOrExportExpression(node))) {
                    markAliasReferenced(parentSymbol, node);
                }
                let propType;
                if (!prop) {
                    const indexInfo = !isPrivateIdentifier(right) && (assignmentKind === 0 /* None */ || !isGenericObjectType(leftType) || isThisTypeParameter(leftType)) ? getApplicableIndexInfoForName(apparentType, right.escapedText) : void 0;
                    if (!(indexInfo && indexInfo.type)) {
                        const isUncheckedJS = isUncheckedJSSuggestion(node, leftType.symbol, 
                        /*excludeClasses*/
                        true);
                        if (!isUncheckedJS && isJSLiteralType(leftType)) {
                            return anyType;
                        }
                        if (leftType.symbol === globalThisSymbol) {
                            if (globalThisSymbol.exports.has(right.escapedText) && globalThisSymbol.exports.get(right.escapedText).flags & 418 /* BlockScoped */) {
                                error(right, Diagnostics.Property_0_does_not_exist_on_type_1, unescapeLeadingUnderscores(right.escapedText), typeToString(leftType));
                            }
                            else if (noImplicitAny) {
                                error(right, Diagnostics.Element_implicitly_has_an_any_type_because_type_0_has_no_index_signature, typeToString(leftType));
                            }
                            return anyType;
                        }
                        if (right.escapedText && !checkAndReportErrorForExtendingInterface(node)) {
                            reportNonexistentProperty(right, isThisTypeParameter(leftType) ? apparentType : leftType, isUncheckedJS);
                        }
                        return errorType;
                    }
                    if (indexInfo.isReadonly && (isAssignmentTarget(node) || isDeleteTarget(node))) {
                        error(node, Diagnostics.Index_signature_in_type_0_only_permits_reading, typeToString(apparentType));
                    }
                    propType = compilerOptions.noUncheckedIndexedAccess && !isAssignmentTarget(node) ? getUnionType([indexInfo.type, missingType]) : indexInfo.type;
                    if (compilerOptions.noPropertyAccessFromIndexSignature && isPropertyAccessExpression(node)) {
                        error(right, Diagnostics.Property_0_comes_from_an_index_signature_so_it_must_be_accessed_with_0, unescapeLeadingUnderscores(right.escapedText));
                    }
                    if (indexInfo.declaration && getCombinedNodeFlags(indexInfo.declaration) & 268435456 /* Deprecated */) {
                        addDeprecatedSuggestion(right, [indexInfo.declaration], right.escapedText);
                    }
                }
                else {
                    if (isDeprecatedSymbol(prop) && isUncalledFunctionReference(node, prop) && prop.declarations) {
                        addDeprecatedSuggestion(right, prop.declarations, right.escapedText);
                    }
                    checkPropertyNotUsedBeforeDeclaration(prop, node, right);
                    markPropertyAsReferenced(prop, node, isSelfTypeAccess(left, parentSymbol));
                    getNodeLinks(node).resolvedSymbol = prop;
                    const writing = isWriteAccess(node);
                    checkPropertyAccessibility(node, left.kind === 106 /* SuperKeyword */, writing, apparentType, prop);
                    if (isAssignmentToReadonlyEntity(node, prop, assignmentKind)) {
                        error(right, Diagnostics.Cannot_assign_to_0_because_it_is_a_read_only_property, idText(right));
                        return errorType;
                    }
                    propType = isThisPropertyAccessInConstructor(node, prop) ? autoType : writing ? getWriteTypeOfSymbol(prop) : getTypeOfSymbol(prop);
                }
                return getFlowTypeOfAccessExpression(node, prop, propType, right, checkMode);
            }