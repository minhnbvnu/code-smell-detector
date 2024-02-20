function checkPropertyDeclaration(node) {
                if (!checkGrammarModifiers(node) && !checkGrammarProperty(node))
                    checkGrammarComputedPropertyName(node.name);
                checkVariableLikeDeclaration(node);
                setNodeLinksForPrivateIdentifierScope(node);
                if (hasSyntacticModifier(node, 256 /* Abstract */) && node.kind === 169 /* PropertyDeclaration */ && node.initializer) {
                    error(node, Diagnostics.Property_0_cannot_have_an_initializer_because_it_is_marked_abstract, declarationNameToString(node.name));
                }
            }