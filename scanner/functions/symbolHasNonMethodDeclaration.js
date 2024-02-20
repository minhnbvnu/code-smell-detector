function symbolHasNonMethodDeclaration(symbol) {
                return !!forEachProperty2(symbol, (prop) => !(prop.flags & 8192 /* Method */));
            }