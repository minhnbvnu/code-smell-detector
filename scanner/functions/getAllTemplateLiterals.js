function getAllTemplateLiterals() {
                return sourceCode.ast.tokens.filter(token => token.type === "Template");
            }