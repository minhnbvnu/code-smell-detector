function checkGrammarBindingElement(node) {
                if (node.dotDotDotToken) {
                    const elements = node.parent.elements;
                    if (node !== last(elements)) {
                        return grammarErrorOnNode(node, Diagnostics.A_rest_element_must_be_last_in_a_destructuring_pattern);
                    }
                    checkGrammarForDisallowedTrailingComma(elements, Diagnostics.A_rest_parameter_or_binding_pattern_may_not_have_a_trailing_comma);
                    if (node.propertyName) {
                        return grammarErrorOnNode(node.name, Diagnostics.A_rest_element_cannot_have_a_property_name);
                    }
                }
                if (node.dotDotDotToken && node.initializer) {
                    return grammarErrorAtPos(node, node.initializer.pos - 1, 1, Diagnostics.A_rest_element_cannot_have_an_initializer);
                }
            }