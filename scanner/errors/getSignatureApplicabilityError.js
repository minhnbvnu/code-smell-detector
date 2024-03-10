function getSignatureApplicabilityError(node, args, signature, relation, checkMode, reportErrors2, containingMessageChain) {
                const errorOutputContainer = { errors: void 0, skipLogging: true };
                if (isJsxOpeningLikeElement(node)) {
                    if (!checkApplicableSignatureForJsxOpeningLikeElement(node, signature, relation, checkMode, reportErrors2, containingMessageChain, errorOutputContainer)) {
                        Debug.assert(!reportErrors2 || !!errorOutputContainer.errors, "jsx should have errors when reporting errors");
                        return errorOutputContainer.errors || emptyArray;
                    }
                    return void 0;
                }
                const thisType = getThisTypeOfSignature(signature);
                if (thisType && thisType !== voidType && !(isNewExpression(node) || isCallExpression(node) && isSuperProperty(node.expression))) {
                    const thisArgumentNode = getThisArgumentOfCall(node);
                    const thisArgumentType = getThisArgumentType(thisArgumentNode);
                    const errorNode = reportErrors2 ? thisArgumentNode || node : void 0;
                    const headMessage2 = Diagnostics.The_this_context_of_type_0_is_not_assignable_to_method_s_this_of_type_1;
                    if (!checkTypeRelatedTo(thisArgumentType, thisType, relation, errorNode, headMessage2, containingMessageChain, errorOutputContainer)) {
                        Debug.assert(!reportErrors2 || !!errorOutputContainer.errors, "this parameter should have errors when reporting errors");
                        return errorOutputContainer.errors || emptyArray;
                    }
                }
                const headMessage = Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1;
                const restType = getNonArrayRestType(signature);
                const argCount = restType ? Math.min(getParameterCount(signature) - 1, args.length) : args.length;
                for (let i = 0; i < argCount; i++) {
                    const arg = args[i];
                    if (arg.kind !== 229 /* OmittedExpression */) {
                        const paramType = getTypeAtPosition(signature, i);
                        const argType = checkExpressionWithContextualType(arg, paramType, 
                        /*inferenceContext*/
                        void 0, checkMode);
                        const checkArgType = checkMode & 4 /* SkipContextSensitive */ ? getRegularTypeOfObjectLiteral(argType) : argType;
                        if (!checkTypeRelatedToAndOptionallyElaborate(checkArgType, paramType, relation, reportErrors2 ? arg : void 0, arg, headMessage, containingMessageChain, errorOutputContainer)) {
                            Debug.assert(!reportErrors2 || !!errorOutputContainer.errors, "parameter should have errors when reporting errors");
                            maybeAddMissingAwaitInfo(arg, checkArgType, paramType);
                            return errorOutputContainer.errors || emptyArray;
                        }
                    }
                }
                if (restType) {
                    const spreadType = getSpreadArgumentType(args, argCount, args.length, restType, 
                    /*context*/
                    void 0, checkMode);
                    const restArgCount = args.length - argCount;
                    const errorNode = !reportErrors2 ? void 0 : restArgCount === 0 ? node : restArgCount === 1 ? args[argCount] : setTextRangePosEnd(createSyntheticExpression(node, spreadType), args[argCount].pos, args[args.length - 1].end);
                    if (!checkTypeRelatedTo(spreadType, restType, relation, errorNode, headMessage, 
                    /*containingMessageChain*/
                    void 0, errorOutputContainer)) {
                        Debug.assert(!reportErrors2 || !!errorOutputContainer.errors, "rest parameter should have errors when reporting errors");
                        maybeAddMissingAwaitInfo(errorNode, spreadType, restType);
                        return errorOutputContainer.errors || emptyArray;
                    }
                }
                return void 0;
                function maybeAddMissingAwaitInfo(errorNode, source, target) {
                    if (errorNode && reportErrors2 && errorOutputContainer.errors && errorOutputContainer.errors.length) {
                        if (getAwaitedTypeOfPromise(target)) {
                            return;
                        }
                        const awaitedTypeOfSource = getAwaitedTypeOfPromise(source);
                        if (awaitedTypeOfSource && isTypeRelatedTo(awaitedTypeOfSource, target, relation)) {
                            addRelatedInfo(errorOutputContainer.errors[0], createDiagnosticForNode(errorNode, Diagnostics.Did_you_forget_to_use_await));
                        }
                    }
                }
            }