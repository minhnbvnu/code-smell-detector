function checkGrammarNameInLetOrConstDeclarations(name) {
                if (name.kind === 79 /* Identifier */) {
                    if (name.escapedText === "let") {
                        return grammarErrorOnNode(name, Diagnostics.let_is_not_allowed_to_be_used_as_a_name_in_let_or_const_declarations);
                    }
                }
                else {
                    const elements = name.elements;
                    for (const element of elements) {
                        if (!isOmittedExpression(element)) {
                            checkGrammarNameInLetOrConstDeclarations(element.name);
                        }
                    }
                }
                return false;
            }