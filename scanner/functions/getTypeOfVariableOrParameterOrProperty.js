function getTypeOfVariableOrParameterOrProperty(symbol) {
                const links = getSymbolLinks(symbol);
                if (!links.type) {
                    const type = getTypeOfVariableOrParameterOrPropertyWorker(symbol);
                    if (!links.type && !isParameterOfContextSensitiveSignature(symbol)) {
                        links.type = type;
                    }
                    return type;
                }
                return links.type;
            }