function parseTypeMemberSemicolon() {
                        if (parseOptional(27 /* CommaToken */)) {
                            return;
                        }
                        parseSemicolon();
                    }