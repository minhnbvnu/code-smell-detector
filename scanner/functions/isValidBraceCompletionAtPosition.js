function isValidBraceCompletionAtPosition(fileName, position, openingBrace) {
                if (openingBrace === 60 /* lessThan */) {
                    return false;
                }
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                if (isInString(sourceFile, position)) {
                    return false;
                }
                if (isInsideJsxElementOrAttribute(sourceFile, position)) {
                    return openingBrace === 123 /* openBrace */;
                }
                if (isInTemplateString(sourceFile, position)) {
                    return false;
                }
                switch (openingBrace) {
                    case 39 /* singleQuote */:
                    case 34 /* doubleQuote */:
                    case 96 /* backtick */:
                        return !isInComment(sourceFile, position);
                }
                return true;
            }