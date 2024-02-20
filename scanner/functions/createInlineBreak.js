function createInlineBreak(label, location) {
                Debug.assertLessThan(0, label, "Invalid label");
                return setTextRange(factory2.createReturnStatement(factory2.createArrayLiteralExpression([
                    createInstruction(3 /* Break */),
                    createLabel(label)
                ])), location);
            }