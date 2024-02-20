function getPromisedTypeOfPromise(type, errorNode, thisTypeForErrorOut) {
                if (isTypeAny(type)) {
                    return void 0;
                }
                const typeAsPromise = type;
                if (typeAsPromise.promisedTypeOfPromise) {
                    return typeAsPromise.promisedTypeOfPromise;
                }
                if (isReferenceToType2(type, getGlobalPromiseType(
                /*reportErrors*/
                false))) {
                    return typeAsPromise.promisedTypeOfPromise = getTypeArguments(type)[0];
                }
                if (allTypesAssignableToKind(getBaseConstraintOrType(type), 134348796 /* Primitive */ | 131072 /* Never */)) {
                    return void 0;
                }
                const thenFunction = getTypeOfPropertyOfType(type, "then");
                if (isTypeAny(thenFunction)) {
                    return void 0;
                }
                const thenSignatures = thenFunction ? getSignaturesOfType(thenFunction, 0 /* Call */) : emptyArray;
                if (thenSignatures.length === 0) {
                    if (errorNode) {
                        error(errorNode, Diagnostics.A_promise_must_have_a_then_method);
                    }
                    return void 0;
                }
                let thisTypeForError;
                let candidates;
                for (const thenSignature of thenSignatures) {
                    const thisType = getThisTypeOfSignature(thenSignature);
                    if (thisType && thisType !== voidType && !isTypeRelatedTo(type, thisType, subtypeRelation)) {
                        thisTypeForError = thisType;
                    }
                    else {
                        candidates = append(candidates, thenSignature);
                    }
                }
                if (!candidates) {
                    Debug.assertIsDefined(thisTypeForError);
                    if (thisTypeForErrorOut) {
                        thisTypeForErrorOut.value = thisTypeForError;
                    }
                    if (errorNode) {
                        error(errorNode, Diagnostics.The_this_context_of_type_0_is_not_assignable_to_method_s_this_of_type_1, typeToString(type), typeToString(thisTypeForError));
                    }
                    return void 0;
                }
                const onfulfilledParameterType = getTypeWithFacts(getUnionType(map(candidates, getTypeOfFirstParameterOfSignature)), 2097152 /* NEUndefinedOrNull */);
                if (isTypeAny(onfulfilledParameterType)) {
                    return void 0;
                }
                const onfulfilledParameterSignatures = getSignaturesOfType(onfulfilledParameterType, 0 /* Call */);
                if (onfulfilledParameterSignatures.length === 0) {
                    if (errorNode) {
                        error(errorNode, Diagnostics.The_first_parameter_of_the_then_method_of_a_promise_must_be_a_callback);
                    }
                    return void 0;
                }
                return typeAsPromise.promisedTypeOfPromise = getUnionType(map(onfulfilledParameterSignatures, getTypeOfFirstParameterOfSignature), 2 /* Subtype */);
            }