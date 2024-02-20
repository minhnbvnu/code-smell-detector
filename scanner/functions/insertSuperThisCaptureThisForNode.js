function insertSuperThisCaptureThisForNode(statements, superExpression) {
                enableSubstitutionsForCapturedThis();
                const assignSuperExpression = factory2.createExpressionStatement(factory2.createBinaryExpression(factory2.createThis(), 63 /* EqualsToken */, superExpression));
                insertStatementAfterCustomPrologue(statements, assignSuperExpression);
                setCommentRange(assignSuperExpression, getOriginalNode(superExpression).parent);
            }