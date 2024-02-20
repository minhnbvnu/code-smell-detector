function checkGrammarConstructorTypeAnnotation(node) {
                const type = node.type || getEffectiveReturnTypeNode(node);
                if (type) {
                    return grammarErrorOnNode(type, Diagnostics.Type_annotation_cannot_appear_on_a_constructor_declaration);
                }
            }