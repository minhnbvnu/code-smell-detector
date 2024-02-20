function disassembleSymbol(name, symbol) {
            var newArgs = [name, symbol.char];
            if (symbol.attributes) {
                for (var key in symbol.attributes) {
                    newArgs.push(key);
                    newArgs.push(symbol.attributes[key]);
                }
            }
            return newArgs;
        }