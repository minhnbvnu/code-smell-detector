function getArgumentArityError(node, signatures, args, headMessage) {
                var _a2;
                const spreadIndex = getSpreadArgumentIndex(args);
                if (spreadIndex > -1) {
                    return createDiagnosticForNode(args[spreadIndex], Diagnostics.A_spread_argument_must_either_have_a_tuple_type_or_be_passed_to_a_rest_parameter);
                }
                let min2 = Number.POSITIVE_INFINITY;
                let max = Number.NEGATIVE_INFINITY;
                let maxBelow = Number.NEGATIVE_INFINITY;
                let minAbove = Number.POSITIVE_INFINITY;
                let closestSignature;
                for (const sig of signatures) {
                    const minParameter = getMinArgumentCount(sig);
                    const maxParameter = getParameterCount(sig);
                    if (minParameter < min2) {
                        min2 = minParameter;
                        closestSignature = sig;
                    }
                    max = Math.max(max, maxParameter);
                    if (minParameter < args.length && minParameter > maxBelow)
                        maxBelow = minParameter;
                    if (args.length < maxParameter && maxParameter < minAbove)
                        minAbove = maxParameter;
                }
                const hasRestParameter2 = some(signatures, hasEffectiveRestParameter);
                const parameterRange = hasRestParameter2 ? min2 : min2 < max ? min2 + "-" + max : min2;
                const isVoidPromiseError = !hasRestParameter2 && parameterRange === 1 && args.length === 0 && isPromiseResolveArityError(node);
                if (isVoidPromiseError && isInJSFile(node)) {
                    return getDiagnosticForCallNode(node, Diagnostics.Expected_1_argument_but_got_0_new_Promise_needs_a_JSDoc_hint_to_produce_a_resolve_that_can_be_called_without_arguments);
                }
                const error2 = isDecorator(node) ? hasRestParameter2 ? Diagnostics.The_runtime_will_invoke_the_decorator_with_1_arguments_but_the_decorator_expects_at_least_0 : Diagnostics.The_runtime_will_invoke_the_decorator_with_1_arguments_but_the_decorator_expects_0 : hasRestParameter2 ? Diagnostics.Expected_at_least_0_arguments_but_got_1 : isVoidPromiseError ? Diagnostics.Expected_0_arguments_but_got_1_Did_you_forget_to_include_void_in_your_type_argument_to_Promise : Diagnostics.Expected_0_arguments_but_got_1;
                if (min2 < args.length && args.length < max) {
                    if (headMessage) {
                        let chain = chainDiagnosticMessages(
                        /*details*/
                        void 0, Diagnostics.No_overload_expects_0_arguments_but_overloads_do_exist_that_expect_either_1_or_2_arguments, args.length, maxBelow, minAbove);
                        chain = chainDiagnosticMessages(chain, headMessage);
                        return getDiagnosticForCallNode(node, chain);
                    }
                    return getDiagnosticForCallNode(node, Diagnostics.No_overload_expects_0_arguments_but_overloads_do_exist_that_expect_either_1_or_2_arguments, args.length, maxBelow, minAbove);
                }
                else if (args.length < min2) {
                    let diagnostic;
                    if (headMessage) {
                        let chain = chainDiagnosticMessages(
                        /*details*/
                        void 0, error2, parameterRange, args.length);
                        chain = chainDiagnosticMessages(chain, headMessage);
                        diagnostic = getDiagnosticForCallNode(node, chain);
                    }
                    else {
                        diagnostic = getDiagnosticForCallNode(node, error2, parameterRange, args.length);
                    }
                    const parameter = (_a2 = closestSignature == null ? void 0 : closestSignature.declaration) == null ? void 0 : _a2.parameters[closestSignature.thisParameter ? args.length + 1 : args.length];
                    if (parameter) {
                        const parameterError = createDiagnosticForNode(parameter, isBindingPattern(parameter.name) ? Diagnostics.An_argument_matching_this_binding_pattern_was_not_provided : isRestParameter(parameter) ? Diagnostics.Arguments_for_the_rest_parameter_0_were_not_provided : Diagnostics.An_argument_for_0_was_not_provided, !parameter.name ? args.length : !isBindingPattern(parameter.name) ? idText(getFirstIdentifier(parameter.name)) : void 0);
                        return addRelatedInfo(diagnostic, parameterError);
                    }
                    return diagnostic;
                }
                else {
                    const errorSpan = factory.createNodeArray(args.slice(max));
                    const pos = first(errorSpan).pos;
                    let end = last(errorSpan).end;
                    if (end === pos) {
                        end++;
                    }
                    setTextRangePosEnd(errorSpan, pos, end);
                    if (headMessage) {
                        let chain = chainDiagnosticMessages(
                        /*details*/
                        void 0, error2, parameterRange, args.length);
                        chain = chainDiagnosticMessages(chain, headMessage);
                        return createDiagnosticForNodeArrayFromMessageChain(getSourceFileOfNode(node), errorSpan, chain);
                    }
                    return createDiagnosticForNodeArray(getSourceFileOfNode(node), errorSpan, error2, parameterRange, args.length);
                }
            }