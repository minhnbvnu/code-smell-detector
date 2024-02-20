function getCallName(sourceFile, start) {
            const token = getTokenAtPosition(sourceFile, start);
            if (isPropertyAccessExpression(token.parent)) {
                let current = token.parent;
                while (isPropertyAccessExpression(current.parent)) {
                    current = current.parent;
                }
                return current.name;
            }
            if (isIdentifier(token)) {
                return token;
            }
            return void 0;
        }