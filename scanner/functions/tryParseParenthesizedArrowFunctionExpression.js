function tryParseParenthesizedArrowFunctionExpression(allowReturnTypeInArrowFunction) {
                        const triState = isParenthesizedArrowFunctionExpression();
                        if (triState === 0 /* False */) {
                            return void 0;
                        }
                        return triState === 1 /* True */ ? parseParenthesizedArrowFunctionExpression(
                        /*allowAmbiguity*/
                        true, 
                        /*allowReturnTypeInArrowFunction*/
                        true) : tryParse(() => parsePossibleParenthesizedArrowFunctionExpression(allowReturnTypeInArrowFunction));
                    }