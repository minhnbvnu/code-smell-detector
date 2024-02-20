function isLiteralConstDeclaration(node) {
                if (isDeclarationReadonly(node) || isVariableDeclaration(node) && isVarConst(node)) {
                    return isFreshLiteralType(getTypeOfSymbol(getSymbolOfDeclaration(node)));
                }
                return false;
            }