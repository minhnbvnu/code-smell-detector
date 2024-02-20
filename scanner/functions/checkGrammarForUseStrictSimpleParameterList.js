function checkGrammarForUseStrictSimpleParameterList(node) {
                if (languageVersion >= 3 /* ES2016 */) {
                    const useStrictDirective = node.body && isBlock(node.body) && findUseStrictPrologue(node.body.statements);
                    if (useStrictDirective) {
                        const nonSimpleParameters = getNonSimpleParameters(node.parameters);
                        if (length(nonSimpleParameters)) {
                            forEach(nonSimpleParameters, (parameter) => {
                                addRelatedInfo(error(parameter, Diagnostics.This_parameter_is_not_allowed_with_use_strict_directive), createDiagnosticForNode(useStrictDirective, Diagnostics.use_strict_directive_used_here));
                            });
                            const diagnostics2 = nonSimpleParameters.map((parameter, index) => index === 0 ? createDiagnosticForNode(parameter, Diagnostics.Non_simple_parameter_declared_here) : createDiagnosticForNode(parameter, Diagnostics.and_here));
                            addRelatedInfo(error(useStrictDirective, Diagnostics.use_strict_directive_cannot_be_used_with_non_simple_parameter_list), ...diagnostics2);
                            return true;
                        }
                    }
                }
                return false;
            }