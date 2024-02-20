function getAllSupers(decl, checker) {
            const res = [];
            while (decl) {
                const superElement = getClassExtendsHeritageElement(decl);
                const superSymbol = superElement && checker.getSymbolAtLocation(superElement.expression);
                if (!superSymbol)
                    break;
                const symbol = superSymbol.flags & 2097152 /* Alias */ ? checker.getAliasedSymbol(superSymbol) : superSymbol;
                const superDecl = symbol.declarations && find(symbol.declarations, isClassLike);
                if (!superDecl)
                    break;
                res.push(superDecl);
                decl = superDecl;
            }
            return res;
        }