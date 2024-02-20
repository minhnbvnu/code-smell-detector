function processCodePathToExit(analyzer, node) {
        const codePath = analyzer.codePath;
        const state = CodePath.getState(codePath);
        let dontForward = false;
        switch (node.type) {
            case "ChainExpression":
                state.popChainContext();
                break;
            case "IfStatement":
            case "ConditionalExpression":
                state.popChoiceContext();
                break;
            case "LogicalExpression":
                if (isHandledLogicalOperator(node.operator)) {
                    state.popChoiceContext();
                }
                break;
            case "AssignmentExpression":
                if (isLogicalAssignmentOperator(node.operator)) {
                    state.popChoiceContext();
                }
                break;
            case "SwitchStatement":
                state.popSwitchContext();
                break;
            case "SwitchCase":
                /*
                 * This is the same as the process at the 1st `consequent` node in
                 * `preprocess` function.
                 * Must do if this `consequent` is empty.
                 */
                if (node.consequent.length === 0) {
                    state.makeSwitchCaseBody(true, !node.test);
                }
                if (state.forkContext.reachable) {
                    dontForward = true;
                }
                break;
            case "TryStatement":
                state.popTryContext();
                break;
            case "BreakStatement":
                forwardCurrentToHead(analyzer, node);
                state.makeBreak(node.label && node.label.name);
                dontForward = true;
                break;
            case "ContinueStatement":
                forwardCurrentToHead(analyzer, node);
                state.makeContinue(node.label && node.label.name);
                dontForward = true;
                break;
            case "ReturnStatement":
                forwardCurrentToHead(analyzer, node);
                state.makeReturn();
                dontForward = true;
                break;
            case "ThrowStatement":
                forwardCurrentToHead(analyzer, node);
                state.makeThrow();
                dontForward = true;
                break;
            case "Identifier":
                if (isIdentifierReference(node)) {
                    state.makeFirstThrowablePathInTryBlock();
                    dontForward = true;
                }
                break;
            case "CallExpression":
            case "ImportExpression":
            case "MemberExpression":
            case "NewExpression":
            case "YieldExpression":
                state.makeFirstThrowablePathInTryBlock();
                break;
            case "WhileStatement":
            case "DoWhileStatement":
            case "ForStatement":
            case "ForInStatement":
            case "ForOfStatement":
                state.popLoopContext();
                break;
            case "AssignmentPattern":
                state.popForkContext();
                break;
            case "LabeledStatement":
                if (!breakableTypePattern.test(node.body.type)) {
                    state.popBreakContext();
                }
                break;
            default:
                break;
        }
        // Emits onCodePathSegmentStart events if updated.
        if (!dontForward) {
            forwardCurrentToHead(analyzer, node);
        }
        debug.dumpState(node, state, true);
    }