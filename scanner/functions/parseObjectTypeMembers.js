function parseObjectTypeMembers() {
                        let members;
                        if (parseExpected(18 /* OpenBraceToken */)) {
                            members = parseList(4 /* TypeMembers */, parseTypeMember);
                            parseExpected(19 /* CloseBraceToken */);
                        }
                        else {
                            members = createMissingList();
                        }
                        return members;
                    }