function doChange6(changes, sourceFile, node, preferences) {
            const quotePreference = getQuotePreference(sourceFile, preferences);
            const argumentsExpression = factory.createStringLiteral(node.name.text, quotePreference === 0 /* Single */);
            changes.replaceNode(sourceFile, node, isPropertyAccessChain(node) ? factory.createElementAccessChain(node.expression, node.questionDotToken, argumentsExpression) : factory.createElementAccessExpression(node.expression, argumentsExpression));
        }