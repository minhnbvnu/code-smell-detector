function checkGrammarIndexSignatureParameters(node) {
                const parameter = node.parameters[0];
                if (node.parameters.length !== 1) {
                    if (parameter) {
                        return grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_must_have_exactly_one_parameter);
                    }
                    else {
                        return grammarErrorOnNode(node, Diagnostics.An_index_signature_must_have_exactly_one_parameter);
                    }
                }
                checkGrammarForDisallowedTrailingComma(node.parameters, Diagnostics.An_index_signature_cannot_have_a_trailing_comma);
                if (parameter.dotDotDotToken) {
                    return grammarErrorOnNode(parameter.dotDotDotToken, Diagnostics.An_index_signature_cannot_have_a_rest_parameter);
                }
                if (hasEffectiveModifiers(parameter)) {
                    return grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_parameter_cannot_have_an_accessibility_modifier);
                }
                if (parameter.questionToken) {
                    return grammarErrorOnNode(parameter.questionToken, Diagnostics.An_index_signature_parameter_cannot_have_a_question_mark);
                }
                if (parameter.initializer) {
                    return grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_parameter_cannot_have_an_initializer);
                }
                if (!parameter.type) {
                    return grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_parameter_must_have_a_type_annotation);
                }
                const type = getTypeFromTypeNode(parameter.type);
                if (someType(type, (t) => !!(t.flags & 8576 /* StringOrNumberLiteralOrUnique */)) || isGenericType(type)) {
                    return grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_parameter_type_cannot_be_a_literal_type_or_generic_type_Consider_using_a_mapped_object_type_instead);
                }
                if (!everyType(type, isValidIndexKeyType)) {
                    return grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_parameter_type_must_be_string_number_symbol_or_a_template_literal_type);
                }
                if (!node.type) {
                    return grammarErrorOnNode(node, Diagnostics.An_index_signature_must_have_a_type_annotation);
                }
                return false;
            }