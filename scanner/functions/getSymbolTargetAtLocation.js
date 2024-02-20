function getSymbolTargetAtLocation(node) {
                const symbol = checker.getSymbolAtLocation(node);
                return symbol && getSymbolTarget(symbol, checker);
            }