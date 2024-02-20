function checkFunctionOrConstructorSymbol(symbol) {
                addLazyDiagnostic(() => checkFunctionOrConstructorSymbolWorker(symbol));
            }