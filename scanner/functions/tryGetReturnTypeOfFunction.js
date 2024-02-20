function tryGetReturnTypeOfFunction(symbol, type, checker) {
            if (type.symbol === symbol || // At `const f = () => {}`, the symbol is `f` and the type symbol is at `() => {}`
                symbol.valueDeclaration && type.symbol && isVariableDeclaration(symbol.valueDeclaration) && symbol.valueDeclaration.initializer === type.symbol.valueDeclaration) {
                const sigs = type.getCallSignatures();
                if (sigs.length === 1)
                    return checker.getReturnTypeOfSignature(first(sigs));
            }
            return void 0;
        }