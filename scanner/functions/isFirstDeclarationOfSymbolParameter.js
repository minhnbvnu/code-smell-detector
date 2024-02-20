function isFirstDeclarationOfSymbolParameter(symbol) {
            const declaration = symbol.declarations ? firstOrUndefined(symbol.declarations) : void 0;
            return !!findAncestor(declaration, (n) => isParameter(n) ? true : isBindingElement(n) || isObjectBindingPattern(n) || isArrayBindingPattern(n) ? false : "quit");
        }