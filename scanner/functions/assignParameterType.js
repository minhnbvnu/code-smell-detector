function assignParameterType(parameter, type) {
                const links = getSymbolLinks(parameter);
                if (!links.type) {
                    const declaration = parameter.valueDeclaration;
                    links.type = type || (declaration ? getWidenedTypeForVariableLikeDeclaration(declaration, 
                    /*reportErrors*/
                    true) : getTypeOfSymbol(parameter));
                    if (declaration && declaration.name.kind !== 79 /* Identifier */) {
                        if (links.type === unknownType) {
                            links.type = getTypeFromBindingPattern(declaration.name);
                        }
                        assignBindingElementTypes(declaration.name, links.type);
                    }
                }
                else if (type) {
                    Debug.assertEqual(links.type, type, "Parameter symbol already has a cached type which differs from newly assigned type");
                }
            }