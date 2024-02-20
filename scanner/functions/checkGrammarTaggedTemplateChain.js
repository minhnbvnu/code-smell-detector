function checkGrammarTaggedTemplateChain(node) {
                if (node.questionDotToken || node.flags & 32 /* OptionalChain */) {
                    return grammarErrorOnNode(node.template, Diagnostics.Tagged_template_expressions_are_not_permitted_in_an_optional_chain);
                }
                return false;
            }