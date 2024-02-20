function checkMethodDeclaration(node) {
                if (!checkGrammarMethod(node))
                    checkGrammarComputedPropertyName(node.name);
                if (isMethodDeclaration(node) && node.asteriskToken && isIdentifier(node.name) && idText(node.name) === "constructor") {
                    error(node.name, Diagnostics.Class_constructor_may_not_be_a_generator);
                }
                checkFunctionOrMethodDeclaration(node);
                if (hasSyntacticModifier(node, 256 /* Abstract */) && node.kind === 171 /* MethodDeclaration */ && node.body) {
                    error(node, Diagnostics.Method_0_cannot_have_an_implementation_because_it_is_marked_abstract, declarationNameToString(node.name));
                }
                if (isPrivateIdentifier(node.name) && !getContainingClass(node)) {
                    error(node, Diagnostics.Private_identifiers_are_not_allowed_outside_class_bodies);
                }
                setNodeLinksForPrivateIdentifierScope(node);
            }