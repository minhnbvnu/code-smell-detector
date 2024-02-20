function getFirstDeclaration(type) {
            let firstDeclaration;
            const symbol = type.symbol;
            if (symbol && symbol.declarations) {
                for (const declaration of symbol.declarations) {
                    if (firstDeclaration === void 0 || declaration.pos < firstDeclaration.pos) {
                        firstDeclaration = declaration;
                    }
                }
            }
            return firstDeclaration;
        }