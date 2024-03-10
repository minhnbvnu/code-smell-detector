function invocationErrorDetails(errorTarget, apparentType, kind) {
                let errorInfo;
                const isCall = kind === 0 /* Call */;
                const awaitedType = getAwaitedType(apparentType);
                const maybeMissingAwait = awaitedType && getSignaturesOfType(awaitedType, kind).length > 0;
                if (apparentType.flags & 1048576 /* Union */) {
                    const types = apparentType.types;
                    let hasSignatures = false;
                    for (const constituent of types) {
                        const signatures = getSignaturesOfType(constituent, kind);
                        if (signatures.length !== 0) {
                            hasSignatures = true;
                            if (errorInfo) {
                                break;
                            }
                        }
                        else {
                            if (!errorInfo) {
                                errorInfo = chainDiagnosticMessages(errorInfo, isCall ? Diagnostics.Type_0_has_no_call_signatures : Diagnostics.Type_0_has_no_construct_signatures, typeToString(constituent));
                                errorInfo = chainDiagnosticMessages(errorInfo, isCall ? Diagnostics.Not_all_constituents_of_type_0_are_callable : Diagnostics.Not_all_constituents_of_type_0_are_constructable, typeToString(apparentType));
                            }
                            if (hasSignatures) {
                                break;
                            }
                        }
                    }
                    if (!hasSignatures) {
                        errorInfo = chainDiagnosticMessages(
                        /* detials */
                        void 0, isCall ? Diagnostics.No_constituent_of_type_0_is_callable : Diagnostics.No_constituent_of_type_0_is_constructable, typeToString(apparentType));
                    }
                    if (!errorInfo) {
                        errorInfo = chainDiagnosticMessages(errorInfo, isCall ? Diagnostics.Each_member_of_the_union_type_0_has_signatures_but_none_of_those_signatures_are_compatible_with_each_other : Diagnostics.Each_member_of_the_union_type_0_has_construct_signatures_but_none_of_those_signatures_are_compatible_with_each_other, typeToString(apparentType));
                    }
                }
                else {
                    errorInfo = chainDiagnosticMessages(errorInfo, isCall ? Diagnostics.Type_0_has_no_call_signatures : Diagnostics.Type_0_has_no_construct_signatures, typeToString(apparentType));
                }
                let headMessage = isCall ? Diagnostics.This_expression_is_not_callable : Diagnostics.This_expression_is_not_constructable;
                if (isCallExpression(errorTarget.parent) && errorTarget.parent.arguments.length === 0) {
                    const { resolvedSymbol } = getNodeLinks(errorTarget);
                    if (resolvedSymbol && resolvedSymbol.flags & 32768 /* GetAccessor */) {
                        headMessage = Diagnostics.This_expression_is_not_callable_because_it_is_a_get_accessor_Did_you_mean_to_use_it_without;
                    }
                }
                return {
                    messageChain: chainDiagnosticMessages(errorInfo, headMessage),
                    relatedMessage: maybeMissingAwait ? Diagnostics.Did_you_forget_to_use_await : void 0
                };
            }