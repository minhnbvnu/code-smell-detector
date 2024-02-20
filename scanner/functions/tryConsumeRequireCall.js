function tryConsumeRequireCall(skipCurrentToken, allowTemplateLiterals = false) {
                let token = skipCurrentToken ? nextToken() : scanner.getToken();
                if (token === 147 /* RequireKeyword */) {
                    token = nextToken();
                    if (token === 20 /* OpenParenToken */) {
                        token = nextToken();
                        if (token === 10 /* StringLiteral */ || allowTemplateLiterals && token === 14 /* NoSubstitutionTemplateLiteral */) {
                            recordModuleName();
                        }
                    }
                    return true;
                }
                return false;
            }