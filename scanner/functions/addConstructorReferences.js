function addConstructorReferences(referenceLocation, sourceFile, search, state) {
                        if (isNewExpressionTarget(referenceLocation)) {
                            addReference(referenceLocation, search.symbol, state);
                        }
                        const pusher = () => state.referenceAdder(search.symbol);
                        if (isClassLike(referenceLocation.parent)) {
                            Debug.assert(referenceLocation.kind === 88 /* DefaultKeyword */ || referenceLocation.parent.name === referenceLocation);
                            findOwnConstructorReferences(search.symbol, sourceFile, pusher());
                        }
                        else {
                            const classExtending = tryGetClassByExtendingIdentifier(referenceLocation);
                            if (classExtending) {
                                findSuperConstructorAccesses(classExtending, pusher());
                                findInheritedConstructorReferences(classExtending, state);
                            }
                        }
                    }