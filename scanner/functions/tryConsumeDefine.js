function tryConsumeDefine() {
                let token = scanner.getToken();
                if (token === 79 /* Identifier */ && scanner.getTokenValue() === "define") {
                    token = nextToken();
                    if (token !== 20 /* OpenParenToken */) {
                        return true;
                    }
                    token = nextToken();
                    if (token === 10 /* StringLiteral */ || token === 14 /* NoSubstitutionTemplateLiteral */) {
                        token = nextToken();
                        if (token === 27 /* CommaToken */) {
                            token = nextToken();
                        }
                        else {
                            return true;
                        }
                    }
                    if (token !== 22 /* OpenBracketToken */) {
                        return true;
                    }
                    token = nextToken();
                    while (token !== 23 /* CloseBracketToken */ && token !== 1 /* EndOfFileToken */) {
                        if (token === 10 /* StringLiteral */ || token === 14 /* NoSubstitutionTemplateLiteral */) {
                            recordModuleName();
                        }
                        token = nextToken();
                    }
                    return true;
                }
                return false;
            }