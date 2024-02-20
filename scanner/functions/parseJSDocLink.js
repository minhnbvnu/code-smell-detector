function parseJSDocLink(start2) {
                                const linkType = tryParse(parseJSDocLinkPrefix);
                                if (!linkType) {
                                    return void 0;
                                }
                                nextTokenJSDoc();
                                skipWhitespace();
                                const p2 = getNodePos();
                                let name = tokenIsIdentifierOrKeyword(token()) ? parseEntityName(
                                /*allowReservedWords*/
                                true) : void 0;
                                if (name) {
                                    while (token() === 80 /* PrivateIdentifier */) {
                                        reScanHashToken();
                                        nextTokenJSDoc();
                                        name = finishNode(factory2.createJSDocMemberName(name, parseIdentifier()), p2);
                                    }
                                }
                                const text = [];
                                while (token() !== 19 /* CloseBraceToken */ && token() !== 4 /* NewLineTrivia */ && token() !== 1 /* EndOfFileToken */) {
                                    text.push(scanner2.getTokenText());
                                    nextTokenJSDoc();
                                }
                                const create = linkType === "link" ? factory2.createJSDocLink : linkType === "linkcode" ? factory2.createJSDocLinkCode : factory2.createJSDocLinkPlain;
                                return finishNode(create(name, text.join("")), start2, scanner2.getTextPos());
                            }