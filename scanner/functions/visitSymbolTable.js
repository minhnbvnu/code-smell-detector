function visitSymbolTable(symbolTable2, suppressNewPrivateContext, propertyAsAlias) {
                        if (!suppressNewPrivateContext) {
                            deferredPrivatesStack.push(/* @__PURE__ */ new Map());
                        }
                        symbolTable2.forEach((symbol) => {
                            serializeSymbol(symbol, 
                            /*isPrivate*/
                            false, !!propertyAsAlias);
                        });
                        if (!suppressNewPrivateContext) {
                            deferredPrivatesStack[deferredPrivatesStack.length - 1].forEach((symbol) => {
                                serializeSymbol(symbol, 
                                /*isPrivate*/
                                true, !!propertyAsAlias);
                            });
                            deferredPrivatesStack.pop();
                        }
                    }