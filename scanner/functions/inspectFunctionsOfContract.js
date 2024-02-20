function inspectFunctionsOfContract(emitted) {
            if (emitted.exit) {
                return;
            }

            const { node } = emitted, { body } = node;
            let cursor = 0;

            // Filter out non-function nodes
            body.filter(child => {
                return ["FunctionDeclaration", "ConstructorDeclaration"].includes(child.type);
            }).forEach(funcNode => {
                // Return if the function is ignored or in the correct order.
                if (
                    (context.options && isIgnored(funcNode, node, context.options[0].ignore)) ||
                    isFunctionVisibility(node, funcNode, functionOrder[cursor])
                ) {
                    return;
                }

                const funcPosInOrder = findFuncPosInOrder(node, funcNode);

                if (funcPosInOrder > cursor) {
                    cursor = funcPosInOrder;
                    return;
                }

                context.report({ node: funcNode, message: errorMessage });
            });
        }