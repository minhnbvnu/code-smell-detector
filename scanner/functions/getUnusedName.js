function getUnusedName(input, symbol) {
                        var _a2, _b;
                        const id = symbol ? getSymbolId(symbol) : void 0;
                        if (id) {
                            if (context.remappedSymbolNames.has(id)) {
                                return context.remappedSymbolNames.get(id);
                            }
                        }
                        if (symbol) {
                            input = getNameCandidateWorker(symbol, input);
                        }
                        let i = 0;
                        const original = input;
                        while ((_a2 = context.usedSymbolNames) == null ? void 0 : _a2.has(input)) {
                            i++;
                            input = `${original}_${i}`;
                        }
                        (_b = context.usedSymbolNames) == null ? void 0 : _b.add(input);
                        if (id) {
                            context.remappedSymbolNames.set(id, input);
                        }
                        return input;
                    }