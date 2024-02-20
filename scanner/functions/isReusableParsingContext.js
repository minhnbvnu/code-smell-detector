function isReusableParsingContext(parsingContext2) {
                        switch (parsingContext2) {
                            case 5 /* ClassMembers */:
                            case 2 /* SwitchClauses */:
                            case 0 /* SourceElements */:
                            case 1 /* BlockStatements */:
                            case 3 /* SwitchClauseStatements */:
                            case 6 /* EnumMembers */:
                            case 4 /* TypeMembers */:
                            case 8 /* VariableDeclarations */:
                            case 17 /* JSDocParameters */:
                            case 16 /* Parameters */:
                                return true;
                        }
                        return false;
                    }