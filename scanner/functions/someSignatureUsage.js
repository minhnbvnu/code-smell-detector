function someSignatureUsage(signature, sourceFiles, checker, cb) {
                        if (!signature.name || !isIdentifier(signature.name))
                            return false;
                        const symbol = Debug.checkDefined(checker.getSymbolAtLocation(signature.name));
                        for (const sourceFile of sourceFiles) {
                            for (const name of getPossibleSymbolReferenceNodes(sourceFile, symbol.name)) {
                                if (!isIdentifier(name) || name === signature.name || name.escapedText !== signature.name.escapedText)
                                    continue;
                                const called = climbPastPropertyAccess(name);
                                const call = isCallExpression(called.parent) && called.parent.expression === called ? called.parent : void 0;
                                const referenceSymbol = checker.getSymbolAtLocation(name);
                                if (referenceSymbol && checker.getRootSymbols(referenceSymbol).some((s) => s === symbol)) {
                                    if (cb(name, call)) {
                                        return true;
                                    }
                                }
                            }
                        }
                        return false;
                    }