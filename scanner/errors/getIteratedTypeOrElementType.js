function getIteratedTypeOrElementType(use, inputType, sentType, errorNode, checkAssignability) {
                const allowAsyncIterables = (use & 2 /* AllowsAsyncIterablesFlag */) !== 0;
                if (inputType === neverType) {
                    reportTypeNotIterableError(errorNode, inputType, allowAsyncIterables);
                    return void 0;
                }
                const uplevelIteration = languageVersion >= 2 /* ES2015 */;
                const downlevelIteration = !uplevelIteration && compilerOptions.downlevelIteration;
                const possibleOutOfBounds = compilerOptions.noUncheckedIndexedAccess && !!(use & 128 /* PossiblyOutOfBounds */);
                if (uplevelIteration || downlevelIteration || allowAsyncIterables) {
                    const iterationTypes = getIterationTypesOfIterable(inputType, use, uplevelIteration ? errorNode : void 0);
                    if (checkAssignability) {
                        if (iterationTypes) {
                            const diagnostic = use & 8 /* ForOfFlag */ ? Diagnostics.Cannot_iterate_value_because_the_next_method_of_its_iterator_expects_type_1_but_for_of_will_always_send_0 : use & 32 /* SpreadFlag */ ? Diagnostics.Cannot_iterate_value_because_the_next_method_of_its_iterator_expects_type_1_but_array_spread_will_always_send_0 : use & 64 /* DestructuringFlag */ ? Diagnostics.Cannot_iterate_value_because_the_next_method_of_its_iterator_expects_type_1_but_array_destructuring_will_always_send_0 : use & 16 /* YieldStarFlag */ ? Diagnostics.Cannot_delegate_iteration_to_value_because_the_next_method_of_its_iterator_expects_type_1_but_the_containing_generator_will_always_send_0 : void 0;
                            if (diagnostic) {
                                checkTypeAssignableTo(sentType, iterationTypes.nextType, errorNode, diagnostic);
                            }
                        }
                    }
                    if (iterationTypes || uplevelIteration) {
                        return possibleOutOfBounds ? includeUndefinedInIndexSignature(iterationTypes && iterationTypes.yieldType) : iterationTypes && iterationTypes.yieldType;
                    }
                }
                let arrayType = inputType;
                let reportedError = false;
                let hasStringConstituent = false;
                if (use & 4 /* AllowsStringInputFlag */) {
                    if (arrayType.flags & 1048576 /* Union */) {
                        const arrayTypes = inputType.types;
                        const filteredTypes = filter(arrayTypes, (t) => !(t.flags & 402653316 /* StringLike */));
                        if (filteredTypes !== arrayTypes) {
                            arrayType = getUnionType(filteredTypes, 2 /* Subtype */);
                        }
                    }
                    else if (arrayType.flags & 402653316 /* StringLike */) {
                        arrayType = neverType;
                    }
                    hasStringConstituent = arrayType !== inputType;
                    if (hasStringConstituent) {
                        if (languageVersion < 1 /* ES5 */) {
                            if (errorNode) {
                                error(errorNode, Diagnostics.Using_a_string_in_a_for_of_statement_is_only_supported_in_ECMAScript_5_and_higher);
                                reportedError = true;
                            }
                        }
                        if (arrayType.flags & 131072 /* Never */) {
                            return possibleOutOfBounds ? includeUndefinedInIndexSignature(stringType) : stringType;
                        }
                    }
                }
                if (!isArrayLikeType(arrayType)) {
                    if (errorNode && !reportedError) {
                        const allowsStrings = !!(use & 4 /* AllowsStringInputFlag */) && !hasStringConstituent;
                        const [defaultDiagnostic, maybeMissingAwait] = getIterationDiagnosticDetails(allowsStrings, downlevelIteration);
                        errorAndMaybeSuggestAwait(errorNode, maybeMissingAwait && !!getAwaitedTypeOfPromise(arrayType), defaultDiagnostic, typeToString(arrayType));
                    }
                    return hasStringConstituent ? possibleOutOfBounds ? includeUndefinedInIndexSignature(stringType) : stringType : void 0;
                }
                const arrayElementType = getIndexTypeOfType(arrayType, numberType);
                if (hasStringConstituent && arrayElementType) {
                    if (arrayElementType.flags & 402653316 /* StringLike */ && !compilerOptions.noUncheckedIndexedAccess) {
                        return stringType;
                    }
                    return getUnionType(possibleOutOfBounds ? [arrayElementType, stringType, undefinedType] : [arrayElementType, stringType], 2 /* Subtype */);
                }
                return use & 128 /* PossiblyOutOfBounds */ ? includeUndefinedInIndexSignature(arrayElementType) : arrayElementType;
                function getIterationDiagnosticDetails(allowsStrings, downlevelIteration2) {
                    var _a2;
                    if (downlevelIteration2) {
                        return allowsStrings ? [Diagnostics.Type_0_is_not_an_array_type_or_a_string_type_or_does_not_have_a_Symbol_iterator_method_that_returns_an_iterator, true] : [Diagnostics.Type_0_is_not_an_array_type_or_does_not_have_a_Symbol_iterator_method_that_returns_an_iterator, true];
                    }
                    const yieldType = getIterationTypeOfIterable(use, 0 /* Yield */, inputType, 
                    /*errorNode*/
                    void 0);
                    if (yieldType) {
                        return [Diagnostics.Type_0_can_only_be_iterated_through_when_using_the_downlevelIteration_flag_or_with_a_target_of_es2015_or_higher, false];
                    }
                    if (isES2015OrLaterIterable((_a2 = inputType.symbol) == null ? void 0 : _a2.escapedName)) {
                        return [Diagnostics.Type_0_can_only_be_iterated_through_when_using_the_downlevelIteration_flag_or_with_a_target_of_es2015_or_higher, true];
                    }
                    return allowsStrings ? [Diagnostics.Type_0_is_not_an_array_type_or_a_string_type, true] : [Diagnostics.Type_0_is_not_an_array_type, true];
                }
            }