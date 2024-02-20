function doChange37(sourceFile, checker, changes, info, _actionName) {
            const { finalExpression, occurrences, expression } = info;
            const firstOccurrence = occurrences[occurrences.length - 1];
            const convertedChain = convertOccurrences(checker, finalExpression, occurrences);
            if (convertedChain && (isPropertyAccessExpression(convertedChain) || isElementAccessExpression(convertedChain) || isCallExpression(convertedChain))) {
                if (isBinaryExpression(expression)) {
                    changes.replaceNodeRange(sourceFile, firstOccurrence, finalExpression, convertedChain);
                }
                else if (isConditionalExpression(expression)) {
                    changes.replaceNode(sourceFile, expression, factory.createBinaryExpression(convertedChain, factory.createToken(60 /* QuestionQuestionToken */), expression.whenFalse));
                }
            }
        }