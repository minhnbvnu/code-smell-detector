function checkGrammarConstructorTypeParameters(node) {
                const jsdocTypeParameters = isInJSFile(node) ? getJSDocTypeParameterDeclarations(node) : void 0;
                const range = node.typeParameters || jsdocTypeParameters && firstOrUndefined(jsdocTypeParameters);
                if (range) {
                    const pos = range.pos === range.end ? range.pos : skipTrivia(getSourceFileOfNode(node).text, range.pos);
                    return grammarErrorAtPos(node, pos, range.end - pos, Diagnostics.Type_parameters_cannot_appear_on_a_constructor_declaration);
                }
            }