function getAwaitedTypeNoAlias(type, errorNode, diagnosticMessage, arg0) {
                if (isTypeAny(type)) {
                    return type;
                }
                if (isAwaitedTypeInstantiation(type)) {
                    return type;
                }
                const typeAsAwaitable = type;
                if (typeAsAwaitable.awaitedTypeOfType) {
                    return typeAsAwaitable.awaitedTypeOfType;
                }
                if (type.flags & 1048576 /* Union */) {
                    if (awaitedTypeStack.lastIndexOf(type.id) >= 0) {
                        if (errorNode) {
                            error(errorNode, Diagnostics.Type_is_referenced_directly_or_indirectly_in_the_fulfillment_callback_of_its_own_then_method);
                        }
                        return void 0;
                    }
                    const mapper = errorNode ? (constituentType) => getAwaitedTypeNoAlias(constituentType, errorNode, diagnosticMessage, arg0) : getAwaitedTypeNoAlias;
                    awaitedTypeStack.push(type.id);
                    const mapped = mapType(type, mapper);
                    awaitedTypeStack.pop();
                    return typeAsAwaitable.awaitedTypeOfType = mapped;
                }
                if (isAwaitedTypeNeeded(type)) {
                    return typeAsAwaitable.awaitedTypeOfType = type;
                }
                const thisTypeForErrorOut = { value: void 0 };
                const promisedType = getPromisedTypeOfPromise(type, 
                /*errorNode*/
                void 0, thisTypeForErrorOut);
                if (promisedType) {
                    if (type.id === promisedType.id || awaitedTypeStack.lastIndexOf(promisedType.id) >= 0) {
                        if (errorNode) {
                            error(errorNode, Diagnostics.Type_is_referenced_directly_or_indirectly_in_the_fulfillment_callback_of_its_own_then_method);
                        }
                        return void 0;
                    }
                    awaitedTypeStack.push(type.id);
                    const awaitedType = getAwaitedTypeNoAlias(promisedType, errorNode, diagnosticMessage, arg0);
                    awaitedTypeStack.pop();
                    if (!awaitedType) {
                        return void 0;
                    }
                    return typeAsAwaitable.awaitedTypeOfType = awaitedType;
                }
                if (isThenableType(type)) {
                    if (errorNode) {
                        Debug.assertIsDefined(diagnosticMessage);
                        let chain;
                        if (thisTypeForErrorOut.value) {
                            chain = chainDiagnosticMessages(chain, Diagnostics.The_this_context_of_type_0_is_not_assignable_to_method_s_this_of_type_1, typeToString(type), typeToString(thisTypeForErrorOut.value));
                        }
                        chain = chainDiagnosticMessages(chain, diagnosticMessage, arg0);
                        diagnostics.add(createDiagnosticForNodeFromMessageChain(getSourceFileOfNode(errorNode), errorNode, chain));
                    }
                    return void 0;
                }
                return typeAsAwaitable.awaitedTypeOfType = type;
            }