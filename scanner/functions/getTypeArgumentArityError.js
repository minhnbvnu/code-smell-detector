function getTypeArgumentArityError(node, signatures, typeArguments, headMessage) {
                const argCount = typeArguments.length;
                if (signatures.length === 1) {
                    const sig = signatures[0];
                    const min2 = getMinTypeArgumentCount(sig.typeParameters);
                    const max = length(sig.typeParameters);
                    if (headMessage) {
                        let chain = chainDiagnosticMessages(
                        /*details*/
                        void 0, Diagnostics.Expected_0_type_arguments_but_got_1, min2 < max ? min2 + "-" + max : min2, argCount);
                        chain = chainDiagnosticMessages(chain, headMessage);
                        return createDiagnosticForNodeArrayFromMessageChain(getSourceFileOfNode(node), typeArguments, chain);
                    }
                    return createDiagnosticForNodeArray(getSourceFileOfNode(node), typeArguments, Diagnostics.Expected_0_type_arguments_but_got_1, min2 < max ? min2 + "-" + max : min2, argCount);
                }
                let belowArgCount = -Infinity;
                let aboveArgCount = Infinity;
                for (const sig of signatures) {
                    const min2 = getMinTypeArgumentCount(sig.typeParameters);
                    const max = length(sig.typeParameters);
                    if (min2 > argCount) {
                        aboveArgCount = Math.min(aboveArgCount, min2);
                    }
                    else if (max < argCount) {
                        belowArgCount = Math.max(belowArgCount, max);
                    }
                }
                if (belowArgCount !== -Infinity && aboveArgCount !== Infinity) {
                    if (headMessage) {
                        let chain = chainDiagnosticMessages(
                        /*details*/
                        void 0, Diagnostics.No_overload_expects_0_type_arguments_but_overloads_do_exist_that_expect_either_1_or_2_type_arguments, argCount, belowArgCount, aboveArgCount);
                        chain = chainDiagnosticMessages(chain, headMessage);
                        return createDiagnosticForNodeArrayFromMessageChain(getSourceFileOfNode(node), typeArguments, chain);
                    }
                    return createDiagnosticForNodeArray(getSourceFileOfNode(node), typeArguments, Diagnostics.No_overload_expects_0_type_arguments_but_overloads_do_exist_that_expect_either_1_or_2_type_arguments, argCount, belowArgCount, aboveArgCount);
                }
                if (headMessage) {
                    let chain = chainDiagnosticMessages(
                    /*details*/
                    void 0, Diagnostics.Expected_0_type_arguments_but_got_1, belowArgCount === -Infinity ? aboveArgCount : belowArgCount, argCount);
                    chain = chainDiagnosticMessages(chain, headMessage);
                    return createDiagnosticForNodeArrayFromMessageChain(getSourceFileOfNode(node), typeArguments, chain);
                }
                return createDiagnosticForNodeArray(getSourceFileOfNode(node), typeArguments, Diagnostics.Expected_0_type_arguments_but_got_1, belowArgCount === -Infinity ? aboveArgCount : belowArgCount, argCount);
            }