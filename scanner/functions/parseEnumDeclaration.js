function parseEnumDeclaration(pos, hasJSDoc, modifiers) {
                        parseExpected(92 /* EnumKeyword */);
                        const name = parseIdentifier();
                        let members;
                        if (parseExpected(18 /* OpenBraceToken */)) {
                            members = doOutsideOfYieldAndAwaitContext(() => parseDelimitedList(6 /* EnumMembers */, parseEnumMember));
                            parseExpected(19 /* CloseBraceToken */);
                        }
                        else {
                            members = createMissingList();
                        }
                        const node = factory2.createEnumDeclaration(modifiers, name, members);
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }