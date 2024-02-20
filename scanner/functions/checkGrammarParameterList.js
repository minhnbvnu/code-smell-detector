function checkGrammarParameterList(parameters) {
                let seenOptionalParameter = false;
                const parameterCount = parameters.length;
                for (let i = 0; i < parameterCount; i++) {
                    const parameter = parameters[i];
                    if (parameter.dotDotDotToken) {
                        if (i !== parameterCount - 1) {
                            return grammarErrorOnNode(parameter.dotDotDotToken, Diagnostics.A_rest_parameter_must_be_last_in_a_parameter_list);
                        }
                        if (!(parameter.flags & 16777216 /* Ambient */)) {
                            checkGrammarForDisallowedTrailingComma(parameters, Diagnostics.A_rest_parameter_or_binding_pattern_may_not_have_a_trailing_comma);
                        }
                        if (parameter.questionToken) {
                            return grammarErrorOnNode(parameter.questionToken, Diagnostics.A_rest_parameter_cannot_be_optional);
                        }
                        if (parameter.initializer) {
                            return grammarErrorOnNode(parameter.name, Diagnostics.A_rest_parameter_cannot_have_an_initializer);
                        }
                    }
                    else if (isOptionalParameter(parameter)) {
                        seenOptionalParameter = true;
                        if (parameter.questionToken && parameter.initializer) {
                            return grammarErrorOnNode(parameter.name, Diagnostics.Parameter_cannot_have_question_mark_and_initializer);
                        }
                    }
                    else if (seenOptionalParameter && !parameter.initializer) {
                        return grammarErrorOnNode(parameter.name, Diagnostics.A_required_parameter_cannot_follow_an_optional_parameter);
                    }
                }
            }