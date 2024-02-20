function isSymbolOrSymbolForCall(node) {
                if (!isCallExpression(node))
                    return false;
                let left = node.expression;
                if (isPropertyAccessExpression(left) && left.name.escapedText === "for") {
                    left = left.expression;
                }
                if (!isIdentifier(left) || left.escapedText !== "Symbol") {
                    return false;
                }
                const globalESSymbol = getGlobalESSymbolConstructorSymbol(
                /*reportErrors*/
                false);
                if (!globalESSymbol) {
                    return false;
                }
                return globalESSymbol === resolveName(left, "Symbol", 111551 /* Value */, 
                /*nameNotFoundMessage*/
                void 0, 
                /*nameArg*/
                void 0, 
                /*isUse*/
                false);
            }