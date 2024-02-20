function isCompletionListBlocker(contextToken2) {
                const start2 = timestamp();
                const result = isInStringOrRegularExpressionOrTemplateLiteral(contextToken2) || isSolelyIdentifierDefinitionLocation(contextToken2) || isDotOfNumericLiteral(contextToken2) || isInJsxText(contextToken2) || isBigIntLiteral(contextToken2);
                log("getCompletionsAtPosition: isCompletionListBlocker: " + (timestamp() - start2));
                return result;
            }