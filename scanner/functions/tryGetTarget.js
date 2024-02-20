function tryGetTarget(symbol) {
                let target;
                let next = symbol;
                while (next = getSymbolLinks(next).target) {
                    target = next;
                }
                return target;
            }