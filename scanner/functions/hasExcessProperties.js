function hasExcessProperties(source2, target2, reportErrors2) {
                    var _a3;
                    if (!isExcessPropertyCheckTarget(target2) || !noImplicitAny && getObjectFlags(target2) & 4096 /* JSLiteral */) {
                        return false;
                    }
                    const isComparingJsxAttributes = !!(getObjectFlags(source2) & 2048 /* JsxAttributes */);
                    if ((relation === assignableRelation || relation === comparableRelation) && (isTypeSubsetOf(globalObjectType, target2) || !isComparingJsxAttributes && isEmptyObjectType(target2))) {
                        return false;
                    }
                    let reducedTarget = target2;
                    let checkTypes;
                    if (target2.flags & 1048576 /* Union */) {
                        reducedTarget = findMatchingDiscriminantType(source2, target2, isRelatedTo) || filterPrimitivesIfContainsNonPrimitive(target2);
                        checkTypes = reducedTarget.flags & 1048576 /* Union */ ? reducedTarget.types : [reducedTarget];
                    }
                    for (const prop of getPropertiesOfType(source2)) {
                        if (shouldCheckAsExcessProperty(prop, source2.symbol) && !isIgnoredJsxProperty(source2, prop)) {
                            if (!isKnownProperty(reducedTarget, prop.escapedName, isComparingJsxAttributes)) {
                                if (reportErrors2) {
                                    const errorTarget = filterType(reducedTarget, isExcessPropertyCheckTarget);
                                    if (!errorNode)
                                        return Debug.fail();
                                    if (isJsxAttributes(errorNode) || isJsxOpeningLikeElement(errorNode) || isJsxOpeningLikeElement(errorNode.parent)) {
                                        if (prop.valueDeclaration && isJsxAttribute(prop.valueDeclaration) && getSourceFileOfNode(errorNode) === getSourceFileOfNode(prop.valueDeclaration.name)) {
                                            errorNode = prop.valueDeclaration.name;
                                        }
                                        const propName = symbolToString(prop);
                                        const suggestionSymbol = getSuggestedSymbolForNonexistentJSXAttribute(propName, errorTarget);
                                        const suggestion = suggestionSymbol ? symbolToString(suggestionSymbol) : void 0;
                                        if (suggestion) {
                                            reportError(Diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_2, propName, typeToString(errorTarget), suggestion);
                                        }
                                        else {
                                            reportError(Diagnostics.Property_0_does_not_exist_on_type_1, propName, typeToString(errorTarget));
                                        }
                                    }
                                    else {
                                        const objectLiteralDeclaration = ((_a3 = source2.symbol) == null ? void 0 : _a3.declarations) && firstOrUndefined(source2.symbol.declarations);
                                        let suggestion;
                                        if (prop.valueDeclaration && findAncestor(prop.valueDeclaration, (d) => d === objectLiteralDeclaration) && getSourceFileOfNode(objectLiteralDeclaration) === getSourceFileOfNode(errorNode)) {
                                            const propDeclaration = prop.valueDeclaration;
                                            Debug.assertNode(propDeclaration, isObjectLiteralElementLike);
                                            errorNode = propDeclaration;
                                            const name = propDeclaration.name;
                                            if (isIdentifier(name)) {
                                                suggestion = getSuggestionForNonexistentProperty(name, errorTarget);
                                            }
                                        }
                                        if (suggestion !== void 0) {
                                            reportError(Diagnostics.Object_literal_may_only_specify_known_properties_but_0_does_not_exist_in_type_1_Did_you_mean_to_write_2, symbolToString(prop), typeToString(errorTarget), suggestion);
                                        }
                                        else {
                                            reportError(Diagnostics.Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1, symbolToString(prop), typeToString(errorTarget));
                                        }
                                    }
                                }
                                return true;
                            }
                            if (checkTypes && !isRelatedTo(getTypeOfSymbol(prop), getTypeOfPropertyInTypes(checkTypes, prop.escapedName), 3 /* Both */, reportErrors2)) {
                                if (reportErrors2) {
                                    reportIncompatibleError(Diagnostics.Types_of_property_0_are_incompatible, symbolToString(prop));
                                }
                                return true;
                            }
                        }
                    }
                    return false;
                }