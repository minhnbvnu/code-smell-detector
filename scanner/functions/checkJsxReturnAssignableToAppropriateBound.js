function checkJsxReturnAssignableToAppropriateBound(refKind, elemInstanceType, openingLikeElement) {
                if (refKind === 1 /* Function */) {
                    const sfcReturnConstraint = getJsxStatelessElementTypeAt(openingLikeElement);
                    if (sfcReturnConstraint) {
                        checkTypeRelatedTo(elemInstanceType, sfcReturnConstraint, assignableRelation, openingLikeElement.tagName, Diagnostics.Its_return_type_0_is_not_a_valid_JSX_element, generateInitialErrorChain);
                    }
                }
                else if (refKind === 0 /* Component */) {
                    const classConstraint = getJsxElementClassTypeAt(openingLikeElement);
                    if (classConstraint) {
                        checkTypeRelatedTo(elemInstanceType, classConstraint, assignableRelation, openingLikeElement.tagName, Diagnostics.Its_instance_type_0_is_not_a_valid_JSX_element, generateInitialErrorChain);
                    }
                }
                else {
                    const sfcReturnConstraint = getJsxStatelessElementTypeAt(openingLikeElement);
                    const classConstraint = getJsxElementClassTypeAt(openingLikeElement);
                    if (!sfcReturnConstraint || !classConstraint) {
                        return;
                    }
                    const combined = getUnionType([sfcReturnConstraint, classConstraint]);
                    checkTypeRelatedTo(elemInstanceType, combined, assignableRelation, openingLikeElement.tagName, Diagnostics.Its_element_type_0_is_not_a_valid_JSX_element, generateInitialErrorChain);
                }
                function generateInitialErrorChain() {
                    const componentName = getTextOfNode(openingLikeElement.tagName);
                    return chainDiagnosticMessages(
                    /* details */
                    void 0, Diagnostics._0_cannot_be_used_as_a_JSX_component, componentName);
                }
            }