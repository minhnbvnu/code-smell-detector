function getTypeOfGlobalSymbol(symbol, arity) {
                function getTypeDeclaration(symbol2) {
                    const declarations = symbol2.declarations;
                    if (declarations) {
                        for (const declaration of declarations) {
                            switch (declaration.kind) {
                                case 260 /* ClassDeclaration */:
                                case 261 /* InterfaceDeclaration */:
                                case 263 /* EnumDeclaration */:
                                    return declaration;
                            }
                        }
                    }
                }
                if (!symbol) {
                    return arity ? emptyGenericType : emptyObjectType;
                }
                const type = getDeclaredTypeOfSymbol(symbol);
                if (!(type.flags & 524288 /* Object */)) {
                    error(getTypeDeclaration(symbol), Diagnostics.Global_type_0_must_be_a_class_or_interface_type, symbolName(symbol));
                    return arity ? emptyGenericType : emptyObjectType;
                }
                if (length(type.typeParameters) !== arity) {
                    error(getTypeDeclaration(symbol), Diagnostics.Global_type_0_must_have_1_type_parameter_s, symbolName(symbol), arity);
                    return arity ? emptyGenericType : emptyObjectType;
                }
                return type;
            }