function convertOccurrences(checker, toConvert, occurrences) {
            if (isPropertyAccessExpression(toConvert) || isElementAccessExpression(toConvert) || isCallExpression(toConvert)) {
                const chain = convertOccurrences(checker, toConvert.expression, occurrences);
                const lastOccurrence = occurrences.length > 0 ? occurrences[occurrences.length - 1] : void 0;
                const isOccurrence = (lastOccurrence == null ? void 0 : lastOccurrence.getText()) === toConvert.expression.getText();
                if (isOccurrence)
                    occurrences.pop();
                if (isCallExpression(toConvert)) {
                    return isOccurrence ? factory.createCallChain(chain, factory.createToken(28 /* QuestionDotToken */), toConvert.typeArguments, toConvert.arguments) : factory.createCallChain(chain, toConvert.questionDotToken, toConvert.typeArguments, toConvert.arguments);
                }
                else if (isPropertyAccessExpression(toConvert)) {
                    return isOccurrence ? factory.createPropertyAccessChain(chain, factory.createToken(28 /* QuestionDotToken */), toConvert.name) : factory.createPropertyAccessChain(chain, toConvert.questionDotToken, toConvert.name);
                }
                else if (isElementAccessExpression(toConvert)) {
                    return isOccurrence ? factory.createElementAccessChain(chain, factory.createToken(28 /* QuestionDotToken */), toConvert.argumentExpression) : factory.createElementAccessChain(chain, toConvert.questionDotToken, toConvert.argumentExpression);
                }
            }
            return toConvert;
        }