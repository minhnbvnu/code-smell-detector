function symbolsToArray(symbols) {
                const result = [];
                symbols.forEach((symbol, id) => {
                    if (!isReservedMemberName(id)) {
                        result.push(symbol);
                    }
                });
                return result;
            }