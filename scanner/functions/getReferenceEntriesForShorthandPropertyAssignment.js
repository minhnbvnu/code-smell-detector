function getReferenceEntriesForShorthandPropertyAssignment(node, checker, addReference2) {
                        const refSymbol = checker.getSymbolAtLocation(node);
                        const shorthandSymbol = checker.getShorthandAssignmentValueSymbol(refSymbol.valueDeclaration);
                        if (shorthandSymbol) {
                            for (const declaration of shorthandSymbol.getDeclarations()) {
                                if (getMeaningFromDeclaration(declaration) & 1 /* Value */) {
                                    addReference2(declaration);
                                }
                            }
                        }
                    }