function createBinaryExpressionTrampoline(onEnter, onLeft, onOperator, onRight, onExit, foldState) {
            const machine = new BinaryExpressionStateMachine(onEnter, onLeft, onOperator, onRight, onExit, foldState);
            return trampoline;
            function trampoline(node, outerState) {
                const resultHolder = { value: void 0 };
                const stateStack = [BinaryExpressionState.enter];
                const nodeStack = [node];
                const userStateStack = [void 0];
                let stackIndex = 0;
                while (stateStack[stackIndex] !== BinaryExpressionState.done) {
                    stackIndex = stateStack[stackIndex](machine, stackIndex, stateStack, nodeStack, userStateStack, resultHolder, outerState);
                }
                Debug.assertEqual(stackIndex, 0);
                return resultHolder.value;
            }
        }