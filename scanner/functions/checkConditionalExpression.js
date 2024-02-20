function checkConditionalExpression(node, checkMode) {
                const type = checkTruthinessExpression(node.condition);
                checkTestingKnownTruthyCallableOrAwaitableType(node.condition, type, node.whenTrue);
                const type1 = checkExpression(node.whenTrue, checkMode);
                const type2 = checkExpression(node.whenFalse, checkMode);
                return getUnionType([type1, type2], 2 /* Subtype */);
            }