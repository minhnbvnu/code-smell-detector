function elaborateJsxComponents(node, source, target, relation, containingMessageChain, errorOutputContainer) {
                let result = elaborateElementwise(generateJsxAttributes(node), source, target, relation, containingMessageChain, errorOutputContainer);
                let invalidTextDiagnostic;
                if (isJsxOpeningElement(node.parent) && isJsxElement(node.parent.parent)) {
                    const containingElement = node.parent.parent;
                    const childPropName = getJsxElementChildrenPropertyName(getJsxNamespaceAt(node));
                    const childrenPropName = childPropName === void 0 ? "children" : unescapeLeadingUnderscores(childPropName);
                    const childrenNameType = getStringLiteralType(childrenPropName);
                    const childrenTargetType = getIndexedAccessType(target, childrenNameType);
                    const validChildren = getSemanticJsxChildren(containingElement.children);
                    if (!length(validChildren)) {
                        return result;
                    }
                    const moreThanOneRealChildren = length(validChildren) > 1;
                    let arrayLikeTargetParts;
                    let nonArrayLikeTargetParts;
                    const iterableType = getGlobalIterableType(
                    /*reportErrors*/
                    false);
                    if (iterableType !== emptyGenericType) {
                        const anyIterable = createIterableType(anyType);
                        arrayLikeTargetParts = filterType(childrenTargetType, (t) => isTypeAssignableTo(t, anyIterable));
                        nonArrayLikeTargetParts = filterType(childrenTargetType, (t) => !isTypeAssignableTo(t, anyIterable));
                    }
                    else {
                        arrayLikeTargetParts = filterType(childrenTargetType, isArrayOrTupleLikeType);
                        nonArrayLikeTargetParts = filterType(childrenTargetType, (t) => !isArrayOrTupleLikeType(t));
                    }
                    if (moreThanOneRealChildren) {
                        if (arrayLikeTargetParts !== neverType) {
                            const realSource = createTupleType(checkJsxChildren(containingElement, 0 /* Normal */));
                            const children = generateJsxChildren(containingElement, getInvalidTextualChildDiagnostic);
                            result = elaborateIterableOrArrayLikeTargetElementwise(children, realSource, arrayLikeTargetParts, relation, containingMessageChain, errorOutputContainer) || result;
                        }
                        else if (!isTypeRelatedTo(getIndexedAccessType(source, childrenNameType), childrenTargetType, relation)) {
                            result = true;
                            const diag2 = error(containingElement.openingElement.tagName, Diagnostics.This_JSX_tag_s_0_prop_expects_a_single_child_of_type_1_but_multiple_children_were_provided, childrenPropName, typeToString(childrenTargetType));
                            if (errorOutputContainer && errorOutputContainer.skipLogging) {
                                (errorOutputContainer.errors || (errorOutputContainer.errors = [])).push(diag2);
                            }
                        }
                    }
                    else {
                        if (nonArrayLikeTargetParts !== neverType) {
                            const child = validChildren[0];
                            const elem = getElaborationElementForJsxChild(child, childrenNameType, getInvalidTextualChildDiagnostic);
                            if (elem) {
                                result = elaborateElementwise(function* () {
                                    yield elem;
                                }(), source, target, relation, containingMessageChain, errorOutputContainer) || result;
                            }
                        }
                        else if (!isTypeRelatedTo(getIndexedAccessType(source, childrenNameType), childrenTargetType, relation)) {
                            result = true;
                            const diag2 = error(containingElement.openingElement.tagName, Diagnostics.This_JSX_tag_s_0_prop_expects_type_1_which_requires_multiple_children_but_only_a_single_child_was_provided, childrenPropName, typeToString(childrenTargetType));
                            if (errorOutputContainer && errorOutputContainer.skipLogging) {
                                (errorOutputContainer.errors || (errorOutputContainer.errors = [])).push(diag2);
                            }
                        }
                    }
                }
                return result;
                function getInvalidTextualChildDiagnostic() {
                    if (!invalidTextDiagnostic) {
                        const tagNameText = getTextOfNode(node.parent.tagName);
                        const childPropName = getJsxElementChildrenPropertyName(getJsxNamespaceAt(node));
                        const childrenPropName = childPropName === void 0 ? "children" : unescapeLeadingUnderscores(childPropName);
                        const childrenTargetType = getIndexedAccessType(target, getStringLiteralType(childrenPropName));
                        const diagnostic = Diagnostics._0_components_don_t_accept_text_as_child_elements_Text_in_JSX_has_the_type_string_but_the_expected_type_of_1_is_2;
                        invalidTextDiagnostic = { ...diagnostic, key: "!!ALREADY FORMATTED!!", message: formatMessage(
                            /*_dummy*/
                            void 0, diagnostic, tagNameText, childrenPropName, typeToString(childrenTargetType)) };
                    }
                    return invalidTextDiagnostic;
                }
            }