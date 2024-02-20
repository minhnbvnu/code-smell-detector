function getInternalSymbolName(symbol, localName) {
                        const id = getSymbolId(symbol);
                        if (context.remappedSymbolNames.has(id)) {
                            return context.remappedSymbolNames.get(id);
                        }
                        localName = getNameCandidateWorker(symbol, localName);
                        context.remappedSymbolNames.set(id, localName);
                        return localName;
                    }