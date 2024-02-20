function parseJSDocNameReference() {
                            const pos = getNodePos();
                            const hasBrace = parseOptional(18 /* OpenBraceToken */);
                            const p2 = getNodePos();
                            let entityName = parseEntityName(
                            /* allowReservedWords*/
                            false);
                            while (token() === 80 /* PrivateIdentifier */) {
                                reScanHashToken();
                                nextTokenJSDoc();
                                entityName = finishNode(factory2.createJSDocMemberName(entityName, parseIdentifier()), p2);
                            }
                            if (hasBrace) {
                                parseExpectedJSDoc(19 /* CloseBraceToken */);
                            }
                            const result = factory2.createJSDocNameReference(entityName);
                            fixupParentReferences(result);
                            return finishNode(result, pos);
                        }