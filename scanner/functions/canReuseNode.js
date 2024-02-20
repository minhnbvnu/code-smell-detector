function canReuseNode(node, parsingContext2) {
                        switch (parsingContext2) {
                            case 5 /* ClassMembers */:
                                return isReusableClassMember(node);
                            case 2 /* SwitchClauses */:
                                return isReusableSwitchClause(node);
                            case 0 /* SourceElements */:
                            case 1 /* BlockStatements */:
                            case 3 /* SwitchClauseStatements */:
                                return isReusableStatement(node);
                            case 6 /* EnumMembers */:
                                return isReusableEnumMember(node);
                            case 4 /* TypeMembers */:
                                return isReusableTypeMember(node);
                            case 8 /* VariableDeclarations */:
                                return isReusableVariableDeclaration(node);
                            case 17 /* JSDocParameters */:
                            case 16 /* Parameters */:
                                return isReusableParameter(node);
                        }
                        return false;
                    }