function reportNonexistentProperty(propNode, containingType, isUncheckedJS) {
                let errorInfo;
                let relatedInfo;
                if (!isPrivateIdentifier(propNode) && containingType.flags & 1048576 /* Union */ && !(containingType.flags & 134348796 /* Primitive */)) {
                    for (const subtype of containingType.types) {
                        if (!getPropertyOfType(subtype, propNode.escapedText) && !getApplicableIndexInfoForName(subtype, propNode.escapedText)) {
                            errorInfo = chainDiagnosticMessages(errorInfo, Diagnostics.Property_0_does_not_exist_on_type_1, declarationNameToString(propNode), typeToString(subtype));
                            break;
                        }
                    }
                }
                if (typeHasStaticProperty(propNode.escapedText, containingType)) {
                    const propName = declarationNameToString(propNode);
                    const typeName = typeToString(containingType);
                    errorInfo = chainDiagnosticMessages(errorInfo, Diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_to_access_the_static_member_2_instead, propName, typeName, typeName + "." + propName);
                }
                else {
                    const promisedType = getPromisedTypeOfPromise(containingType);
                    if (promisedType && getPropertyOfType(promisedType, propNode.escapedText)) {
                        errorInfo = chainDiagnosticMessages(errorInfo, Diagnostics.Property_0_does_not_exist_on_type_1, declarationNameToString(propNode), typeToString(containingType));
                        relatedInfo = createDiagnosticForNode(propNode, Diagnostics.Did_you_forget_to_use_await);
                    }
                    else {
                        const missingProperty = declarationNameToString(propNode);
                        const container = typeToString(containingType);
                        const libSuggestion = getSuggestedLibForNonExistentProperty(missingProperty, containingType);
                        if (libSuggestion !== void 0) {
                            errorInfo = chainDiagnosticMessages(errorInfo, Diagnostics.Property_0_does_not_exist_on_type_1_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_2_or_later, missingProperty, container, libSuggestion);
                        }
                        else {
                            const suggestion = getSuggestedSymbolForNonexistentProperty(propNode, containingType);
                            if (suggestion !== void 0) {
                                const suggestedName = symbolName(suggestion);
                                const message = isUncheckedJS ? Diagnostics.Property_0_may_not_exist_on_type_1_Did_you_mean_2 : Diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_2;
                                errorInfo = chainDiagnosticMessages(errorInfo, message, missingProperty, container, suggestedName);
                                relatedInfo = suggestion.valueDeclaration && createDiagnosticForNode(suggestion.valueDeclaration, Diagnostics._0_is_declared_here, suggestedName);
                            }
                            else {
                                const diagnostic = containerSeemsToBeEmptyDomElement(containingType) ? Diagnostics.Property_0_does_not_exist_on_type_1_Try_changing_the_lib_compiler_option_to_include_dom : Diagnostics.Property_0_does_not_exist_on_type_1;
                                errorInfo = chainDiagnosticMessages(elaborateNeverIntersection(errorInfo, containingType), diagnostic, missingProperty, container);
                            }
                        }
                    }
                }
                const resultDiagnostic = createDiagnosticForNodeFromMessageChain(getSourceFileOfNode(propNode), propNode, errorInfo);
                if (relatedInfo) {
                    addRelatedInfo(resultDiagnostic, relatedInfo);
                }
                addErrorOrSuggestion(!isUncheckedJS || errorInfo.code !== Diagnostics.Property_0_may_not_exist_on_type_1_Did_you_mean_2.code, resultDiagnostic);
            }