function checkCollisionWithArgumentsInGeneratedCode(node) {
                if (languageVersion >= 2 /* ES2015 */ || !hasRestParameter(node) || node.flags & 16777216 /* Ambient */ || nodeIsMissing(node.body)) {
                    return;
                }
                forEach(node.parameters, (p) => {
                    if (p.name && !isBindingPattern(p.name) && p.name.escapedText === argumentsSymbol.escapedName) {
                        errorSkippedOn("noEmit", p, Diagnostics.Duplicate_identifier_arguments_Compiler_uses_arguments_to_initialize_rest_parameters);
                    }
                });
            }