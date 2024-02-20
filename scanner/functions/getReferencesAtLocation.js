function getReferencesAtLocation(sourceFile, position, search, state, addReferencesHere) {
                        const referenceLocation = getTouchingPropertyName(sourceFile, position);
                        if (!isValidReferencePosition(referenceLocation, search.text)) {
                            if (!state.options.implementations && (state.options.findInStrings && isInString(sourceFile, position) || state.options.findInComments && isInNonReferenceComment(sourceFile, position))) {
                                state.addStringOrCommentReference(sourceFile.fileName, createTextSpan(position, search.text.length));
                            }
                            return;
                        }
                        if (!hasMatchingMeaning(referenceLocation, state))
                            return;
                        let referenceSymbol = state.checker.getSymbolAtLocation(referenceLocation);
                        if (!referenceSymbol) {
                            return;
                        }
                        const parent2 = referenceLocation.parent;
                        if (isImportSpecifier(parent2) && parent2.propertyName === referenceLocation) {
                            return;
                        }
                        if (isExportSpecifier(parent2)) {
                            Debug.assert(referenceLocation.kind === 79 /* Identifier */);
                            getReferencesAtExportSpecifier(referenceLocation, referenceSymbol, parent2, search, state, addReferencesHere);
                            return;
                        }
                        const relatedSymbol = getRelatedSymbol(search, referenceSymbol, referenceLocation, state);
                        if (!relatedSymbol) {
                            getReferenceForShorthandProperty(referenceSymbol, search, state);
                            return;
                        }
                        switch (state.specialSearchKind) {
                            case 0 /* None */:
                                if (addReferencesHere)
                                    addReference(referenceLocation, relatedSymbol, state);
                                break;
                            case 1 /* Constructor */:
                                addConstructorReferences(referenceLocation, sourceFile, search, state);
                                break;
                            case 2 /* Class */:
                                addClassStaticThisReferences(referenceLocation, search, state);
                                break;
                            default:
                                Debug.assertNever(state.specialSearchKind);
                        }
                        if (isInJSFile(referenceLocation) && isBindingElement(referenceLocation.parent) && isVariableDeclarationInitializedToBareOrAccessedRequire(referenceLocation.parent.parent.parent)) {
                            referenceSymbol = referenceLocation.parent.symbol;
                            if (!referenceSymbol)
                                return;
                        }
                        getImportOrExportReferences(referenceLocation, referenceSymbol, search, state);
                    }