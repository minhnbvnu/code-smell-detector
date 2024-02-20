function addTypeProperties(type, insertAwait, insertQuestionDot) {
                isNewIdentifierLocation = !!type.getStringIndexType();
                if (isRightOfQuestionDot && some(type.getCallSignatures())) {
                    isNewIdentifierLocation = true;
                }
                const propertyAccess = node.kind === 202 /* ImportType */ ? node : node.parent;
                if (inCheckedFile) {
                    for (const symbol of type.getApparentProperties()) {
                        if (typeChecker.isValidPropertyAccessForCompletions(propertyAccess, type, symbol)) {
                            addPropertySymbol(symbol, 
                            /* insertAwait */
                            false, insertQuestionDot);
                        }
                    }
                }
                else {
                    symbols.push(...filter(getPropertiesForCompletion(type, typeChecker), (s) => typeChecker.isValidPropertyAccessForCompletions(propertyAccess, type, s)));
                }
                if (insertAwait && preferences.includeCompletionsWithInsertText) {
                    const promiseType = typeChecker.getPromisedTypeOfPromise(type);
                    if (promiseType) {
                        for (const symbol of promiseType.getApparentProperties()) {
                            if (typeChecker.isValidPropertyAccessForCompletions(propertyAccess, promiseType, symbol)) {
                                addPropertySymbol(symbol, 
                                /* insertAwait */
                                true, insertQuestionDot);
                            }
                        }
                    }
                }
            }