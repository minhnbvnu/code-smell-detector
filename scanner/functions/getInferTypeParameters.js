function getInferTypeParameters(node) {
                let result;
                if (node.locals) {
                    node.locals.forEach((symbol) => {
                        if (symbol.flags & 262144 /* TypeParameter */) {
                            result = append(result, getDeclaredTypeOfSymbol(symbol));
                        }
                    });
                }
                return result;
            }