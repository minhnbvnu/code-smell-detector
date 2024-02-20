function iterateNestedSymbols(_symbolmaster) {
                    _symbolmaster.allSymbolInstancesInChildren().allObjects().forEach(function(symbolInstance) {
                        var nestedSymbolMaster = symbolInstance.symbolMaster();
                        if (
                            !newSymbolMastersWillAddToDocument.containsObject(nestedSymbolMaster) &&
                            differentSymbols.containsObject(nestedSymbolMaster)
                        ) {
                            newSymbolMastersWillAddToDocument.addObject(nestedSymbolMaster);
                        }
                        iterateNestedSymbols(nestedSymbolMaster);
                    });
                }