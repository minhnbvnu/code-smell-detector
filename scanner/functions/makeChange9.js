function makeChange9(changeTracker, sourceFile, span) {
            const numericLiteral = tryCast(getTokenAtPosition(sourceFile, span.start), isNumericLiteral);
            if (!numericLiteral) {
                return;
            }
            const newText = numericLiteral.getText(sourceFile) + "n";
            changeTracker.replaceNode(sourceFile, numericLiteral, factory.createBigIntLiteral(newText));
        }