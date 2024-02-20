function parseVariableDeclarationList(inForStatementInitializer) {
                        const pos = getNodePos();
                        let flags = 0;
                        switch (token()) {
                            case 113 /* VarKeyword */:
                                break;
                            case 119 /* LetKeyword */:
                                flags |= 1 /* Let */;
                                break;
                            case 85 /* ConstKeyword */:
                                flags |= 2 /* Const */;
                                break;
                            default:
                                Debug.fail();
                        }
                        nextToken();
                        let declarations;
                        if (token() === 162 /* OfKeyword */ && lookAhead(canFollowContextualOfKeyword)) {
                            declarations = createMissingList();
                        }
                        else {
                            const savedDisallowIn = inDisallowInContext();
                            setDisallowInContext(inForStatementInitializer);
                            declarations = parseDelimitedList(8 /* VariableDeclarations */, inForStatementInitializer ? parseVariableDeclaration : parseVariableDeclarationAllowExclamation);
                            setDisallowInContext(savedDisallowIn);
                        }
                        return finishNode(factoryCreateVariableDeclarationList(declarations, flags), pos);
                    }