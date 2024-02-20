function getAllRegExpLiterals() {
                return sourceCode.ast.tokens.filter(token => token.type === "RegularExpression");
            }