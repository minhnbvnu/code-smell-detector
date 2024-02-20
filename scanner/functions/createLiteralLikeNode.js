function createLiteralLikeNode(kind, text) {
                switch (kind) {
                    case 8 /* NumericLiteral */:
                        return createNumericLiteral(text, 
                        /*numericLiteralFlags*/
                        0);
                    case 9 /* BigIntLiteral */:
                        return createBigIntLiteral(text);
                    case 10 /* StringLiteral */:
                        return createStringLiteral(text, 
                        /*isSingleQuote*/
                        void 0);
                    case 11 /* JsxText */:
                        return createJsxText(text, 
                        /*containsOnlyTriviaWhiteSpaces*/
                        false);
                    case 12 /* JsxTextAllWhiteSpaces */:
                        return createJsxText(text, 
                        /*containsOnlyTriviaWhiteSpaces*/
                        true);
                    case 13 /* RegularExpressionLiteral */:
                        return createRegularExpressionLiteral(text);
                    case 14 /* NoSubstitutionTemplateLiteral */:
                        return createTemplateLiteralLikeNode(kind, text, 
                        /*rawText*/
                        void 0, 
                        /*templateFlags*/
                        0);
                }
            }