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