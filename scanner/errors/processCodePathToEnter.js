function processCodePathToEnter(analyzer, node) {
        let codePath = analyzer.codePath;
        let state = codePath && CodePath.getState(codePath);
        const parent = node.parent;
        /**
         * Creates a new code path and trigger the onCodePathStart event
         * based on the currently selected node.
         * @param {string} origin The reason the code path was started.
         * @returns {void}
         */
        function startCodePath(origin) {
            if (codePath) {
                // Emits onCodePathSegmentStart events if updated.
                forwardCurrentToHead(analyzer, node);
                debug.dumpState(node, state, false);
            }
            // Create the code path of this scope.
            codePath = analyzer.codePath = new CodePath({
                id: analyzer.idGenerator.next(),
                origin,
                upper: codePath,
                onLooped: analyzer.onLooped
            });
            state = CodePath.getState(codePath);
            // Emits onCodePathStart events.
            debug.dump(`onCodePathStart ${codePath.id}`);
            analyzer.emitter.emit("onCodePathStart", codePath, node);
        }
        /*
         * Special case: The right side of class field initializer is considered
         * to be its own function, so we need to start a new code path in this
         * case.
         */
        if (isPropertyDefinitionValue(node)) {
            startCodePath("class-field-initializer");
            /*
             * Intentional fall through because `node` needs to also be
             * processed by the code below. For example, if we have:
             *
             * class Foo {
             *     a = () => {}
             * }
             *
             * In this case, we also need start a second code path.
             */
        }
        switch (node.type) {
            case "Program":
                startCodePath("program");
                break;
            case "FunctionDeclaration":
            case "FunctionExpression":
            case "ArrowFunctionExpression":
                startCodePath("function");
                break;
            case "StaticBlock":
                startCodePath("class-static-block");
                break;
            case "ChainExpression":
                state.pushChainContext();
                break;
            case "CallExpression":
                if (node.optional === true) {
                    state.makeOptionalNode();
                }
                break;
            case "MemberExpression":
                if (node.optional === true) {
                    state.makeOptionalNode();
                }
                break;
            case "LogicalExpression":
                if (isHandledLogicalOperator(node.operator)) {
                    state.pushChoiceContext(node.operator, isForkingByTrueOrFalse(node));
                }
                break;
            case "AssignmentExpression":
                if (isLogicalAssignmentOperator(node.operator)) {
                    state.pushChoiceContext(node.operator.slice(0, -1), // removes `=` from the end
                    isForkingByTrueOrFalse(node));
                }
                break;
            case "ConditionalExpression":
            case "IfStatement":
                state.pushChoiceContext("test", false);
                break;
            case "SwitchStatement":
                state.pushSwitchContext(node.cases.some(isCaseNode), getLabel(node));
                break;
            case "TryStatement":
                state.pushTryContext(Boolean(node.finalizer));
                break;
            case "SwitchCase":
                /*
                 * Fork if this node is after the 2st node in `cases`.
                 * It's similar to `else` blocks.
                 * The next `test` node is processed in this path.
                 */
                if (parent.discriminant !== node && parent.cases[0] !== node) {
                    state.forkPath();
                }
                break;
            case "WhileStatement":
            case "DoWhileStatement":
            case "ForStatement":
            case "ForInStatement":
            case "ForOfStatement":
                state.pushLoopContext(node.type, getLabel(node));
                break;
            case "LabeledStatement":
                if (!breakableTypePattern.test(node.body.type)) {
                    state.pushBreakContext(false, node.label.name);
                }
                break;
            default:
                break;
        }
        // Emits onCodePathSegmentStart events if updated.
        forwardCurrentToHead(analyzer, node);
        debug.dumpState(node, state, false);
    }