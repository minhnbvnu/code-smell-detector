function checkTypeParameterListsIdentical(symbol) {
                if (symbol.declarations && symbol.declarations.length === 1) {
                    return;
                }
                const links = getSymbolLinks(symbol);
                if (!links.typeParametersChecked) {
                    links.typeParametersChecked = true;
                    const declarations = getClassOrInterfaceDeclarationsOfSymbol(symbol);
                    if (!declarations || declarations.length <= 1) {
                        return;
                    }
                    const type = getDeclaredTypeOfSymbol(symbol);
                    if (!areTypeParametersIdentical(declarations, type.localTypeParameters, getEffectiveTypeParameterDeclarations)) {
                        const name = symbolToString(symbol);
                        for (const declaration of declarations) {
                            error(declaration.name, Diagnostics.All_declarations_of_0_must_have_identical_type_parameters, name);
                        }
                    }
                }
            }