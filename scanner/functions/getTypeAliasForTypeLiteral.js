function getTypeAliasForTypeLiteral(type) {
                if (type.symbol && type.symbol.flags & 2048 /* TypeLiteral */ && type.symbol.declarations) {
                    const node = walkUpParenthesizedTypes(type.symbol.declarations[0].parent);
                    if (isTypeAliasDeclaration(node)) {
                        return getSymbolOfDeclaration(node);
                    }
                }
                return void 0;
            }