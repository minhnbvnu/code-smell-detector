function doChange18(changes, sourceFile, start, length2, errorCode) {
            const token = getTokenAtPosition(sourceFile, start);
            const statement = findAncestor(token, isStatement);
            if (statement.getStart(sourceFile) !== token.getStart(sourceFile)) {
                const logData = JSON.stringify({
                    statementKind: Debug.formatSyntaxKind(statement.kind),
                    tokenKind: Debug.formatSyntaxKind(token.kind),
                    errorCode,
                    start,
                    length: length2
                });
                Debug.fail("Token and statement should start at the same point. " + logData);
            }
            const container = (isBlock(statement.parent) ? statement.parent : statement).parent;
            if (!isBlock(statement.parent) || statement === first(statement.parent.statements)) {
                switch (container.kind) {
                    case 242 /* IfStatement */:
                        if (container.elseStatement) {
                            if (isBlock(statement.parent)) {
                                break;
                            }
                            else {
                                changes.replaceNode(sourceFile, statement, factory.createBlock(emptyArray));
                            }
                            return;
                        }
                    case 244 /* WhileStatement */:
                    case 245 /* ForStatement */:
                        changes.delete(sourceFile, container);
                        return;
                }
            }
            if (isBlock(statement.parent)) {
                const end = start + length2;
                const lastStatement = Debug.checkDefined(lastWhere(sliceAfter(statement.parent.statements, statement), (s) => s.pos < end), "Some statement should be last");
                changes.deleteNodeRange(sourceFile, statement, lastStatement);
            }
            else {
                changes.delete(sourceFile, statement);
            }
        }