function checkInferType(node) {
                if (!findAncestor(node, (n) => n.parent && n.parent.kind === 191 /* ConditionalType */ && n.parent.extendsType === n)) {
                    grammarErrorOnNode(node, Diagnostics.infer_declarations_are_only_permitted_in_the_extends_clause_of_a_conditional_type);
                }
                checkSourceElement(node.typeParameter);
                const symbol = getSymbolOfDeclaration(node.typeParameter);
                if (symbol.declarations && symbol.declarations.length > 1) {
                    const links = getSymbolLinks(symbol);
                    if (!links.typeParametersChecked) {
                        links.typeParametersChecked = true;
                        const typeParameter = getDeclaredTypeOfTypeParameter(symbol);
                        const declarations = getDeclarationsOfKind(symbol, 165 /* TypeParameter */);
                        if (!areTypeParametersIdentical(declarations, [typeParameter], (decl) => [decl])) {
                            const name = symbolToString(symbol);
                            for (const declaration of declarations) {
                                error(declaration.name, Diagnostics.All_declarations_of_0_must_have_identical_constraints, name);
                            }
                        }
                    }
                }
                registerForUnusedIdentifiersCheck(node);
            }