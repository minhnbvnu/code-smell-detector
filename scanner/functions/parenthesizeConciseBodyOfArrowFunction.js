function parenthesizeConciseBodyOfArrowFunction(body) {
                if (!isBlock(body) && (isCommaSequence(body) || getLeftmostExpression(body, 
                /*stopAtCallExpressions*/
                false).kind === 207 /* ObjectLiteralExpression */)) {
                    return setTextRange(factory2.createParenthesizedExpression(body), body);
                }
                return body;
            }