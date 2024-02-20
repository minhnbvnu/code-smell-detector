function checkGrammarForGenerator(node) {
                if (node.asteriskToken) {
                    Debug.assert(node.kind === 259 /* FunctionDeclaration */ || node.kind === 215 /* FunctionExpression */ || node.kind === 171 /* MethodDeclaration */);
                    if (node.flags & 16777216 /* Ambient */) {
                        return grammarErrorOnNode(node.asteriskToken, Diagnostics.Generators_are_not_allowed_in_an_ambient_context);
                    }
                    if (!node.body) {
                        return grammarErrorOnNode(node.asteriskToken, Diagnostics.An_overload_signature_cannot_be_declared_as_a_generator);
                    }
                }
            }