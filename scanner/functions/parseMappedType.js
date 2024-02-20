function parseMappedType() {
                        const pos = getNodePos();
                        parseExpected(18 /* OpenBraceToken */);
                        let readonlyToken;
                        if (token() === 146 /* ReadonlyKeyword */ || token() === 39 /* PlusToken */ || token() === 40 /* MinusToken */) {
                            readonlyToken = parseTokenNode();
                            if (readonlyToken.kind !== 146 /* ReadonlyKeyword */) {
                                parseExpected(146 /* ReadonlyKeyword */);
                            }
                        }
                        parseExpected(22 /* OpenBracketToken */);
                        const typeParameter = parseMappedTypeParameter();
                        const nameType = parseOptional(128 /* AsKeyword */) ? parseType() : void 0;
                        parseExpected(23 /* CloseBracketToken */);
                        let questionToken;
                        if (token() === 57 /* QuestionToken */ || token() === 39 /* PlusToken */ || token() === 40 /* MinusToken */) {
                            questionToken = parseTokenNode();
                            if (questionToken.kind !== 57 /* QuestionToken */) {
                                parseExpected(57 /* QuestionToken */);
                            }
                        }
                        const type = parseTypeAnnotation();
                        parseSemicolon();
                        const members = parseList(4 /* TypeMembers */, parseTypeMember);
                        parseExpected(19 /* CloseBraceToken */);
                        return finishNode(factory2.createMappedTypeNode(readonlyToken, typeParameter, nameType, questionToken, type, members), pos);
                    }