function makeChange4(changeTracker, sourceFile, pos, program, fixedNodes) {
            const token = getTokenAtPosition(sourceFile, pos);
            const forInitializer = findAncestor(token, (node) => isForInOrOfStatement(node.parent) ? node.parent.initializer === node : isPossiblyPartOfDestructuring(node) ? false : "quit");
            if (forInitializer)
                return applyChange(changeTracker, forInitializer, sourceFile, fixedNodes);
            const parent2 = token.parent;
            if (isBinaryExpression(parent2) && parent2.operatorToken.kind === 63 /* EqualsToken */ && isExpressionStatement(parent2.parent)) {
                return applyChange(changeTracker, token, sourceFile, fixedNodes);
            }
            if (isArrayLiteralExpression(parent2)) {
                const checker = program.getTypeChecker();
                if (!every(parent2.elements, (element) => arrayElementCouldBeVariableDeclaration(element, checker))) {
                    return;
                }
                return applyChange(changeTracker, parent2, sourceFile, fixedNodes);
            }
            const commaExpression = findAncestor(token, (node) => isExpressionStatement(node.parent) ? true : isPossiblyPartOfCommaSeperatedInitializer(node) ? false : "quit");
            if (commaExpression) {
                const checker = program.getTypeChecker();
                if (!expressionCouldBeVariableDeclaration(commaExpression, checker)) {
                    return;
                }
                return applyChange(changeTracker, commaExpression, sourceFile, fixedNodes);
            }
        }