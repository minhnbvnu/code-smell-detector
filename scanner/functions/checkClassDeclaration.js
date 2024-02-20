function checkClassDeclaration(node) {
                const firstDecorator = find(node.modifiers, isDecorator);
                if (legacyDecorators && firstDecorator && some(node.members, (p) => hasStaticModifier(p) && isPrivateIdentifierClassElementDeclaration(p))) {
                    grammarErrorOnNode(firstDecorator, Diagnostics.Class_decorators_can_t_be_used_with_static_private_identifier_Consider_removing_the_experimental_decorator);
                }
                if (!node.name && !hasSyntacticModifier(node, 1024 /* Default */)) {
                    grammarErrorOnFirstToken(node, Diagnostics.A_class_declaration_without_the_default_modifier_must_have_a_name);
                }
                checkClassLikeDeclaration(node);
                forEach(node.members, checkSourceElement);
                registerForUnusedIdentifiersCheck(node);
            }