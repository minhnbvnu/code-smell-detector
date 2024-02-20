function parsePropertyOrMethodDeclaration(pos, hasJSDoc, modifiers) {
                        const asteriskToken = parseOptionalToken(41 /* AsteriskToken */);
                        const name = parsePropertyName();
                        const questionToken = parseOptionalToken(57 /* QuestionToken */);
                        if (asteriskToken || token() === 20 /* OpenParenToken */ || token() === 29 /* LessThanToken */) {
                            return parseMethodDeclaration(pos, hasJSDoc, modifiers, asteriskToken, name, questionToken, 
                            /*exclamationToken*/
                            void 0, Diagnostics.or_expected);
                        }
                        return parsePropertyDeclaration(pos, hasJSDoc, modifiers, name, questionToken);
                    }