function checkIfLoopIsNecessaryConditional(node) {
                if (node.test == null) {
                    // e.g. `for(;;)`
                    return;
                }
                /**
                 * Allow:
                 *   while (true) {}
                 *   for (;true;) {}
                 *   do {} while (true)
                 */
                if (allowConstantLoopConditions &&
                    (0, tsutils_1.isBooleanLiteralType)(getNodeType(node.test), true)) {
                    return;
                }
                checkNode(node.test);
            }