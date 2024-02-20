function isThisless(symbol) {
                if (symbol.declarations && symbol.declarations.length === 1) {
                    const declaration = symbol.declarations[0];
                    if (declaration) {
                        switch (declaration.kind) {
                            case 169 /* PropertyDeclaration */:
                            case 168 /* PropertySignature */:
                                return isThislessVariableLikeDeclaration(declaration);
                            case 171 /* MethodDeclaration */:
                            case 170 /* MethodSignature */:
                            case 173 /* Constructor */:
                            case 174 /* GetAccessor */:
                            case 175 /* SetAccessor */:
                                return isThislessFunctionLikeDeclaration(declaration);
                        }
                    }
                }
                return false;
            }